'use client'

import React from 'react'
import Link from 'next/link'
import styles from './style.module.css'
import { useParams } from 'next/navigation'
import LabelBubble from '@/components/LabelBubble'

interface Idata {
    title: string,
    date: string,
    slug: string,
    excerpt: string,
    image: string,
    isFeatured: boolean,
    content: string
    category: string[] | undefined
}

export default function NoteItem({ data }: { data: Idata }) {
    return (
        <>
            <div className={styles.title}>
                <Link href={`/article/${data.slug}`}>
                    {data.title}
                </Link>
            </div >
            <div className={styles.label}>
                <LabelBubble labels={data.category} />
            </div>
            <div className={styles.excerpt}>{data.excerpt}</div>
            <div className={styles.date}>{data.date}</div>
        </>

    )
}
