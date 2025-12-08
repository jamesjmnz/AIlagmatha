import Navbar from '@/components/Navbar'
import React from 'react'
import Hero from './Hero'
import Features from './Features'
import Works from './Works'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='flex flex-col mx-auto pb-20'>
        <Hero />
        <Features />
        <Works />
      </div>
    </>
  )
}

export default Home