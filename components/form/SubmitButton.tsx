import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

interface SubmitButtonProps {
  isLoading: boolean
  className?: string
  children?: React.ReactNode
}

export const SubmitButton = ({isLoading, className, children}: SubmitButtonProps) => {
  return (
    <Button type="submit" 
      className={cn(className, !className && 'shad-primary-btn w-full')}
      disabled={isLoading}
    >
      {
        isLoading ? (
          <div className='flex items-center gap-4'>
            <Image 
              src="/assets/icons/loader.svg" 
              height={24} 
              width={24} 
              alt="loading"
              className="animate-spin" 
            />
          </div>
        ) : (
          children
        )
      }
    </Button>
  )
}