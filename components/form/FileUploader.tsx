"use client"

import { convertFileToUrl } from '@/lib/utils'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from 'next/image'

interface FileUploaderProps {
  files: File[] | undefined
  onChange: (files: File[]) => void
}

const FileUploader = ({files, onChange} : FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles : File[]) => {
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {
        files && files.length > 0 ? (
          <Image 
            src={convertFileToUrl(files[0])} 
            width={400}
            height={400}
            alt="uploaded file"
            className="max-h-[400px] overflow-hidden object-cover"
          />
        ) : (
          <>
            <Image 
              src="/assets/icons/upload.svg" 
              width={40}
              height={40}
              alt="upload"
            />
            <div className='file-upload_label'>
              <p className='text-14-regular'>
                <span className='text-emerald-500'>
                  Clicka aquí </span>o arrastra una imagen 
              </p>
              <p>SVG, PNG, JPG, or GIF (max 800x400) </p>
            </div>
          </>
        )
      }
    </div>
  )
}
export default FileUploader