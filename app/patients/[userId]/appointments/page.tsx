import { getAppointments } from '@/lib/actions/appointment'
import React from 'react'
import Image from 'next/image'
import AppointmentCard from './components/AppointmentCard'
import { getPatient, getUser } from '@/lib/actions/patient'

const AppointmentsPage = async ({params: {userId}} : SearchParamProps) => {
  const patient = await getPatient(userId)
  const appointments = await getAppointments(userId)
  return (
    <div className='flex flex-col h-screen items-center px-10 py-10 gap-4'>
      
      <Image
            src="/assets/icons/logo-full.svg" 
            width={1000}
            height={1000}
            alt="logo empresa"
            className="mb-12 h-10 w-fit"
        />
        <section className='w-full flex flex-col gap-4 px-10 mb-4'>
          <h1 className='header'>👋 Hola {patient.name}!</h1>
          <p className='text-dark-700'>Aquí podrás ver todas tus citas.</p>

        </section>
        {
          appointments.map(async (appointment)=> {
            
            return (
              <AppointmentCard appoinment={appointment} key={appointment.$id}/>
            )
          })
        }
    
    </div>
  )
}

export default AppointmentsPage