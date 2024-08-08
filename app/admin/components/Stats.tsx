'use client'

import React from 'react'
import StatCard from './StatCard'
import { getRecentAppointments } from '@/lib/actions/appointment'
import { DataTable } from './table/DataTable'
import { columns } from './table/columns'
import { Appointment } from '@/types/appwrite.types'

const Stats = async({appointments} : {appointments: any}) => {
  return (
    <>
    <section className='admin-stat'>
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Citas concertadas"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Citas pendientes"
            icon="/assets/icons/pending.svg"
          />
          <StatCard 
            type="cancelled"
            count={appointments.cancelledCount}
            label="Citas canceladas"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable
          data={appointments.documents}
          columns={columns}
        />
    </>
  )
}

export default Stats