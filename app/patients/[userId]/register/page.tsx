import React from 'react'
import Image from 'next/image'
import { RegisterForm } from '@/components/form/RegisterForm'
import Link from 'next/link'
import { getUser } from '@/lib/actions/patient'

interface PatientRegisterPageProps {
  params : {
    userId: string
  }
}

const RegistrationPage = async ( {params :{ userId }} : PatientRegisterPageProps) => {
  
  const user = await getUser(userId)
  
  return (
    <main className="flex bg-cover bg-register bg-fit bg-repeat-y">
      {/** TODO : OTP NOTIFICATION */}
      <section className="remove-scrollbar container my-auto">
        <div className="my-8">
          <Image 
            src="/assets/icons/logo-full.svg" 
            width={100}
            height={100}
            alt="logo empresa"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user}/>
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

export default RegistrationPage