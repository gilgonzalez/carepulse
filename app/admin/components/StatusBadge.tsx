import { StatusIcon } from '@/constants'
import { cn } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'

const StatusBadge = ({status}: {status:Status}) => {
  const StatusText = {
    pending: 'Pendiente',
    scheduled: 'Confirmada',
    cancelled: 'Cancelada',
  }
  return (
    <div className={cn('status-badge', 
      status === 'pending' && 'bg-sky-800',
      status === 'scheduled' && 'bg-emerald-700',
      status === 'cancelled' && 'bg-red-800',
    )}>
      <Image 
        src={StatusIcon[status]}
        width={24}
        height={24}
        alt={status}
        className="h-fit w-3"
      />
      <p className={cn('text-12 font-semibold capitalize',
        status === 'pending' && 'text-sky-400',
        status === 'scheduled' && 'text-emerald-300',
        status === 'cancelled' && 'text-red-300',
      )}>{StatusText[status]}</p>
    </div>
  )
}

export default StatusBadge