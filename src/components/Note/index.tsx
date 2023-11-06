'use client'

import React, { useEffect, useState } from 'react'
import NoteItem from './NoteItem'
import styles from './style.module.css'
import next from 'next'

export default function NoteBox({ category }) {
    const [allNotes, setAllNotes] = useState([])
    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/getAllNoteData`, {
                method: 'POST',
                body: JSON.stringify({ category }),
                next: { revalidate: 5000 }
            })
            setAllNotes((await res.json()).data.allNotesData)
        })()
    }, [])
    if (!allNotes.length) return null
    return (
        <div className={styles.container}>
            {
                allNotes.map((value, index) => (
                    <div key={index} className={`${styles.noteContainer} ${index !== 0 && styles.divider}`}>
                        <NoteItem key={index} data={value} />
                    </div>

                ))
            }
        </div>
    )
}
