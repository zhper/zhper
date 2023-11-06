import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './style.module.css'
import CategoryBubble from '../Category/CategoryBubble'

export default function UserBox() {
    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <div className={styles.userImage}>
                    <Image
                        src={'/image/avator.png'}
                        alt={'zzz'}
                        width={300}
                        height={300}
                    />
                </div>
                <div className={styles.namesContainer}>
                    <h1>
                        <div className={styles.username}>
                            zzzzp
                        </div>
                        <div className={styles.nickname}>
                            zhper
                        </div>
                    </h1>
                </div>
                <div className={styles.social}>
                    <Link href={'https://github.com/zhper'}>
                        <Image
                            src={'/social/github.svg'}
                            width={25}
                            height={25}
                            alt='github'
                        />
                    </Link>
                    <Link href={'https://github.com/zhper'}>
                        <Image
                            src={'/social/github.svg'}
                            width={25}
                            height={25}
                            alt='github'
                        />
                    </Link>
                </div>
                <div className={styles.categoryContainer}>
                    <CategoryBubble />
                </div>
            </div>
        </div>


    )
}
