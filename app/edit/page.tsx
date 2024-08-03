import React from 'react'

const page = () => {
  return (
    <div className=" flex flex-col justify-center px-10">
      Añadir nueva entrada
      <form className="flex flex-col gap-8" action="">
        <input type="text" name="name" placeholder="Nombre" className="rounded-lg border border-gray-300 p-2 text-black" />
        <textarea placeholder="Descripción" name="description" className="rounded-lg border border-gray-300 p-2 text-black"></textarea>
        <button className="rounded-lg bg-sky-400 p-2 text-white">Guardar</button>
      </form>
    </div>
  )
}

export default page
