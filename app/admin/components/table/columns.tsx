'use client'

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import StatusBadge from "../StatusBadge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Appointment } from "@/types/appwrite.types"
import { Doctors } from "@/constants"
import AppointmentModal from "../AppointmentModal"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({row}) => (
      <Popover>
        <PopoverTrigger>
          <p className="text-14-medium">{row.index + 1}</p>
        </PopoverTrigger>
        <PopoverContent className="bg-dark-300">{row.original.$id}</PopoverContent>
      </Popover>
      ) 
  },
  {
    accessorKey: "patient",
    header: "Paciente",
    cell: ({row}) => {
      const appointment = row.original
      return (
        <p className="text-14-medium">{appointment.patient.name}</p>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => (
      <div className="w-fit">
        <StatusBadge status={row.original.status as Status} />
      </div>
    )
  },
  {
    accessorKey: "schedule",
    header: "Fecha",
    cell: ({row}) => {
      const formattedDate = new Intl.DateTimeFormat('es-ES', {
        weekday: 'short',
        year: '2-digit',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(row.original.schedule))

      return (
        <p className="text-14-regular min-w-[100px] capitalize">{formattedDate}</p>
      )
    }
  },
  {
    accessorKey: "primaryPhysician",
    header: "Profesional",
    cell: ({row}) => {
      const doctor = Doctors.find((doctor)=> doctor.name === row.original.primaryPhysician)
      return (
        <div className="flex items-center gap-2">
          <Image 
            src={doctor?.image || "/assets/images/dr-green.png"}
            width={100} 
            height={100} 
            alt={doctor?.name || "name doctor"}
            className='size-8'
          />
          <p className='whitespace-nowrap capitalize'>Dr. {doctor?.name || "Nombre del médico"}</p>
        </div>
      )
    }
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Acciones</div>,
    cell: ({ row: {original : data} }) => {
      return (
        <div className="flex gap-2">
          <AppointmentModal 
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            editable={false}
            title="Concertar cita"
            description="Por favor, rellene los siguientes campos para poder concertar una cita."
          />
          <AppointmentModal 
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Cancelar cita"
            description="¿Estás seguro de que quieres cancelar esta cita?"
          />
        </div>
      )
    }
  }
  
]
