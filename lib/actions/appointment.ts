'use server'
import { ID, Query } from "node-appwrite"
import { APPOINTMENT_COLLECTION_ID, BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PROJECT_ID, storage } from "../appwrite"
import { parseStringify } from "../utils"
import { InputFile } from "node-appwrite/file"
import { Appointment } from "@/types/appwrite.types"
import { revalidatePath } from "next/cache"

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {

    let file;
    if (appointment.injuryImageUrl){
      const inputFile = InputFile.fromBuffer(
        appointment.injuryImageUrl?.get('blobFile') as Blob,
        appointment.injuryImageUrl?.get('fileName') as string
      )
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...appointment,
        injuryImageId: file?.$id || null,
        injuryImageUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
      }
    )
    return parseStringify(newAppointment)
    
  } catch (error) {
    console.log(error)
  }
}

export const getAppointment = async (appointmentId : string) => {

  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!, 
      APPOINTMENT_COLLECTION_ID!, 
      appointmentId
    );
    return parseStringify(appointment)
  } catch (error) {
    console.log(error)
  }
}
export const getAppointments = async (userId: string) => {
  revalidatePath(`/patients/${userId}/appointments`)
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!, 
      APPOINTMENT_COLLECTION_ID!, 
      [Query.equal("userId", [userId])]
    );
    return parseStringify(appointments.documents)
  } catch (error) {
    console.log(error)
  }
}

export const getRecentAppointments = async () => {
  try {

    const appointments = await databases.listDocuments(
      DATABASE_ID!, 
      APPOINTMENT_COLLECTION_ID!, 
      [Query.orderDesc('$createdAt')]
    );
    const initialCounts ={
      scheduledCount: 0,
      pendingCount: 0, 
      cancelledCount: 0,
    }
    const counts = (appointments.documents as Appointment[]).reduce((acc, curr) => {
      if(curr.status === "pending"){
        acc.pendingCount++
      } else if(curr.status === "cancelled"){
        acc.cancelledCount++
      } else if(curr.status === "scheduled"){
        acc.scheduledCount++
      }
      return acc
    }, initialCounts)
    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents
    }
    revalidatePath('/admin')
    return parseStringify(data)
    
  } catch (error) {
    console.log(error)
  }
}

export const updateAppointment = async ({appointmentId, userId, appointment, type} : UpdateAppointmentParams) => {

  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    )
    if(!updatedAppointment){
      throw new Error("Appointment not found")
    }

    // TODO: SMS NOTIFICATION


    revalidatePath('/admin')
    return parseStringify(updatedAppointment)

  } catch (error) {
    console.log(error)
  }
}