import Link from 'next/link';
import React from 'react'

const Header = () => {
  return (
    <div className="px-40">
      <div className="bg-red-500 rounded-b-xl text-white p-4 flex flex-row items-center justify-between px-10">
        <Link className="hover:underline hover:font-bold" href="/">Home</Link>
        <Link className="hover:underline hover:font-bold bg-white rounded-full font-bold px-4 py-2 text-black" href="/edit">Add new</Link>
      </div>
    </div>
  )
}

export default Header
