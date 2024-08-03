import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col justify-center gap-4"> 
        <h1 className="font-bold text-4xl">Welcome to Care</h1>
        <p className="text-balance">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita, totam! Dolore tempore est delectus expedita velit, iste aperiam repudiandae nihil error totam modi nam, corrupti temporibus facilis illum soluta ullam!</p>
        <div className="flex flex-row justify-end gap-4">
          <Link className="p-2 rounded bg-sky-400 hover:bg-sky-600 w-fit text-white shadow-lg hover:shadow-3xl" href="/edit">Editar</Link>
          <Link className="p-2 rounded bg-red-400 hover:bg-red-600 w-fit text-white shadow-lg " href="/edit">Eliminar</Link>
        </div>
      </div>
    </main>
  );
}
