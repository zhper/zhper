'use client'

import styles from './page.module.css'
import UserBox from '@/components/UserBox'
import NoteBox from '@/components/Note'
import { redirect } from 'next/navigation'
import { dataContext } from '@/context/DataProvider'
import { useContext } from 'react'
export default function Home() {
  redirect('/study')
  // const { allFiles, allLabels } = useContext(dataContext)
  // console.log(allFiles)
  // console.log(allLabels)
  // return (
  //   <div className={styles.container} >
  //     {allFiles && allLabels && (
  //       <>
  //         <NoteBox label={false} fileList={allFiles}></NoteBox>
  //         <UserBox labels={Object.keys(allLabels)}></UserBox>
  //       </>
  //     )}

  //   </div>
  // )

}
