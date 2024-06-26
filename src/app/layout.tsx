import './globals.css'
import { useContext, useRef } from 'react'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import DataProvider from '@/context/DataProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html>
      <body >
        {children}
      </body>
    </html>
  )
}
