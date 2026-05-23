'use client'

import { useEffect } from 'react'
import { logEvent } from 'firebase/analytics'
import { getFirebaseAnalytics } from '@/lib/firebase'

const ENGAGEMENT_INTERVAL_MS = 60000 * 5

export function usePageAnalytics() {
  useEffect(() => {
    const startTime = Date.now()

    getFirebaseAnalytics().then((analytics) => {
      if (!analytics) return
      logEvent(analytics, 'page_view', {
        page_path: window.location.pathname,
        page_referrer: document.referrer || undefined
      })
    })

    const intervalId = setInterval(() => {
      const now = Date.now()
      getFirebaseAnalytics().then((analytics) => {
        if (!analytics) return
        logEvent(analytics, 'five_minutes', {
          time: now,
          page_path: window.location.pathname
        })
      })
    }, ENGAGEMENT_INTERVAL_MS)

    return () => {
      clearInterval(intervalId)
      const duration = Math.round((Date.now() - startTime) / 1000)
      getFirebaseAnalytics().then((analytics) => {
        if (!analytics) return
        logEvent(analytics, 'user_engagement', {
          engagement_time_msec: duration * 1000,
          page_path: window.location.pathname
        })
      })
    }
  }, [])
}
