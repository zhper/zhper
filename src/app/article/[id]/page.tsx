'use client'

import React, { useEffect, useState, useRef } from 'react'
import styles from './page.module.css'
import UserBox from '@/components/UserBox'
import Markdown from 'react-markdown'
import topImg1 from '../../../../public/image/topImg1.png'
import { useParams } from 'next/navigation'
import MyMarkdown from '@/utils/MyMarkdown'
import MarkdownNav from '@/utils/MarkdownNav/MarkdownNav'
import Header from '@/components/Header'

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
    const [note, setNote] = useState<any>()
    const [categorySet, setCategorySet] = useState()
    const { id } = useParams()
    const [titles, setTitles] = useState([])
    const mkRef = useRef()


    useEffect(() => {
        (async () => {
            const res1 = await fetch(`/api/getLabel`, {
                method: 'POST',
            })
            const res2 = await fetch(`/api/getNoteData`, {
                method: 'POST',
                body: JSON.stringify({ category: 'studynotes', fileName: id }),
                next: { revalidate: 5000 }
            })
            setCategorySet((await res1.json()).data)
            setNote((await res2.json()).data.noteData)

        })()
    }, [])


    const isRend = useRef(0)

    const addAnchor = () => {
        if (isRend.current === 1) return
        let ele: any = mkRef.current
        console.log('dwad', ele)
        let eid = 0
        let titles: any = []
        if (ele) {
            isRend.current = 1
            for (const e of ele.childNodes) {
                if (e.nodeName === 'H1' || e.nodeName === 'H2' || e.nodeName === 'H3' || e.nodeName === 'H4' || e.nodeName === 'H5' || e.nodeName === 'H6') {
                    let a = document.createElement('a');
                    a.setAttribute('id', '' + eid);
                    a.setAttribute('class', 'anchor-title');
                    a.setAttribute('href', '#' + eid);
                    a.innerText = ' '
                    let title = {
                        type: e.nodeName,
                        id: eid,
                        name: e.innerText
                    };
                    titles.push(title);
                    e.appendChild(a);
                    eid++;
                }
            }
            setTitles(titles)
        }
    }
    useEffect(() => {
        addAnchor()
    })

    if (!categorySet || !note) return null

    return (
        <>
            <Header src={topImg1} detail={{ title: note.title, date: note.date, category: note.category, excerpt: note.excerpt }} />
            <div className={styles.box}>
                <MarkdownNav titles={titles} children={note.content} />
                <div style={{ width: '50%' }}>
                    <div style={{ width: '100%' }}>
                        <MyMarkdown ref={mkRef}>{note.content}</MyMarkdown>
                    </div>
                </div>
            </div>

        </>

    )
}

