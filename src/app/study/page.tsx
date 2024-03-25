'use client'

import styles from './page.module.css'
import UserBox from '@/components/UserBox'
import NoteBox from '@/components/Note'
import { redirect } from 'next/navigation'
import topImg2 from '../../../public/image/topImg2.jpg'
import Header from '@/components/Header'
import { dataContext } from '@/context/DataProvider'
import { useContext } from 'react'
export default function Home() {
    const { allFiles, allLabels } = useContext(dataContext)
    return (
        <>
            <Header welcome={{ title: 'Zhper 小站', subTitle: '即将进入美团码农' }} src={topImg2} />

            <div className={styles.container} >
                {allFiles && allLabels && (
                    <>
                        <NoteBox label={false} fileList={allFiles}></NoteBox>
                        <UserBox labels={Object.keys(allLabels)}></UserBox>
                    </>
                )}

            </div>
        </>

    )

}
