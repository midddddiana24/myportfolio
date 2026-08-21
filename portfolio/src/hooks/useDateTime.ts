import { useState, useEffect } from 'react'

// ===================================================
// RM Portfolio — useDateTime Hook
// Returns live-updating formatted date and time strings
// ===================================================

interface DateTimeState {
  date: string
  time: string
  full: string
}

function formatDateTime(): DateTimeState {
  const now = new Date()

  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  return { date, time, full: `${date} — ${time}` }
}

export function useDateTime(updateInterval = 1000): DateTimeState {
  const [dateTime, setDateTime] = useState<DateTimeState>(formatDateTime)

  useEffect(() => {
    const id = setInterval(() => {
      setDateTime(formatDateTime())
    }, updateInterval)
    return () => clearInterval(id)
  }, [updateInterval])

  return dateTime
}
