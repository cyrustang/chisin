import { useState, useEffect } from 'react';

interface Saint {
  // Define the structure of a saint object
  name: string;
  // Add other properties as needed
}

export function SaintsInfo({ date }: { date: Date }) {
  const [saintsInfo, setSaintsInfo] = useState<Saint[] | null>(null);

  useEffect(() => {
    // Fetch saints info based on the date
    async function fetchSaintsInfo() {
      try {
        // Replace this with your actual API call
        const response = await fetch(`/api/saints?date=${date.toISOString()}`);
        const data = await response.json();
        setSaintsInfo(data);
      } catch (error) {
        console.error('Error fetching saints info:', error);
        setSaintsInfo(null);
      }
    }

    fetchSaintsInfo();
  }, [date]);

  return (
    <div>
      {saintsInfo ? (
        <ul>
          {saintsInfo.map((saint, index) => (
            <li key={index}>{saint.name}</li>
          ))}
        </ul>
      ) : (
        <p>暫未有今天的聖人資訊</p>
      )}
    </div>
  );
}

// ... rest of the file
