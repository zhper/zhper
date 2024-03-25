'use client'

import React, { useEffect, useState, useRef } from 'react'
import styles from './page.module.css'
import Header from '@/components/Header'
import topImg1 from '../../../public/image/topImg1.png'
import NoteBox from '@/components/Note'
export default function Life() {

    return (
        <div>
            <Header src={topImg1} welcome={{ title: 'portfolio', subTitle: '一些项目' }} />
            <NoteBox label={false} />

        </div>

    )
}

