import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield } from 'lucide-react'
import React from 'react'


const Hero = () => {
  return (
    <section className='flex items-center justify-between min-h-[70vh] w-full max-w-[1400px] mx-auto px-4'>
            <div className='flex flex-col gap-5 max-w-xl'>
                    <Badge className='flex font-bold p-2'>
                    <Shield />
                    <p className='text-md'> AI-Powered Protection </p>
                    </Badge>
                    <h1 className='text-6xl font-bold'>
                        Detect Scams Before They Get You.
                    </h1>
                    <p className='text-xl text-muted-foreground '>
                    Analyze suspicious messages effortlessly and learn how to stay safe online. Supports English, Filipino, and Taglish detection.
                    </p>
                    <div className='flex gap-5'>
                        <Button className='font-semibold'>
                            Launch Scam Detector
                        </Button>
                        <Button>
                            How It Works
                        </Button>
                    </div>
            </div>
           

            <div className="">
               <h1>Test</h1>
            </div>
      
    </section>
  )
}

export default Hero