'use client'

import React, { useState, useRef, useEffect } from 'react'
import MarkdownNavbar from 'markdown-navbar';
import styles from './style.module.css'
import { Anchor } from 'antd';
// import 'markdown-navbar/dist/navbar.css';
export default function MarkdownNav({ children, titles }: any) {
    const [ishidden, setIshidden] = useState(false)

    const handleClickFun = (e: any, link: any) => {
        e.preventDefault();
        if (link.href) {
            // 找到锚点对应得的节点
            let element = document.getElementById(link.href);
            // 如果对应id的锚点存在，就跳滚动到锚点顶部
            element && element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }

    return (
        <div className={`${styles.container} ${ishidden && styles.hidden}`}>
            <div
                onClick={() => setIshidden(!ishidden)}
                className={`${styles.toggleBtn} ${ishidden && styles.hiddenBtn}`}>
                {ishidden ? '>' : '<'}
            </div>
            <div className={styles.containerNav}>
                {/* <MarkdownNavbar
                    ordered={false}
                    source={children}
                /> */}
                <Anchor
                    onClick={handleClickFun}
                    affix={false}
                    items={
                        titles.map((t: any) => (
                            {
                                key: t.id,
                                className: styles[`title${t.type}`],
                                title: t.name,
                                href: `#${t.id}`
                            }
                        ))
                    }
                />
            </div>

        </div>


    )
}
