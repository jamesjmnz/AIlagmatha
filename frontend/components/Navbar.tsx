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
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href={"/"}>
            <h1 className="font-bold text-xl">AIlagmatha</h1>
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
          {navigations.map((n) => (
            <p className="text-muted-foreground" key={n}>
              {n}
            </p>
          ))}
        </div>
        <div className="w-full md:w-auto">
          <Button variant="default" className="w-full md:w-auto">
            <Link href={"/app"}>Open Console</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar