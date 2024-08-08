import React from 'react'
import { Doctors } from '@/constants'
import Image from 'next/image'
import { Appointment } from '@/types/appwrite.types'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import AppointmentModal from '@/app/admin/components/AppointmentModal'

interface AppointmentProps {
  appoinment : Appointment
}

const AppointmentCard = ({appoinment }: AppointmentProps) => {
  const doctor = Doctors.find((doctor)=> doctor.name === appoinment.primaryPhysician)
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(appoinment.schedule))
  const patient = appoinment.patient
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-16-bold'>
          <div className='flex items-center justify-between gap-4'>
            <span className='flex flex-row items-center gap-2'>
              <Image 
                src={doctor?.image || "/assets/images/dr-green.png"}
                width={32} 
                height={32} 
                alt={doctor?.name || "name doctor"}
                className='rounded-full border border-dark-500'
              />
              <p className='whitespace-nowrap'>Dr. {doctor?.name || "Nombre del médico"}</p>
            </span>
          <div className='flex gap-2 justify-end text-14-regular items-center'>
            <Image
                src="/assets/icons/calendar.svg"
                width={24}
                height={24}
                alt="user"
                className="ml-2"
              />
            <p className='whitespace-nowrap capitalize'>{formattedDate}</p>
          </div>
          </div>
        </CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <span>
            <p className='font-semibold underline-offset-1 underline'>Detalles de la cita:</p>
            <p className='text-14-regular'>{appoinment.reason}</p>
          </span>
          <span >
            <p className='font-semibold underline-offset-1 underline'>Notas adicionales:</p>
            <p className='text-14-regular'>{appoinment.note}</p>
          </span>
        </div>
        {/* {
          appoinment.injuryImageUrl && (
            <Image 
              src={'/storage/buckets/bucket-id/files/' + appoinment.injuryImageId + '/view?project=project-id'}
              width={300}
              height={300}
              alt="user"
              className="mt-4 rounded-lg border border-dark-500"
            />
          )
        } */}
      </CardContent>  
      <CardFooter className='flex justify-end px-10 gap-10'>
        <div className='w-fit bg-red-800 rounded-full border border-dark-500 text-center'>
          <AppointmentModal 
            type="cancel"
            patientId={patient.$id}
            userId={patient.userId}
            appointment={appoinment}
            title="Cancelar cita"
            description="¿Estás seguro de que quieres cancelar esta cita?"
          />
        </div>
        <div className='w-fit bg-emerald-800 rounded-full border border-dark-500 text-center'>
          <AppointmentModal 
            type="schedule"
            patientId={patient.$id}
            userId={patient.userId}
            appointment={appoinment}
            title="Cancelar cita"
            description="¿Estás seguro de que quieres cancelar esta cita?"
          />
        </div>
      </CardFooter>
    </Card>
    
    
  )
}

export default AppointmentCard