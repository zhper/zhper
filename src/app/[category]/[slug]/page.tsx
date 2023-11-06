'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import UserBox from '@/components/UserBox'
import Markdown from 'react-markdown'
import { useParams } from 'next/navigation'
import MyMarkdown from '@/utils/MyMarkdown'

interface Idata {
    title: string,
    date: string,
    slug: string,
    excerpt: string,
    image: string,
    isFeatured: boolean,
    content: string
    category: string | undefined
}

export default function Slug() {
    const [note, setNote] = useState()
    const { category, slug } = useParams()
    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/getNoteData`, {
                method: 'POST',
                body: JSON.stringify({ category, fileName: slug }),
                next: { revalidate: 5000 }
            })
            setNote((await res.json()).data.noteData)
            // console.log('dawdwa', (await res.json()).data.notesData)
        })()
    }, [])

    if (!note) return null

    return (
        <div className={styles.container}>
            <UserBox />
            <div>
                <MyMarkdown>{note.content}</MyMarkdown>
            </div>
        </div>
    )
}

