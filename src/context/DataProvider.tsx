'use client'

import React, { createContext, useState, useEffect, useRef } from 'react'
import { dirToCategoryMap } from '@/utils/getFIleAndData'

export const dataContext = createContext([])

export default function DataProvider({ children }) {
  const [allData, setAllData] = useState({})
  async function loadData() {
    const resCategory = await fetch(`/api/getAllCategory`, {
      method: 'GET',
    })
    const allCategory = (await resCategory.json()).data
    const data = await Promise.all(allCategory.map(async (category) => {
      const res = await fetch(`/api/getAllNoteData`, {
        method: 'POST',
        body: JSON.stringify({ category: dirToCategoryMap.get(category) })
      })
      return { category, allNotes: (await res.json()).data.allNotesData }
    }))
    return data
  }
  useEffect(() => {
    (async function () {
      setAllData(await loadData())
    })()
  }, [])

  return (
    <dataContext.Provider value={{ allData, setAllData }}>
      {children}
    </dataContext.Provider>
  )
}
