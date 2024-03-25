'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './style.module.css'
import { labelToName } from '@/utils/getFIleAndData'
export default function LabelBubble({ labels }: any) {
    if (!labels) return null
    return (
        <>
            {labels.map((item: string, idx: number) => (
                <Link key={idx} scroll={true} href={`/study/label/${item}`}>
                    <div className={styles.categoryBubbleItem}>
                        {labelToName.get(item)}
                    </div>

                </Link>

            ))}
        </>

    )
}
