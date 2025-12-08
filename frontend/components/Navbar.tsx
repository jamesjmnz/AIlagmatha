import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {

   const navigations = [
        "Home",
        "Features",
        "How it Works",
        "FAQ"
    ]


  return (
    <header className='sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-border shadow-sm'>
        <div className='flex items-center justify-between max-w-[1400px] mx-auto p-4'>
            <div>
                <Link href={"/"}>
                <h1 className='font-bold text-xl'>AIlagmatha</h1>
                </Link>
            </div>
            <div className='flex'> 
                {navigations.map((n) => 
                <p className='mx-4 text-muted-foreground'>
                    {n}
                </p>
                )}
            </div>
            <div>
            <Button variant="default" className=''>
                <Link href={"/app"}>
                    Open Console
                </Link>
            </Button>
            </div>
        </div>
    </header>
  )
}

export default Navbar