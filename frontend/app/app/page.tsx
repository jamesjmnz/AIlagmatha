"use client"
import Navbar from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, FileQuestionMark, Files, Sparkle, Upload, X } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"

import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { analyzeMessage } from '@/lib/api/scam'

const App = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [hasMessage, setHasMessage] = useState<string>("") 
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false)
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null)

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

  const handleAnalyzeSubmit = async () => {
    try {
        setLoading(true)
        setSelectedQuestionIndex(null) // Reset selected question
        const result = await analyzeMessage(hasMessage)
        setData(result)
        console.log(result)
    } catch (err) {
        console.error(err)
    } finally {
        setLoading(false)
       
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
                    <Button className='' onClick={handleAnalyzeSubmit} disabled={!hasMessage.trim() || loading ? true : false }>{loading ? "Analyzing": "Analyze Message"}</Button>
                    </CardContent>
                </CardDescription>
            </Card>


           {data && <Card>
                <CardContent>
                    <CardDescription className='flex gap-5 flex-col'>
                        <div className='flex justify-between'>
                        <Badge className={`px-4 flex gap-2 ${data.final_label?.toLowerCase() === "scam" ? "bg-red-200" : "bg-green-200"}`}>
                            {data.final_label?.toLowerCase() === "scam" ? (
                                <X className="text-red-700" />
                            ) : (
                                <Check className="text-green-700" />
                            )}
                            <h1 className={`text-base font-bold ${data.final_label?.toLowerCase() === "scam" ? "text-red-700" : "text-green-700"}`}>
                                {data.final_label}
                            </h1>
                        </Badge>
                        <Badge className={`px-4 flex gap-2 ${data.final_label?.toLowerCase() === "scam" ? "bg-red-200" : "bg-green-200"}`}>
                            {data.final_label?.toLowerCase() === "scam" ? (
                                <X className="text-red-700" />
                            ) : (
                                <Check className="text-green-700" />
                            )}
                            <h1 className={`text-base font-bold ${data.final_label?.toLowerCase() === "scam" ? "text-red-700" : "text-green-700"}`}>
                                {data.severity} risk
                            </h1>
                        </Badge>
                        </div>

                        <div className='flex justify-between font-bold text-base'>
                            <p>Scam Probability</p>
                            <p>{Math.trunc(data.risk_score * 100)}%</p>
                        </div>

                        <div>
                            <Progress 
                                className={data.final_label?.toLowerCase() === "scam" ? "[&>div]:bg-red-500" : "[&>div]:bg-green-500"} 
                                value={Math.trunc(data.risk_score * 100)} 
                            />
                        </div>

                        <div className='flex gap-3 items-center'>
                            <p>Language Detected: </p>
                            <Badge className='py-1.5 px-5 font-semibold'>English</Badge>
                        </div>

                        <div className='p-2.5 bg-black/5 flex items-center gap-5 rounded-lg p-6 '>
                            <Files className='w-16 h-16' />
                            <p className='text-black/70'>
                            {data.explanation}
                            </p>
                        </div>

                        

                        <div className='flex justify-between text-center text-xs'>
                            {data.question_insights?.map((item: any, index: number) => {
                                const question = typeof item === 'string' ? item : item.question
                                return (
                                    <p 
                                        key={index}
                                        onClick={() => setSelectedQuestionIndex(index)}
                                        className={`text-muted-foreground hover:text-black hover:cursor-pointer transition-colors ${
                                            selectedQuestionIndex === index ? 'text-black font-semibold' : ''
                                        }`}
                                    >
                                        {question}
                                    </p>
                                )
                            })}
                        </div>

                        {selectedQuestionIndex !== null && data.question_insights?.[selectedQuestionIndex] && (
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
                                            {typeof data.question_insights[selectedQuestionIndex] === 'object' 
                                                ? data.question_insights[selectedQuestionIndex].answer 
                                                : 'Answer not available'}
                                        </p>
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        )}
                    </CardDescription>
                </CardContent>
            </Card>}
        </div>
    </section>
   </>
  )
}

export default App