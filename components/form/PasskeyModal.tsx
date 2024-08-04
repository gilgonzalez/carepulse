'use client'
import React, { use, useEffect, useState } from "react";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,

} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = () => {

  const [open, setOpen] = useState(true)
  const [passkey, setPasskey] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const path = usePathname()

  const encryptedPasskey = typeof window !== 'undefined' ? localStorage.getItem('adminPasskey') : null

  useEffect(() => { 
    const accessPasskey = encryptedPasskey && decryptKey(encryptedPasskey)
    if(path){
      if(accessPasskey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
        setOpen(false)
        router.push(`/admin`)
      } else {
        setOpen(true)
      }
    }
  }, [encryptedPasskey, passkey, path, router])
  

  const handleClose = () => {
    setOpen(false)
    router.push(`/`)
  }

  const validatePassKey = async (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault()

    if( passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY ) {
      const encryptedPasskey = encryptKey(passkey)
      localStorage.setItem('adminPasskey', encryptedPasskey)
      setOpen(false)
      router.push(`/admin`)
    } else {
      setError("La clave ingresada no es correcta")
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Verificación Acceso de Administrador
            <Image
              src="/assets/icons/close.svg"
              width={24}
              height={24}
              alt="close"
              className="cursor-pointer"
              onClick={handleClose}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Para acceder como administrador, ingrese su clave de acceso.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)} >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {
            error && (
              <p className='shad-error text-14-regular mt-4 text-center'>{error}</p>
            )
          }
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={(ev)=>validatePassKey(ev)}
            className='shad-primary-btn w-full'
          >
            Validar Clave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
