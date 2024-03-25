'use client'

import React, { useEffect, useState } from 'react'
import NoteItem from './NoteItem'
import styles from './style.module.css'
import next from 'next'
import { Pagination } from 'antd'
import { useParams } from 'next/navigation'

export default function NoteBox({ category = 'studynotes', label = true, fileList = [] }) {
    let arr = []
    if (label) {
        const { slug } = useParams()
        arr = fileList[slug]
    } else arr = fileList

    const [allNotes, setAllNotes] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const postPerPage = 5
    const totalPage = Math.ceil(allNotes.length / postPerPage)
    console.log(totalPage)
    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPost = allNotes.slice(indexOfFirstPost, indexOfLastPost)


    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/getNoteDataByArr`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(arr),
            })
            setAllNotes((await res.json()).data)
        })()
    }, [])
    return (
        <div className={styles.container} >
            {allNotes.length &&
                currentPost.map((value, index) => (
                    <div key={index} className={`${styles.noteContainer} ${index !== 0 && styles.divider}`}>
                        <NoteItem key={index} data={value} />
                    </div>
                ))
            }
            {
                allNotes.length &&
                <div className={`${styles.pageNav} ${styles.divider}`}>
                    <div style={currentPage === 1 ? { visibility: 'hidden' } : undefined} onClick={() => setCurrentPage(currentPage - 1)}>
                        ← NEWER
                    </div>
                    <div style={currentPage === totalPage ? { visibility: 'hidden' } : undefined} onClick={() => setCurrentPage(currentPage + 1)}>
                        OLDER →
                    </div>
                </div>
            }

        </div>

    )
}
