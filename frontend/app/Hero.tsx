import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Shield, Check, X, Files, Sparkle } from 'lucide-react'
import React from 'react'


const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[70vh] w-full max-w-[1400px] mx-auto px-4 py-12">
      <div className="flex flex-col gap-5 max-w-xl text-center lg:text-left">
        <Badge className="flex items-center justify-center gap-2 font-bold p-2 w-fit mx-auto lg:mx-0">
          <Shield />
          <p className="text-md"> AI-Powered Protection </p>
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
          Detect Scams Before They Get You.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-balance">
          Analyze suspicious messages effortlessly and learn how to stay safe online. Supports English, Filipino, and Taglish detection.
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
          <Button className="font-semibold w-full sm:w-auto">Launch Scam Detector</Button>
          <Button variant="secondary" className="w-full sm:w-auto">How It Works</Button>
        </div>
      </div>

      <div className="w-full max-w-xl">
        <Card>
          <CardContent>
            <CardDescription className="flex flex-col gap-5">
              <div className="flex flex-wrap justify-between gap-3">
                <Badge className="px-4 flex gap-2 bg-red-200">
                  <X className="text-red-700" />
                  <h1 className="text-base font-bold text-red-700">Scam</h1>
                </Badge>
                <Badge className="px-4 flex gap-2 bg-red-200">
                  <X className="text-red-700" />
                  <h1 className="text-base font-bold text-red-700">High risk</h1>
                </Badge>
              </div>

              <div className="flex items-center justify-between font-bold text-base">
                <p>Scam Probability</p>
                <p>85%</p>
              </div>

              <div>
                <Progress className="[&>div]:bg-red-500" value={85} />
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <p>Language Detected:</p>
                <Badge className="py-1.5 px-5 font-semibold">English</Badge>
              </div>

              <div className="bg-black/5 flex flex-col sm:flex-row items-center gap-5 rounded-lg p-5">
                <Files className="w-14 h-14" />
                <p className="text-black/70 text-sm md:text-base">
                  This message contains urgent language requesting OTP codes, which is a common phishing tactic. Legitimate companies never ask for OTP codes via text or email.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs md:text-sm">
                <p className="text-muted-foreground">Why do scammers ask for OTP codes?</p>
                <p className="text-muted-foreground">How do urgent messages trick people?</p>
                <p className="text-muted-foreground">Is it safe to click links from unknown senders?</p>
              </div>

              <Card>
                <CardContent>
                  <CardDescription className="flex flex-col gap-4">
                    <div className="flex flex-wrap justify-between gap-3 items-center">
                      <div className="flex items-center gap-3">
                        <Sparkle className="h-6 w-6" />
                        <h1 className="text-base font-semibold">AI Insight</h1>
                      </div>
                      <Badge>Powered by AI</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base">
                      OTP codes are your final security layer. Scammers use urgency and fake authority to trick you into sharing them, giving them access to your accounts. Never share OTP codes with anyone, even if they claim to be from your bank or service provider.
                    </p>
                  </CardDescription>
                </CardContent>
              </Card>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Hero