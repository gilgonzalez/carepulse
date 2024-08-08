'use client'
import React, { useEffect, useState } from 'react'
import { CustomFormField, FormFieldType, SubmitButton } from '.'
import { Form, FormControl } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { getAppointmentSchema } from '@/lib/validation'
import { Doctors } from '@/constants'
import { SelectItem } from '../ui/select'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { createAppointment, updateAppointment } from '@/lib/actions/appointment'
import { useRouter } from 'next/navigation'
import FileUploader from './FileUploader'
import { Appointment } from '@/types/appwrite.types'

interface AppointmentFormProps {
  userId: string
  patientId: string
  type: "create" | "cancel"| "schedule"
  appointment?: Appointment
  setOpen?: (open: boolean) => void
  editable:boolean
}

const AppointmentForm = ({userId, patientId, type, appointment, setOpen, editable}: AppointmentFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  console.log({userId})

  const AppointmentFormValidation = getAppointmentSchema(type)

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
      resolver: zodResolver(AppointmentFormValidation),
      defaultValues: {
        primaryPhysician: appointment?.primaryPhysician ?? '',
        schedule: appointment ? new Date(appointment.schedule) : new Date(),
        reason: appointment?.reason ?? '',
        note: appointment?.note ?? '',
        cancellationReason: appointment?.cancellationReason ?? '',
        //injuryImageUrl: appointment?.injuryImageUrl ?? undefined,
      },
  })
  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    let status = type === "create" ? "pending" : type === "schedule" ? "scheduled" : "cancelled"

    let formData;

    if(values.injuryImageUrl && values.injuryImageUrl.length > 0) {
      const blobFile = new Blob([values.injuryImageUrl[0]], {
        type: values.injuryImageUrl[0].type
      })
      formData = new FormData();
      formData.append('blobField', blobFile)
      formData.append('fileName', values.injuryImageUrl[0].name)
    }
    try {
      setIsLoading(true)
      if(type === "create" && patientId){
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason ?? "",
          note: values.note,
          status : status as Status,
          injuryImageUrl: formData,
        } 
        const newAppointment = await createAppointment(appointmentData)
        if(newAppointment){
          form.reset()
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`)
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId : appointment?.$id!,
          appointment : {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type
        }

        const updatedAppointment = await updateAppointment(appointmentToUpdate)

        if(updatedAppointment){
          setOpen && setOpen(false)
          form.reset()
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
      {
        type === 'create' && (
          <section className='mb-12 space-y-4'>
        <h1 className='header'>{'🚨 Solicitar una cita' }</h1>
        <p className='text-dark-700'>{type === "create" ? 'Solicita tu cita en menos de 1 minuto !' : 'Cancela tu cita sin problemas'}</p>
      </section>
        )
      }
      {
        type !== "cancel" ? (
          <>
            <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="primaryPhysician"
                label="Médico Primario"
                placeholder='Ej: Dr. Juan Perez'
              >
                {
                  Doctors.map((doctor)=>(
                    <SelectItem key={doctor.name} value={doctor.name}>
                      <div className='flex cursor-pointer items-center gap-2'>
                        <Image src={doctor.image} width={32} height={32} alt={doctor.name} className='rounded-full border border-dark-500'/>
                        <p>{doctor.name}</p>
                      </div>
                    </SelectItem>
                  ))
                }
              </CustomFormField>
              <div className='flex flex-col gap-6 lg:flex-row '>
            <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                label="Razón de la consulta"
                placeholder='Ej: Dolor muscular, rotura de fibras, etc.'
                disabled={!editable} 
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="note"
                label="Notas adicionales que el médico pueda necesitar"
                placeholder="Ej: ¿Qué hace el dolor? ¿Cómo se ha tratado?"
                disabled={!editable}
              />
            </div>
            <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.DATE_PICKER}
                  name="schedule"
                  placeholder='Selecciona la fecha en la que quieres consultar'
                  label="Solicitar fecha de la consulta"
                  showTimeSelect
                  dateFormat="MM/dd/yyyy  -  h:mm aa"
              />
              <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="injuryImageUrl"
          label="Image de la lesión"
          placeholder="(+34) 987654321"
          renderSkeleton={(field)=> (
            <FormControl className='flex-1'>
              <FileUploader 
                files={field.value}
                onChange={field.onChange}
              />
            </FormControl>
          )}
        />
            </>
        ) : (
          <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="cancellationReason"
                label="Razón de la cancelación"
                placeholder='Ej: Recuperación 🥳'
          />
        )
      }
      
      <SubmitButton 
        isLoading={form.formState.isSubmitting || isLoading}
        className={cn('w-full', 
                      type === "create" && 'shad-primary-btn', 
                      type === "cancel" && 'shad-danger-btn',
                      type === "schedule" && 'shad-primary-btn'
      )}
      > {type === "create" ? "Solicitar" : type === "schedule" ? "Confirmar" : "Cancelar"} consulta</SubmitButton>
    </form>
  </Form>
  )
}

export default AppointmentForm