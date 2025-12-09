import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, FingerprintPattern, PersonStanding, ShoppingBasket } from 'lucide-react'
import React from 'react'
const Helps = () => {

    const iconMap = {
        shopping: ShoppingBasket,
        building: Building,
        people: PersonStanding,
    }

    const informations = [
        {icon: "shopping",
        title: "Online Shoppers",
        description: "Protect yourself when shopping online",
        benefits: ["Verify seller messages and offers", "Detect fake delivery notifications", "Identify payment scam attempts"]
        },

        {icon: "building",
        title: "Banking & Finance",
        description: "Keep your financial data safe",
        benefits: ["Spot fake bank notifications", "Identify phishing OTP requests", "Verify loan and investment offers"]
        },

        {icon: "people",
        title: "Pattern Recognition",
        description: "Our system learns from thousands of scam patterns to identify even the most sophisticated fraud attempts.",
        benefits: ["Detect romance scam tactics", "Verify giveaway legitimacy", "Identify impersonation attempts"]
        },
    ]

  return (
    <section className="pt-20 pb-32 px-4 bg-black/3">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Who it Helps?</h1>
        <p className="text-lg text-muted-foreground">Powerful features designed to keep you safe from online fraud and scams.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 max-w-7xl mx-auto">
        {informations.map((info) => {
          const IconComponent = iconMap[info.icon as keyof typeof iconMap]
          return (
            <Card key={info.title} className="gap-1 py-10 px-4 h-full">
              <CardHeader className="text-center md:text-left">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 mx-auto md:mx-0">
                  {IconComponent && <IconComponent className="w-6 h-6 text-green-600" />}
                </div>
                <CardTitle className="text-2xl mb-2">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">{info.description}</CardDescription>
              </CardContent>
              <CardContent>
                <CardDescription className="flex flex-col gap-2">
                  {info.benefits.map((b) => (
                    <p key={b}>• {b}</p>
                  ))}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

export default Helps