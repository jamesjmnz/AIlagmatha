import Navbar from '@/components/Navbar'
import React from 'react'
import Hero from './Hero'
import Features from './Features'
import Works from './Works'
import Helps from './Helps'
import Faq from './Faq'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='flex flex-col mx-auto pb-20'>
        <Hero />
        <Features />
        <Works />
        <Helps />
        <Faq />
      </div>
    </>
  )
}

export default Home