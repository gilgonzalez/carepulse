'use client'
import React, { useState } from 'react'
import { CustomFormField, FormFieldType, SubmitButton } from '.'
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { getAppointmentSchema } from '@/lib/validation'
import { Doctors } from '@/constants'
import { SelectItem } from '../ui/select'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { createAppointment } from '@/lib/actions/appointment'
import { useRouter } from 'next/navigation'

interface AppointmentFormProps {
  userId: string
  patientId: string
  type: "create" | "cancel"
}

const AppointmentForm = ({userId, patientId, type}: AppointmentFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const AppointmentFormValidation = getAppointmentSchema(type)

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
      resolver: zodResolver(AppointmentFormValidation),
      defaultValues: {
        primaryPhysician: '',
        schedule: new Date(),
        reason: '',
        note: '',
        cancellationReason: '',
      },
  })
  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    let status = type === "create" ? "pending" : "cancelled"
    try {
      if(type === "create" && patientId){
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason ?? "",
          note: values.note,
          status : status as Status,
        }
        const newAppointment = await createAppointment(appointmentData)
        if(newAppointment){
          form.reset()
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`)
        }
      }
    } catch (error) {
      
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
      <section className='mb-12 space-y-4'>
        <h1 className='header'>{type === "create" ?'🚨 Solicitar una cita' : '❌ Cancelar una cita'}</h1>
        <p className='text-dark-700'>{type === "create" ? 'Solicita tu cita en menos de 1 minuto !' : 'Cancela tu cita sin problemas'}</p>
      </section>
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
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="note"
                label="Notas adicionales que el médico pueda necesitar"
                placeholder="Ej: ¿Qué hace el dolor? ¿Cómo se ha tratado?"
              />
            </div>
            <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.DATE_PICKER}
                  name="schedule"
                  placeholder='Selecciona la fecha en la que quieres consultar'
                  label="Solicitar fecha de la consulta"
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
        className={cn('w-full', type === "create" && 'shad-primary-btn', type === "cancel" && 'shad-danger-btn')}
      > {type === "create" ? "Solicitar Consulta" : "Cancelar Consulta"}</SubmitButton>
    </form>
  </Form>
  )
}

export default AppointmentForm