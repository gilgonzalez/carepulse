'use server'
import { ID, Query } from "node-appwrite"
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, ENDPOINT, messaging, PROJECT_ID, storage } from "../appwrite"
import { parseStringify } from "../utils"
import { Appointment } from "@/types/appwrite.types"
import { revalidatePath } from "next/cache"

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
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
export const getAllAppointments = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!, 
      APPOINTMENT_COLLECTION_ID!
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

    const formattedDate = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(updatedAppointment.schedule))
    const smsMessage = `
      Buenos días ${updatedAppointment.patient.name}!
      ${type === "schedule" ? 
        `Te escribimos desde NameCompany. Tu consulta con ${updatedAppointment.primaryPhysician} ha sido confirmada para la siguiente fecha: ${formattedDate}. Un cordial saludo!` 
        : type === 'cancel' 
        ? `Tu cita ha sido cancelada por el siguiente motivo: ${updatedAppointment.cancellationReason}`
        : ''}
    `
    await sendSMSNotification(userId, smsMessage)

    revalidatePath('/admin')
    return parseStringify(updatedAppointment)

  } catch (error) {
    console.log(error)
  }
}

export const sendSMSNotification = async (userId:string, content: string) =>{
  console.log({userId, content})
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    )

    return parseStringify(message)
  } catch (error) {
    console.log(error)
  }
}