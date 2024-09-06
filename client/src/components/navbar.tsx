import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  const style = {
    space: {
      padding: '0 10px',
      color: 'white',
      contentAlign: 'right',
    }
  }
  return (
    <nav className='bg-slate-800'>
      <ul className='flex p-5'>
        <Link className='space' style={style.space} href='/home'>Home</Link>
        <Link className='space' style={style.space} href='#'>Blogs</Link>
        <Link className='space' style={style.space} href='#'>Redirect</Link>
      </ul>
    </nav>
  )
}


