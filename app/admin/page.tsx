import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import StatCard from './components/StatCard'
import { getRecentAppointments } from '@/lib/actions/appointment'
import {DataTable} from './components/table/DataTable'
import { columns } from './components/table/columns'

const AdminPage = async() => {

  const appointments = await getRecentAppointments()
  return (
    <div className = "mx-auto flex space-y-14 max-w-7xl flex-col">
      <header className='admin-header'>
        <Link className="cursor-pointer" href="/">
          <Image
            src="/assets/icons/logo-full.svg" 
            width={32}
            height={162}
            alt="logo empresa"
            className="h-8 w-fit"
          />
        </Link>
        <p className='text-16-semibold'>
          Admin Dashboard
        </p>
      </header>
      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>👋 Hola Admin!</h1>
          <p className='text-dark-700'>Gestiona todas tus citas</p>
        </section>
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
      </main>
      

    </div>
  )
}

export default AdminPage