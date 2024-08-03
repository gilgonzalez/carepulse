"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"

import {
  Form,
  FormControl,
} from "@/components/ui/form"
import { CustomFormField, FormFieldType, SubmitButton } from '.'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/patient'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Doctors, GenderOptions, IdentificationTypes } from '@/constants'
import { Label } from '../ui/label'
import { SelectItem } from '../ui/select'
import Image from 'next/image'
import FileUploader from './FileUploader'


export const RegisterForm = ({user}:{user : User}) => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()


  const form = useForm<z.infer<typeof UserFormValidation>>({
      resolver: zodResolver(UserFormValidation),
      defaultValues: {
          name: user.name,
          email: user.email,
          phone: user.phone,
      },
  })

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)
    try{
      const userData = {
        name,
        email,
        phone
      }
      const newUser = await createUser(userData)
      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`)
      }
    } catch (error) {
      console.log('Error creating patient', error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
      <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
      <section className='mb-4 space-y-4'>
        <h1 className='header'>📋 Registro</h1>
        <p className='text-dark-700'>Complete el registro añadiendo los datos que se piden. Cuanta más información, mejor servicio.</p>
        <hr className='border-dark-500 my-4'/>
      </section>
      <section className='mb-4 space-y-4'>
        <h2 className='sub-header'>👤 Información Personal</h2>
        <p className='text-dark-700 text-14-regular'>Completa tus datos personales para poder gestionar tus citas.</p>
      </section>
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="name"
        placeholder="John Doe"
        label='Nombre Completo'
        iconSrc="/assets/icons/user.svg"
        iconAlt="User icon"
      />
      <div className='flex flex-col gap-6 md:flex-row'>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="your@email.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="Email icon"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE}
          name="phone"
          label="Phone Number"
          placeholder="(+34) 987654321"
        />
      </div>
      <div className='flex flex-col gap-6 md:flex-row '>
      <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Dirección"
            placeholder='Ej: Av. de la Paz, 123'
        />
        <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Ocupación"
            placeholder='Ej: Deportista de Élite'
        />
      </div>
      <div className='flex flex-col gap-6 md:flex-row '>
      <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Contacto de emergencia"
            placeholder='Ej: Juan Perez'
        />
        <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE}
            name="emergencyContactNumber"
            label="Phone Number"
            placeholder="(+34) 987654321"
        />
      </div>
      <div className='flex flex-col gap-6 md:flex-row '>
        <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Fecha Nacimiento"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="gender"
          label="Género"
          placeholder="(+34) 987654321"
          renderSkeleton={(field)=> (
            <FormControl className='flex-1'>
              <RadioGroup 
                className='h-11 flex gap-6'
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
              {
                GenderOptions.map((option) => (
                  <div className='radio-group' key={option}>
                    <RadioGroupItem value={option} id={option}/>
                    <Label htmlFor={option} className='cursor-pointer text-sm font-medium text-dark-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none'>{option}</Label>
                  </div>
                ))
              }
              </RadioGroup>
            </FormControl>
          )}
        />

      </div>
      <hr className='border-dark-500 my-4'/>
      <section className='mb-4 space-y-4'>
        <h2 className='sub-header'>🏥 Información Médica</h2>
        <p className='text-dark-700 text-14-regular'>Completar datos médicos para facilitar la gestión de tus citas.</p>
      </section>
      <div className='flex flex-col gap-6 md:flex-row '>
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
      </div>
      <div className='flex flex-col gap-6 md:flex-row '>
      <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="insuranceProvider"
          label="Nombre del Seguro"
          placeholder="Ej: Seguro de Salud"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE}
          name="insurancePolicyNumber"
          label="Numero del Seguro"
          placeholder="ABC-23128943"
        />
      </div>
      <div className='flex flex-col gap-6 md:flex-row '>
      <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="allergies"
          label="Alergias"
          placeholder="Ej: alergia a la naranja"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="currentMedication"
          label="Medicación actual"
          placeholder="Ej: Paracetamol"
        />
      </div>
      <div className='flex flex-col gap-6 md:flex-row '>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="pastMedicalHistory"
          label='Historial médico pasado'
          placeholder='Ej: Dolor de cabeza, fiebre, diarrea'
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="familyMedicalHistory"
          label='Historial médico familiar'
          placeholder='Ej: Dolor de cabeza, fiebre, diarrea'
        />
      </div>
      <hr className='border-dark-500 my-4'/>
      <section className='mb-4 space-y-4'>
        <h2 className='sub-header'>🪪 Identificación y Documentación</h2>
        <p className='text-dark-700 text-14-regular'>Necesitamos verificar tu identidad para poder gestionar tus citas.</p>
      </section>
      <div className='flex flex-col gap-6 md:flex-row '>
      <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="identificationType"
          label="Tipo de identificación"
          placeholder='Selecciona un tipo de identificación'
        >
          {
            IdentificationTypes.map((type)=>(
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))
          }
        </CustomFormField>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="identificationNumber"
          label="Número de identificación"
          placeholder='Ej: ABC-23128943'
        />
      </div>
      <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="identificationDocument"
          label="Imagen de identificación"
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
      <hr className='border-dark-500 my-4'/>
      <section className='mb-4 space-y-4'>
        <h2 className='sub-header'>📜 Consentimiento y Privacidad</h2>
        <p className='text-dark-700 text-14-regular'>Necesitamos verificar tu identidad para poder gestionar tus citas.</p>
      </section>
      <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="treatmentConsent"
          label="Consiento el tratamiento de mis datos para el uso de la aplicación"
        />
      <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="disclosureConsent"
          label="Consiento a divulgar mis datos para el uso de la aplicación"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="privacyConsent"
          label="Consiento a que mis datos sean utilizados para el uso de la aplicación"
        />
      <SubmitButton 
        
        isLoading={form.formState.isSubmitting || isLoading}
      > Finalizar Registro</SubmitButton>
    </form>
  </Form>
  )
}