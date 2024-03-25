'use client'
import { useContext, useRef } from 'react'
import Navigation from '@/components/Navigation'
import DataProvider from '@/context/DataProvider'
import Image from 'next/image'
import Header from '@/components/Header'
import styles from './template.module.css'

// 只有在 template 里面才能使用 'use'

export default function RootTemplate({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <DataProvider>
            <Navigation />
            {/* <Image
                src={topImg1}
                alt='zzz'
                style={{ margin: '0 auto', height: '57vh', width: '100%', objectFit: 'cover' }}
            ></Image> */}
            {/* <header style={{ backgroundImage: 'url("image/topImg1.png")' }}>

            </header> */}
            <main >
                {children}
            </main>
        </DataProvider>
    )
}