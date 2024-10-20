'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuoteData {
  text: { text: string; language: string }[];
  ref: { book: string; chapter: number; verse: number; verse_end: number; language: string }[];
  context: { text: string; language: string }[];
}

const API_URL = 'https://api.bricks.academy/api:pBBmgbb7/v1'

export function OpusDei() {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null)
  const [apiResponse, setApiResponse] = useState<string>('')

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        setQuoteData(data)
        setApiResponse(JSON.stringify(data, null, 2))
      } catch (error) {
        console.error('Error fetching quote:', error)
        setApiResponse(`Error: ${error}`)
      }
    }

    fetchQuote()
  }, [])

  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Saint of the Day card with Jesus Quote */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>聖人日曆</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{/* Add saint of the day content here */}</p>
          <h3 className="mt-4 text-lg font-semibold">耶穌的話</h3>
          {quoteData ? (
            <>
              <blockquote className="mb-2 italic">
                {quoteData.text.find(t => t.language === 'zh_hk')?.text}
              </blockquote>
              <p className="text-sm text-muted-foreground">
                {quoteData.ref.find(r => r.language === 'zh_hk')?.book} {quoteData.ref[0].chapter}:{quoteData.ref[0].verse}
              </p>
              <p className="mt-2 text-sm">
                {quoteData.context.find(c => c.language === 'zh_hk')?.text}
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </CardContent>
      </Card>

      {/* Opus Dei card */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Opus Dei</CardTitle>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? date.toDateString() : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="bg-popover p-4 rounded-md shadow-md">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </div>
            </PopoverContent>
          </Popover>
          {/* ... (rest of the card content) */}
        </CardContent>
      </Card>

      {/* Debug Window */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>API Debug Info</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold">API URL:</h3>
          <p className="mb-2 text-sm">{API_URL}</p>
          <h3 className="font-semibold">API Response:</h3>
          <pre className="mt-2 max-h-60 overflow-auto text-xs">
            {apiResponse}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
