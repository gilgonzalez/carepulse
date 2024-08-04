'use client'
import React, { useState } from 'react'
import { CustomFormField, FormFieldType, SubmitButton } from '.'
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { CreateAppointmentSchema } from '@/lib/validation'
import { Doctors } from '@/constants'
import { SelectItem } from '../ui/select'
import Image from 'next/image'

const AppointmentForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
      resolver: zodResolver(CreateAppointmentSchema),
      defaultValues: {
        primaryPhysician: '',
        schedule: new Date(),
        reason: '',
        note: '',
        cancellationReason: '',
      },
  })
  const onSubmit = async (values: z.infer<typeof CreateAppointmentSchema>) => {
    console.log(values)
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
      <section className='mb-12 space-y-4'>
        <h1 className='header'>🚨 Solicitar una cita</h1>
        <p className='text-dark-700'>Solicita tu cita en menos de 1 minuto !</p>
      </section>
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
        <div className='flex flex-col gap-6 md:flex-row '>
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
      
      <SubmitButton 
        isLoading={form.formState.isSubmitting || isLoading}
      > Solicitar Consulta</SubmitButton>
    </form>
  </Form>
  )
}

export default AppointmentForm