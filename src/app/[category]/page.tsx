'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import styles from './page.module.css'
import UserBox from '@/components/UserBox'
import NoteBox from '@/components/Note'
export default function Category() {
    const params = useParams()
    console.log(params)
    return (
        <div className={styles.container}>
            <UserBox />
            <NoteBox category={params.category} />
        </div>
    )
}