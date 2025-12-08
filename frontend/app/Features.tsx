import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lightbulb, Search } from 'lucide-react'
import React from 'react'

const Features = () => {

    const iconMap = {
        shield: Shield,
        bulb: Lightbulb,
        search: Search,
    }

    const informations = [
        {icon: "shield",
        title: "Scam Detection",
        description: "Advanced AI analyzes messages for known scam patterns, phishing attempts, and fraudulent content in real-time."
        },

        {icon: "bulb",
        title: "Real-time Safety Tips",
        description: "Get instant educational insights about why messages are flagged and how to protect yourself from similar scams."
        },

        {icon: "search",
        title: "Pattern Recognition",
        description: "Our system learns from thousands of scam patterns to identify even the most sophisticated fraud attempts."
        },
    ]

  return (
    <section className='pt-20 pb-40 px-4 bg-black/3 '>
        <div className='text-center mb-12 max-w-2xl mx-auto'>
            <h1 className='text-4xl font-bold mb-2'>Why Choose AIlagmatha</h1>
            <p className='text-lg text-muted-foreground'>Powerful features designed to keep you safe from online fraud and scams.</p>
        </div>
        <div className='flex  justify-center gap-6 max-w-7xl mx-auto'>
            {informations.map((info, index) => {
                const IconComponent = iconMap[info.icon as keyof typeof iconMap]
                return (
                    <Card key={index} className='gap-1 py-10 px-2 '>
                        <CardHeader>
                            <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4'>
                                {IconComponent && <IconComponent className='w-6 h-6 text-primary' />}
                            </div>
                            <CardTitle className='text-2xl mb-2'>{info.title}</CardTitle>
                        </CardHeader>
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

export default Features