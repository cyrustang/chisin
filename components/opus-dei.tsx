"use client"

import React, { useState, useEffect } from 'react'
import { Calendar, FileText, Users, Book, Moon, Sun, Type } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Slider } from "@/components/ui/slider"
import JesusQuoteCard from '@/components/jesus-quote-card'

type ApiResponse = {
  text: string;
}

type OpusDeiReading = {
  type: string;
  text: string;
}

type OpusDeiApiResponse = OpusDeiReading[];

type Saint = {
  title: string;
  text: string;
}

const FloatingNavButtons = ({
  currentSection,
  onSectionChange,
  isDarkMode,
}: {
  currentSection: string
  onSectionChange: (section: string) => void
  isDarkMode: boolean
}) => {
  return (
    <nav className={`fixed bottom-2 left-1/2 transform -translate-x-1/2 ${isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'} text-gray-800 dark:text-white py-1 px-2 rounded-full shadow-lg backdrop-blur-sm`}>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onSectionChange('opusdei')}
          className={`p-1 rounded-full transition-colors flex flex-col items-center w-16 ${
            currentSection === 'opusdei'
              ? 'bg-amber-500 text-white'
              : isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
          }`}
        >
          <Book size={14} />
          <span className="text-[10px] mt-0.5">日課</span>
        </button>
        <button
          onClick={() => onSectionChange('mass')}
          className={`p-1 rounded-full transition-colors flex flex-col items-center w-16 ${
            currentSection === 'mass'
              ? 'bg-amber-500 text-white'
              : isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
          }`}
        >
          <FileText size={14} />
          <span className="text-[10px] mt-0.5">彌撒</span>
        </button>
        <button
          onClick={() => onSectionChange('saints')}
          className={`p-1 rounded-full transition-colors flex flex-col items-center w-16 ${
            currentSection === 'saints'
              ? 'bg-amber-500 text-white'
              : isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
          }`}
        >
          <Users size={14} />
          <span className="text-[10px] mt-0.5">聖人</span>
        </button>
      </div>
    </nav>
  )
}

const FloatingTopNavButtons = ({
  currentReadingIndex,
  onChange,
  isDarkMode,
}: {
  currentReadingIndex: number
  onChange: (index: number) => void
  isDarkMode: boolean
}) => {
  const buttonTexts = ['誦', '晨', '日', '晚', '夜']

  const handleClick = (index: number) => {
    onChange(index)
    window.scrollTo(0, 0)
  }

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex justify-center space-x-2 py-1">
        {buttonTexts.map((text, index) => (
          <button
            key={text}
            onClick={() => handleClick(index)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              index === currentReadingIndex
                ? 'bg-amber-500 text-white'
                : isDarkMode
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  : 'bg-white text-slate-700 hover:bg-gray-100'
            } shadow-md`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}

const ReadingView = ({ readings, currentReadingIndex, isDarkMode }: { readings: OpusDeiReading[]; currentReadingIndex: number; isDarkMode: boolean }) => {
  const readingTypes = ['officium lectionis', 'laudes', 'hora media', 'vesperas', 'completorium'];
  const reading = readings.find(r => r.type.toLowerCase().includes(readingTypes[currentReadingIndex]));

  if (!reading) {
    return (
      <div className="p-4 text-center">
        <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          讀經內容不可用。請稍後再試。
        </p>
      </div>
    )
  }

  const titles: { [key: string]: string } = {
    'officium lectionis': 'Officium Lectionis (誦讀)',
    'laudes': 'Laudes (晨禱)',
    'hora media': 'Hora Media (日課)',
    'vesperas': 'Vesperas (晚禱)',
    'completorium': 'Completorium (夜禱)',
  }

  const getTitle = (type: string) => {
    const lowercaseType = type.toLowerCase();
    return Object.entries(titles).find(([key]) => lowercaseType.includes(key))?.[1] || type;
  }

  return (
    <div className="p-4">
      <h2 className={`text-2xl font-serif mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
        {getTitle(reading.type)}
      </h2>
      <div 
        className={`text-lg leading-relaxed text-justify ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
        dangerouslySetInnerHTML={{ __html: reading.text }}
      />
    </div>
  )
}

const SaintsView = ({ saints, isDarkMode }: { saints: Saint[]; isDarkMode: boolean }) => {
  return (
    <div className="p-4">
      <JesusQuoteCard isDarkMode={isDarkMode} />
      {saints.length > 0 ? (
        saints.map((saint, index) => (
          <div key={index} className={`mb-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{saint.title}</h3>
            <div 
              className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
              dangerouslySetInnerHTML={{ __html: saint.text }}
            />
          </div>
        ))
      ) : (
        <div className={`text-center p-6 ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600'} rounded-lg shadow-md`}>
          暫時沒有聖人資料。
        </div>
      )}
    </div>
  )
}

const FontSizeControl = ({ fontSize, setFontSize, isDarkMode }: {
  fontSize: number;
  setFontSize: (size: number) => void;
  isDarkMode: boolean;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}
        >
          <Type className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-center space-x-4">
          <Type className="h-4 w-4" />
          <Slider
            min={12}
            max={24}
            step={1}
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
            className="flex-grow"
          />
          <span className="w-8 text-center">{fontSize}</span>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const OpusDeiComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentSection, setCurrentSection] = useState('mass')
  const [currentReadingIndex, setCurrentReadingIndex] = useState(0)
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [opusDeiReadings, setOpusDeiReadings] = useState<OpusDeiReading[]>([])
  const [saintsData, setSaintsData] = useState<Saint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [fontSize, setFontSizeState] = useState<number>(16); // Default to 16
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const savedSize = localStorage.getItem('fontSize');
      setFontSizeState(savedSize ? parseInt(savedSize, 10) : 16);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  const formatDateHK = (date: Date) => {
    return date.toLocaleDateString('zh-HK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }

  const formatDateForApiWithYear = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}${month}${day}`
  }

  const handleDateChange = (newDate: Date | undefined) => {
    const selectedDate = newDate || new Date()
    setCurrentDate(selectedDate)
    setPopoverOpen(false)
    fetchData(selectedDate)
  }

  const handleSectionChange = (section: string) => {
    setCurrentSection(section)
    if (section === 'opusdei') {
      setCurrentReadingIndex(getAppropriateReadingIndex())
    }
    window.scrollTo(0, 0)
  }

  const getAppropriateReadingIndex = () => {
    const now = new Date()
    const hours = now.getHours()
    
    if (hours >= 0 && hours < 6) return 0 // 誦 after midnight
    if (hours >= 6 && hours < 9) return 1 // 晨 after 6am
    if (hours >= 9 && hours < 18) return 2 // 日 after 9am
    if (hours >= 18 && hours < 21) return 3 // 晚 after 6pm
    return 4 // 夜 after 9pm
  }

  const fetchData = async (date: Date) => {
    setIsLoading(true)
    setError(null)
    const formattedDateWithYear = formatDateForApiWithYear(date)
    const massUrl = `https://api.bricks.academy/api:LiYwyfiE/od_order_of_mass/${formattedDateWithYear}`
    const opusDeiUrl = `https://api.bricks.academy/api:LiYwyfiE/od_opus_dei/${formattedDateWithYear}`
    const saintsUrl = `https://api.bricks.academy/api:LiYwyfiE/od_saints_of_the_day/${formattedDateWithYear}`

    try {
      // Fetch mass data
      const massResponse = await fetch(massUrl)
      const massResponseText = await massResponse.text()
      
      if (!massResponse.ok) {
        throw new Error(`HTTP error! status: ${massResponse.status}`)
      }
      
      const massData: ApiResponse = JSON.parse(massResponseText)
      if (massData.text) 
        setHtmlContent(massData.text)
      else {
        throw new Error('Unexpected API response structure for mass data')
      }

      // Fetch Opus Dei data
      try {
        const opusDeiResponse = await fetch(opusDeiUrl)
        const opusDeiResponseText = await opusDeiResponse.text()

        if (!opusDeiResponse.ok) {
          throw new Error(`HTTP error! status: ${opusDeiResponse.status}`)
        }
        
        const opusDeiData: OpusDeiApiResponse = JSON.parse(opusDeiResponseText)
        if (opusDeiData.length !== 5) {
          console.warn(`Expected 5 Opus Dei entries, but received ${opusDeiData.length}`)
        }
        setOpusDeiReadings(opusDeiData);
      } catch (err) {
        console.error('Error fetching Opus Dei data:', err)
        setError(`Failed to fetch Opus Dei data: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }

      // Fetch Saints data
      try {
        const saintsResponse = await fetch(saintsUrl)
        const saintsResponseText = await saintsResponse.text()

        if (!saintsResponse.ok) {
          throw new Error(`HTTP error! status: ${saintsResponse.status}`)
        }
        
        const saintsData: Saint[] = JSON.parse(saintsResponseText)
        setSaintsData(Array.isArray(saintsData) && saintsData.length > 0 ? saintsData : []);
      } catch (err) {
        console.error('Error fetching Saints data:', err)
        setSaintsData([])
      }

    } catch (err) {
      setError('Failed to fetch data. Please try again later.')
      console.error('Error details:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(currentDate)
  }, [currentDate])

  useEffect(() => {
    if (currentSection === 'opusdei') {
      setCurrentReadingIndex(getAppropriateReadingIndex())
    }
  }, [currentSection])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const applyStyles = () => {
      const content = document.querySelector('main');
      if (content) {
        content.style.fontSize = `${fontSize}px`;
        content.style.lineHeight = '1.5';
        
        const  allElements = content.getElementsByTagName('*');
        for (let i = 0; i < allElements.length; i++) {
          const element = allElements[i] as HTMLElement;
          element.style.fontSize = `${fontSize}px`;
          if (isDarkMode) {
            element.style.setProperty('color', '#e2e8f0', 'important');
            element.style.setProperty('background-color', 'transparent', 'important');
          } else {
            element.style.removeProperty('color');
            element.style.removeProperty('background-color');
          }
        }
      }
    };

    applyStyles();
  }, [fontSize, isDarkMode, currentSection, isLoading]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="p-4 text-center">Loading...</div>
    }

    return (
      <div className="pb-24">
        {error && <p className="text-red-500 mb-4 p-4">{error}</p>}
        {currentSection === 'mass' && htmlContent && (
          <div 
            className={`leading-relaxed p-4 embedded-html-content ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}

        {currentSection === 'opusdei' && opusDeiReadings.length > 0 && (
          <div>
            <ReadingView 
              readings={opusDeiReadings}
              currentReadingIndex={currentReadingIndex}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {currentSection === 'saints' && (
          <div>
            <SaintsView saints={saintsData} isDarkMode={isDarkMode} />
          </div>
        )}
      </div>
    )
  }

  const setFontSize = (newSize: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fontSize', newSize.toString());
    }
    setFontSizeState(newSize);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDarkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
      <style jsx global>{`
        .dark .embedded-html-content,
        .dark .embedded-html-content * {
          color: #e2e8f0 !important;
          background-color: transparent !important;
        }
        .dark .embedded-html-content h1,
        .dark .embedded-html-content h2,
        .dark .embedded-html-content h3,
        .dark .embedded-html-content h4,
        .dark .embedded-html-content h5,
        .dark .embedded-html-content h6 {
          color: #f1f5f9 !important;
        }
        .dark .embedded-html-content a {
          color: #60a5fa !important;
        }
      `}</style>
      <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500">
        <div className={`${isDarkMode ? 'bg-slate-800/95' : 'bg-white/95'} shadow-md backdrop-blur-sm`}>
          <div className="max-w-4xl mx-auto p-2 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span 
                className="text-base font-serif cursor-pointer" 
                onClick={() => handleDateChange(new Date())}
              >
                {formatDateHK(currentDate)}
              </span>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}>
                    <Calendar className="w-4 h-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <CalendarComponent mode="single" selected={currentDate} onSelect={handleDateChange} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-2">
              <FontSizeControl
                fontSize={fontSize}
                setFontSize={setFontSize}
                isDarkMode={isDarkMode}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleDarkMode}
                      className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}
                    >
                      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle dark mode</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </header>

      {currentSection === 'opusdei' && (
        <FloatingTopNavButtons
          currentReadingIndex={currentReadingIndex}
          onChange={(index) => {
            setCurrentReadingIndex(index)
            window.scrollTo(0, 0)
          }}
          isDarkMode={isDarkMode}
        />
      )}

      <main className="flex-grow flex flex-col relative max-w-4xl mx-auto w-full pt-16">
        {renderContent()}
      </main>

      <FloatingNavButtons currentSection={currentSection} onSectionChange={handleSectionChange} isDarkMode={isDarkMode} />
    </div>
  )
}

export default OpusDeiComponent
