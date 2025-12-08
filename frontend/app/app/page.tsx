"use client"
import Navbar from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, FileQuestionMark, Files, Sparkle, Upload } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"

import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const App = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [hasMessage, setHasMessage] = useState<string>("") 
  const [analyzeMessage, setAnalyzeMessage] = useState<boolean>(false)

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setFileName(file.name)
      // You can read the file content here if needed
    }
  }

  return (
   <>
    <Navbar/>
    <section className='max-w-7xl mx-auto py-20 flex flex-col gap-10'>
        <div className='flex justify-center flex-col items-center'>
            <h1 className='font-bold text-3xl'>Scam Detector</h1>
            <p className='text-muted-foreground'>Paste or upload a suspicious message to analyze it for scam patterns.</p>
        </div>
        <div className='max-w-3xl flex flex-col gap-10 mx-auto w-full'>
            <Card className='p-5'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                    <Files />
                    <h1 className='font-bold text-lg'>Analyze Message</h1>
                    </CardTitle>
                </CardHeader>
                <CardDescription>
                    <CardContent className='flex flex-col w-full gap-10'>
                    {/* Hidden file input */}
                    <input 
                      type='file' 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className='hidden'
                      accept='.txt,.text'
                    />
                    
                    {/* Custom file upload area */}
                    <div
                      onClick={handleFileClick}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors ${
                        isDragging 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <Upload className='w-10 h-10 text-muted-foreground' />
                      <div className='text-center'>
                        <p className='font-semibold text-sm mb-1'>
                          {fileName ? fileName : 'Upload a file or drag and drop'}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {fileName ? 'Click to change file' : 'TXT, TEXT files only'}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                      <span className='flex-1 h-px bg-border' />
                      <span className='uppercase tracking-wide text-xs'>or</span>
                      <span className='flex-1 h-px bg-border' />
                    </div>

                   <div className='flex flex-col gap-1'>
                   <Textarea value={hasMessage} onChange={(e) => setHasMessage(e.target.value)} className='h-40 text-black' placeholder='Type your message here...'/>
                    <p className='justify-end flex p-0'>
                        {hasMessage.length} characters
                    </p>
                   </div>
                    <Button className='' onClick={() => setAnalyzeMessage(!analyzeMessage)} disabled={!hasMessage.trim() ? true : false }>Analyze Message</Button>
                    </CardContent>
                </CardDescription>
            </Card>


           {analyzeMessage && <Card>
                <CardContent>
                    <CardDescription className='flex gap-5 flex-col'>
                        <div className='flex justify-between'>
                        <Badge className='px-4 bg-green-200  flex gap-2'>
                            <Check className='text-green-700' />
                            <h1 className='text-base  text-green-700 font-bold'>Legit</h1>
                        </Badge>
                        <Badge className='px-4 bg-green-200  flex gap-2'>
                            <Check className='text-green-700' />
                            <h1 className='text-base font-bold text-green-700'>Low Risk</h1>
                        </Badge>
                        </div>

                        <div className='flex justify-between'>
                            <p>Scam Probability</p>
                            <p>15%</p>
                        </div>

                        <div>
                            <Progress className='' value={15} />
                        </div>

                        <div className='flex gap-3 items-center'>
                            <p>Language Detected: </p>
                            <Badge>English</Badge>
                        </div>

                        <div className='p-2.5 bg-black/5 flex items-center gap-5 rounded-lg p-6 '>
                            <FileQuestionMark />
                            <p className='text-black/70'>
                            This message appears to be legitimate. No suspicious patterns, urgent language, or requests for sensitive information were detected.
                            </p>
                        </div>

                        

                        <div className='flex justify-between text-center text-xs'>
                            <p>Why do scammers often ask for OTP codes?</p>
                            <p>How do urgent messages trick people?</p>
                            <p>Is it safe to click links from unknown senders?</p>
                        </div>

                        <Card>
                            <CardContent>
                                <CardDescription className='flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-3'>
                                        <Sparkle className='h-6 w-6' />
                                        <h1 className='text-base font-semibold'>AI Keytakeaways</h1>
                                        </div>
                                        <Badge>
                                            Powered by AI
                                        </Badge>
                                    </div>
                                    <p>Because OTP codes are used as final security verification for accounts like banking apps, e-wallets, and social media. Scammers pretend to be legitimate companies to make you share the code, so they can log in to your account and steal personal info or money.
                                    Legit companies will never ask you to give your OTP to anyone.</p>
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </CardDescription>
                </CardContent>
            </Card>}
        </div>
    </section>
   </>
  )
}

export default App