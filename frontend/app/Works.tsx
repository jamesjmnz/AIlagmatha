import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Computer, Upload } from 'lucide-react'
import React from 'react'

const Works = () => {

    const iconMap = {
        upload: Upload,
        computer: Computer,
        check: Check,
    }

    const informations = [
        {icon: "upload",
        title: "Upload or Paste",
        description: "Simply paste a suspicious message or upload a text file containing the content you want to analyze."
        },

        {icon: "computer",
        title: "AI Analyzes",
        description: "Our advanced AI scans for fraud patterns, phishing indicators, and known scam tactics in seconds."
        },

        {icon: "check",
        title: "Get Clear Verdict",
        description: "Receive a clear SCAM or LEGIT verdict with detailed explanations and protective guidance."
        },
    ]

  return (
    <section className='py-20 px-4'>
        <div className='text-center mb-12 max-w-2xl mx-auto'>
            <h1 className='text-4xl font-bold mb-2'>How it Works?</h1>
            <p className='text-lg text-muted-foreground'>Powerful features designed to keep you safe from online fraud and scams.</p>
        </div>
        <div className='flex  justify-center gap-6 max-w-7xl mx-auto'>
            {informations.map((info, index) => {
                const IconComponent = iconMap[info.icon as keyof typeof iconMap]
                return (
                    <Card key={index} className='gap-1 py-10 px-2 justify-center text-center items-center '>
                        <div className='mb-5'>
                        <Badge className='px-2.5 bg-blue-500'>
                            <p className='font-bold text-xs text-blue-100'> Step {index + 1}</p>
                        </Badge>
                        </div>
                        <CardHeader className='flex flex-col  items-center text-center'>
                            <div className='w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4'>
                                {IconComponent && <IconComponent className='w-6 h-6 text-blue-500' />}
                            </div>
                
                        </CardHeader>
                        <p className='font-bold text-2xl'>{info.title}</p>
                        <CardContent>
                            <CardDescription className='text-lg'>{info.description}</CardDescription>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    </section>
  )
}

export default Works