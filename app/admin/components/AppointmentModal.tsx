'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AppointmentForm from '@/components/form/AppointmentForm';
import { Appointment } from '@/types/appwrite.types';

const label = {
  schedule: "Concertar",
  cancel: "Cancelar",
}
interface AppointmentModalProps {
  type: "schedule" | "cancel"
  patientId: string
  userId: string
  appointment: Appointment
  title: string
  description: string
  editable?: boolean
}


const AppointmentModal = ({
  type, 
  patientId, 
  userId, 
  appointment, 
  title, 
  description,
  editable = true
} : AppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className={cn('capitalize',
          type === "schedule" && 'text-emerald-500',
          type === "cancel" && 'text-red-500',
        )}>{label[type]}</Button>
      </DialogTrigger>
      <DialogContent className='shad-dialog sm:max-w-md'>
        <DialogHeader className='mb-4 space-y-3'>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className=''>
            Por favor, rellene los siguientes campos para poder 
              <span
              className={cn(type === 'cancel' && 'text-red-500', 
                            type==='schedule' && 'text-emerald-500')}>
                {` ${label[type].toLowerCase()} `}
              </span> 
            una cita.
            <AppointmentForm 
              userId={userId}
              patientId={patientId}
              type={type}
              appointment={appointment}
              setOpen={setOpen}
              editable={editable}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AppointmentModal