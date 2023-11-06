'use client'
import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import styles from './style.module.css'
import { dataContext } from '@/context/DataProvider'
import { dirToCategoryMap } from '@/utils/getFIleAndData'
export default function CategoryItem() {
    const { allData, setAllData } = useContext(dataContext)
    console.log(allData)
    if (!allData.length) return null
    return (
        <>
            {allData.map((value, index) => (
                <div key={index} className={styles.noteItem}>
                    <Link href={`${dirToCategoryMap.get(value.category)}`}>
                        <div className={styles.info}>
                            <h1>{value.category}</h1>
                            <p>这是学习笔记专栏</p>
                        </div>
                    </Link>
                    <time>2023年09月20日（虚假的日期）</time>
                </div>
            ))}

            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>
            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>
            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>
            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>            <div className={styles.noteItem}>
                <Link href={`/posts/something`}>
                    <div className={styles.info}>
                        <h1>NEXT LEARN</h1>
                        <p>这是一段excerpt， 测试dawdawda达瓦达瓦低洼地达瓦大碗大碗大碗大碗大大达娃大啊我达dadaw瓦达瓦</p>
                    </div>
                </Link>
                <time>2023年09月20日</time>
            </div>
        </>
    )
}
