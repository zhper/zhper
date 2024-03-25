'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './style.module.css'
import { labelToName } from '@/utils/getFIleAndData'
export default function Header({ src, welcome = undefined, detail = undefined }) {
    return (
        <header className={`${styles.header} ${detail && styles.articleHeight}`}>
            <Image
                src={src}
                alt='zzz'
                className={`${detail && styles.articleHeight} ${styles.bgImg} `}
            />
            {welcome && (
                <div className={styles.welcome}>
                    <h1>{welcome.title}</h1>
                    <h2>{welcome.subTitle}</h2>

                </div>
            )}
            {
                detail && (
                    <div className={styles.detail}>
                        <h1>{detail.title}</h1>
                        <h2>{detail.excerpt}</h2>
                        <span> Posted by Zhper on {detail.date}</span>
                    </div>
                )
            }

        </header>

    )
}
