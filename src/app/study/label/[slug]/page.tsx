'use client'
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'next/navigation'
import { dataContext } from '@/context/DataProvider'
import styles from './page.module.css'
import topImg2 from '../../../../../public/image/topImg2.jpg'
import Header from '@/components/Header'
import UserBox from '@/components/UserBox'
import { labelToName } from '@/utils/getFIleAndData'
import NoteBox from '@/components/Note'
export default function Label() {
    const { slug }: any = useParams()
    const { allLabels }: any = useContext(dataContext)

    if (!allLabels) return <div>loading</div>
    return (
        <>
            <Header src={topImg2} welcome={{ title: labelToName.get(slug), subTitle: `这是 ${labelToName.get(slug)} 目录` }} />
            <div className={styles.container} >
                <NoteBox fileList={allLabels} label={true} />
                <UserBox labels={Object.keys(allLabels)} />
            </div>
        </>

    )
}