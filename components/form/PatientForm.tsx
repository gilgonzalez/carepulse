"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"

import {
  Form,
} from "@/components/ui/form"
import { CustomFormField, SubmitButton } from '.'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/patient'


export enum FormFieldType {
  INPUT = 'input',
  CHECKBOX = 'checkbox',
  TEXTAREA = 'textarea',
  PHONE = 'phone',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

export const PatientForm = () => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()


  const form = useForm<z.infer<typeof UserFormValidation>>({
      resolver: zodResolver(UserFormValidation),
      defaultValues: {
          name: "",
          email: "",
          phone: "",
      },
  })

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    console.log('clicked')
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
      <section className='mb-12 space-y-4'>
        <h1 className='header'>👋 Hi there!</h1>
        <p className='text-dark-700'>Inicia sesión para comenzar a gestionar tus citas.</p>
      </section>
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Nombre Completo"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="User icon"
      />
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
      
      <SubmitButton 
        isLoading={form.formState.isSubmitting || isLoading}
      > Comenzar !</SubmitButton>
    </form>
  </Form>
  )
}