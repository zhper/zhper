'use client'

import React from 'react'
import Link from 'next/link'
import styles from './style.module.css'
import { useParams } from 'next/navigation'

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

export default function NoteItem({ data }: { data: Idata }) {
    console.log(data)
    const { category } = useParams()
    console.log(category)
    return (
        <>
            <div className={styles.title}>
                <Link href={`${category}/${data.slug}`}>
                    {data.title}
                </Link>
            </div >
            <div className={styles.category}>
                <div className={styles.categoryBubbleItem}>
                    zz
                </div>
                <div className={styles.categoryBubbleItem}>
                    zzdawdaw
                </div>
                <div className={styles.categoryBubbleItem}>
                    zzdawdaw
                </div>
            </div>
            <div className={styles.excerpt}>{data.excerpt}</div>
            <div className={styles.date}>{data.date}</div>
        </>

    )
}
