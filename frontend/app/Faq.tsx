import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"



const Faq = () => {

    const informations = [
        {question: "What types of scams can ScamShield detect?",
         answer: "ScamShield can detect various types of scams including phishing attempts, fake bank notifications, OTP fraud, romance scams, investment scams, fake delivery messages, and social media impersonation. Our AI is continuously learning new patterns to stay ahead of scammers."},

         {question: "Is my data kept private and secure?",
            answer: "Yes, your privacy is our priority. Messages you submit are analyzed in real-time and are not stored on our servers. We don't collect personal information, and all analysis happens securely without sharing your data with third parties."},


            {question: "Does it support Filipino and Taglish languages?",
                answer: "Absolutely! AIlagmatha is specially designed to understand and analyze messages in English, Filipino, and Taglish (mixed Filipino-English). This makes it particularly effective for detecting scams targeting Filipino users."},

                {question: "Is AIlagmatha free to use?",
                    answer: "Yes, AIlagmatha is completely free to use. Our mission is to help protect everyone from online scams, regardless of their technical knowledge or financial situation."},

                    {question: "How accurate is the scam detection?",
                        answer: "AIlagmatha achieves over 95% accuracy for known scam patterns. However, we recommend using it as a helpful tool alongside your own judgment. If something feels suspicious, it's always best to verify through official channels before taking any action."},



            

    ]


  return (
    <section className='pt-20'>
        <div className='mx-auto max-w-7xl flex flex-col'>

        <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-bold mb-2'>Frequently Asked Question</h1>
        <p className='text-lg text-muted-foreground'>Everything you need to know about AIlagmatha.</p>
        </div>

        <div className='w-full max-w-2xl pt-10 pb-20 mx-auto'>
        <Accordion
      type="single"
      collapsible
      className="w-full  gap-5 flex flex-col"
      
    >
     {informations.map((info, idx) => 

    <AccordionItem className='bg-black/3 rounded-md p-2.5' value="item-1">
    <AccordionTrigger className='font-bold'>{info.question}</AccordionTrigger>
    <AccordionContent className="flex flex-col gap-4 text-balance">
    <p>
        {info.answer}
    </p>
    </AccordionContent>
    </AccordionItem>
    )}

    </Accordion>
        </div>

        </div>
    </section>
  )
}

export default Faq