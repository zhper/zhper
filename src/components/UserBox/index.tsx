'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './style.module.css'
import CategoryBubble from '../LabelBubble'

export default function UserBox({ labels }: any) {
    return (
        <div className={styles.container}>
            <div className={`${styles.box} divider`}>
                <h5 className={styles.title}>FEATURED LABELS</h5>
                <div className={styles.categoryContainer}>
                    <CategoryBubble labels={labels} />
                </div>
            </div>
            <div className={`${styles.box} divider`}>
                <h5 className={styles.title}>ABOUNT ME</h5>
                <div className={styles.shortAbout}>
                    <Image
                        src={'/image/avator.png'}
                        alt={'zzz'}
                        width={120}
                        height={120}
                    />
                    <p>
                        读书破万卷<br />
                        下笔如有神
                    </p>
                    <ul style={{ listStyle: 'none' }}>
                        <li>
                            <Link href={'https://github.com/zhper'}>
                                <Image
                                    src={'/social/github.svg'}
                                    width={25}
                                    height={25}
                                    alt='github'
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href={'https://github.com/zhper'}>
                                <Image
                                    src={'/social/github.svg'}
                                    width={25}
                                    height={25}
                                    alt='github'
                                />
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
            <div className={`${styles.box} divider`}>
                <h5 className={styles.title}>OTHERS</h5>
            </div>
        </div>



    )
}
