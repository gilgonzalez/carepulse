import { cn } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled"
  count: number
  label: string
  icon: string
}

const StatCard = ({ type, count=0, label, icon }: StatCardProps) => {
  return (
    <div className={cn('stat-card',
      type === "appointments" && 'bg-appointments',
      type === "pending" && 'bg-pending',
      type === "cancelled" && 'bg-cancelled',
    )}>
      <div className='flex items-center gap-4'>
        <Image
          src={icon}
          width={32}
          height={32}
          alt="user"
          className="size-8 w-fit"
        />
        <h2 className='text-32-bold text-white'>{count}</h2>
      </div>
      <p className='text-14-regular text-white'>{label}</p>
    </div>
  )
}

export default StatCard