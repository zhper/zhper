'use client'

import React, { createContext, useState, useEffect, useRef } from 'react'
import { dirToCategoryMap } from '@/utils/getFIleAndData'

export const dataContext = createContext<any>([])

export default function DataProvider({ children }: any) {
  const [allFiles, setAllFiles] = useState<any>()
  const [allLabels, setAllLabels] = useState<any>()

  async function loadData() {

    const allFiles = await fetch(`/api/getAllFiles`, {
      method: 'POST',
      body: JSON.stringify({ category: '学习笔记' })
    })
    const allLabels = await fetch('/api/getLabel', {
      method: 'POST',
    })
    return {
      allFiles: (await allFiles.json()).data,
      allLabels: (await allLabels.json()).data
    }
  }
  useEffect(() => {
    (async function () {
      const { allFiles, allLabels } = await loadData()
      setAllFiles(allFiles)
      setAllLabels(allLabels)
    })()
  }, [])

  return (
    <dataContext.Provider value={{ allFiles, allLabels }}>
      {children}
    </dataContext.Provider>
  )
}
