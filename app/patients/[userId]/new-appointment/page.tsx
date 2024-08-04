import React from 'react'
import Image from 'next/image'
import AppointmentForm from '@/components/form/AppointmentForm'
import { getPatient } from '@/lib/actions/patient'
import Link from 'next/link'

interface PatientRegisterPageProps {
  params : {
    userId: string
  }
}

const NewAppointmentPage = async({ params: {userId} } : PatientRegisterPageProps) => {

  const patient = await getPatient(userId) 
  
  return (
    <main className="flex h-screen max-h-screen bg-cover bg-appointment bg-fit bg-repeat-y">
      {/** TODO : OTP NOTIFICATION */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <div className='flex flex-row items-center justify-between flex-1'>
            <Image 
              src="/assets/icons/logo-full.svg" 
              width={100}
              height={100}
              alt="logo empresa"
              className="mb-12 h-10 w-fit"
            />
          <Link
            className=' text-emerald-500 font-bold hover:cursor-pointer'
            href={`/patients/${userId}/edit-register`}
          >
            Modificar datos de registro
          </Link>
          </div>
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Name company. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default NewAppointmentPage