'use client'

import React, { useEffect, useState, forwardRef } from 'react'
import style from './style.module.css'
import Link from 'next/link'
export default function Navigation(props) {

    const [isShow, setIsShow] = useState(false)
    const [isTop, setIsTop] = useState(false)
    let lastScrollTop = 0;
    const handleScroll = (e) => {

        let scrollTop = document.documentElement.scrollTop; //滚动条滚动高度
        if (scrollTop === 0) setIsTop(true)
        else setIsTop(false)
        if (scrollTop > lastScrollTop) {
            setIsShow(true)
        } else {
            setIsShow(false)
        }
        lastScrollTop = document.documentElement.scrollTop
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])



    return (
        <nav className={`${style.nav} ${isShow && style.hide} ${isTop && style.navTop}`}>
            <Link href={'/'}>
                <div className={style.logo}>
                    Zhper's BLOG
                </div>
            </Link>
            <nav className={style.navUL}>
                <Link href={'/study'}>Post</Link>
                <Link href={'/life'}>Life</Link>
                <Link href={'/portfolio'}>Portfolio</Link>
                <Link href={'/label'}>Label</Link>

            </nav>
        </nav>
    )
}


