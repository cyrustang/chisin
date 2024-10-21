import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface Quote {
  text: string;
  context: string;
  ref: {
    book: string;
    chapter: number;
    verse: number;
    verse_end: number;
  };
}

interface QuoteCardProps {
  isDarkMode: boolean;
}

const JesusQuoteCard: React.FC<QuoteCardProps> = ({ isDarkMode }) => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReloading, setIsReloading] = useState(false);

  const fetchQuote = async () => {
    setIsLoading(true);
    setIsReloading(true);
    try {
      const response = await fetch('https://api.bricks.academy/api:pBBmgbb7/v1');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      const zhHkQuote = data.text.find((t: any) => t.language === 'zh_hk');
      const zhHkRef = data.ref.find((r: any) => r.language === 'zh_hk');
      const zhHkContext = data.context.find((c: any) => c.language === 'zh_hk');
      if (zhHkQuote && zhHkRef && zhHkContext) {
        setQuote({
          text: zhHkQuote.text,
          context: zhHkContext.text,
          ref: {
            book: zhHkRef.book,
            chapter: zhHkRef.chapter,
            verse: zhHkRef.verse,
            verse_end: zhHkRef.verse_end,
          },
        });
      } else {
        throw new Error('No zh_hk quote found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsReloading(false), 300); // Delay to allow fade-in effect
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleReload = () => {
    fetchQuote();
  };

  if (isLoading && !isReloading) {
    return (
      <div className={`text-left p-6 mb-4 ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-white text-slate-800'} rounded-lg shadow-md`}>
        <p>載入中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-left p-6 mb-4 ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-white text-slate-800'} rounded-lg shadow-md`}>
        <p>無法載入引言。請稍後再試。</p>
      </div>
    );
  }

  return (
    <div className={`text-left p-6 mb-4 relative ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-white text-slate-800'} rounded-lg shadow-md transition-opacity duration-300 ${isReloading ? 'opacity-50' : 'opacity-100'}`}>
      <button
        onClick={handleReload}
        className={`absolute top-2 right-2 p-1 rounded-full ${
          isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
        } transition-colors`}
        aria-label="Reload quote"
        disabled={isReloading}
      >
        <RefreshCw size={20} className={`transition-transform duration-300 ${isReloading ? 'rotate-180' : ''}`} />
      </button>
      {quote && (
        <div className={`transition-opacity duration-300 ${isReloading ? 'opacity-0' : 'opacity-100'}`}>
          <h3 className="text-2xl font-semibold mb-2">每日金句</h3>
          <p className="text-lg mb-2">{quote.text}</p>
          <p className="text-sm italic mb-4">
            {quote.ref.book} {quote.ref.chapter}:{quote.ref.verse}
            {quote.ref.verse_end !== quote.ref.verse && `-${quote.ref.verse_end}`}
          </p>
          <p className="text-lg mb-2 pt-2">{quote.context}</p>
        </div>
      )}
    </div>
  );
};

export default JesusQuoteCard;