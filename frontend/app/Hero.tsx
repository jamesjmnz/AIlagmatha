import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Shield, Check, X, Files, Sparkle } from 'lucide-react'
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
           

            <div className="max-w-md">
                <Card>
                    <CardContent>
                        <CardDescription className='flex gap-5 flex-col'>
                            <div className='flex justify-between'>
                                <Badge className='px-4 flex gap-2 bg-red-200'>
                                    <X className="text-red-700" />
                                    <h1 className='text-base font-bold text-red-700'>
                                        Scam
                                    </h1>
                                </Badge>
                                <Badge className='px-4 flex gap-2 bg-red-200'>
                                    <X className="text-red-700" />
                                    <h1 className='text-base font-bold text-red-700'>
                                        High risk
                                    </h1>
                                </Badge>
                            </div>

                            <div className='flex justify-between font-bold text-base'>
                                <p>Scam Probability</p>
                                <p>85%</p>
                            </div>

                            <div>
                                <Progress 
                                    className="[&>div]:bg-red-500" 
                                    value={85} 
                                />
                            </div>

                            <div className='flex gap-3 items-center'>
                                <p>Language Detected: </p>
                                <Badge className='py-1.5 px-5 font-semibold'>English</Badge>
                            </div>

                            <div className='p-2.5 bg-black/5 flex items-center gap-5 rounded-lg p-6'>
                                <Files className='w-16 h-16' />
                                <p className='text-black/70'>
                                    This message contains urgent language requesting OTP codes, which is a common phishing tactic. Legitimate companies never ask for OTP codes via text or email.
                                </p>
                            </div>

                            <div className='flex justify-between text-center text-xs'>
                                <p className='text-muted-foreground'>Why do scammers ask for OTP codes?</p>
                                <p className='text-muted-foreground'>How do urgent messages trick people?</p>
                                <p className='text-muted-foreground'>Is it safe to click links from unknown senders?</p>
                            </div>

                            <Card>
                                <CardContent>
                                    <CardDescription className='flex flex-col gap-4'>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex items-center gap-3'>
                                                <Sparkle className='h-6 w-6' />
                                                <h1 className='text-base font-semibold'>AI Insight</h1>
                                            </div>
                                            <Badge>
                                                Powered by AI
                                            </Badge>
                                        </div>
                                        <p className='text-muted-foreground'>
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