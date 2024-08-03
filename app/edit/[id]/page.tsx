import React from 'react'

interface Props {
  params: {
    id: string;
  };
}

const page = ({params: {id}}: Props) => {
  return (
    <div className=" flex flex-col justify-center px-10 gap-2 mt-4">
      <h2 className=" text-2xl font-bold">
        Editar entrada {id} 
      </h2>
      <form className="flex flex-col gap-8" action="">
        <input type="text" name="name" placeholder="Nombre" className="rounded-lg border border-gray-300 p-2 text-black" />
        <textarea placeholder="Descripción" name="description" className="rounded-lg border border-gray-300 p-2 text-black"></textarea>
        <button className="rounded-lg bg-sky-400 p-2 text-white">Guardar</button>
      </form>
    </div>
  )
}

export default page
