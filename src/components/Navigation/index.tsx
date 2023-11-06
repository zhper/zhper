import React from 'react'
import style from './style.module.css'
import Link from 'next/link'
export default function Navigation() {
    return (
        <header className={style.header}>
            <Link href={'/'}>
                <div className={style.logo}>
                    NEXT BLOG
                </div>
            </Link>
            <nav className={style.navUL}>
                <Link href={'/posts'}>Posts</Link>
                <Link href={'/contact'}>Contacts</Link>
            </nav>
        </header>
    )
}


