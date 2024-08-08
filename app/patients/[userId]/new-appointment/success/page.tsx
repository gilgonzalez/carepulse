import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getAppointment } from '@/lib/actions/appointment';
import { Doctors } from '@/constants';
import { Button } from '@/components/ui/button';
import * as Sentry from "@sentry/nextjs";

const SuccessAppointmentPage = async ({params: {userId}, searchParams } : SearchParamProps) => {
  
  const appointmentId = (searchParams?.appointmentId as string) || "";

  const appoinment = await getAppointment(appointmentId)
  Sentry.metrics.set("user_view_success_appointment", appoinment.patient.name);
  
  const doctor = Doctors.find((doctor)=> doctor.name === appoinment.primaryPhysician)
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(appoinment.schedule))
  return (
    <div className='flex h-screen max-h-screen px-10'>
      <div className='success-img'>
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg" 
            width={1000}
            height={1000}
            alt="logo empresa"
            className="mb-12 h-10 w-fit"
          />
        </Link>
        <section className='flex flex-col items-center'>
          <Image
            src="/assets/gifs/success.gif"
            width={300}
            height={280}
            alt="check"
          />
        <h2 className='header mb-6 text-center max-w-[500px]'>
          ¡Tu <span className='text-emerald-500'>cita</span> ha sido <span className='text-emerald-500'>registrada</span> exitosamente!
        </h2>
        <p>
          Gracias por tu <span className='text-emerald-500'>consulta</span> y esperamos que te <span className='text-emerald-500'>ayude a mejorar tu salud</span> 💪
        </p>
        </section>
        <section className='request-details'>
          <p>Detalles de la cita:</p>
          <div className='flex items-center gap-4'>
            <Image 
              src={doctor?.image || "/assets/images/dr-green.png"}
              width={32} 
              height={32} 
              alt={doctor?.name || "name doctor"}
              className='rounded-full border border-dark-500'
            />
            <p className='whitespace-nowrap'>Dr. {doctor?.name || "Nombre del médico"}</p>
          </div>
          <div className='flex gap-2'>
            <Image
                src="/assets/icons/calendar.svg"
                width={24}
                height={24}
                alt="user"
                className="ml-2"
              />
            <p className='whitespace-nowrap capitalize'>{formattedDate}</p>
          </div>
        </section>
        <Button
          variant={'outline'}
          className='shad-primary-btn'
          asChild
        >
          <Link href={`/patients/${userId}/new-appointment`}>
            <p>Solicitar otra cita</p>
          </Link>
        </Button>
        <p className='copyright'>
          © 2024 Name company. All rights reserved.
        </p>
      </div>
      </div>
  )
}

export default SuccessAppointmentPage