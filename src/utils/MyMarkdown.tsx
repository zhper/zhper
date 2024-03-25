'use client'
import React, { useRef, useState, useEffect, forwardRef } from 'react'
import Markdown from 'react-markdown'
import Image from 'next/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkCold, darcula, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { github, googlecode, atomOneDark, monoBlue, vs, githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'
import styles from './MyMarkdownStyle.module.css'
import MarkdownNav from './MarkdownNav/MarkdownNav'
import { Anchor } from 'antd';
import 'github-markdown-css'

//不能使用 rehype-highlight 这个插件，不然会有奇怪的问题

export default forwardRef(function MyMarkdown(props: any, mkRef: any) {

    const customComponents = {

        img(image: any) {
            const src = image.src
            // console.log('czz', image)
            return (
                <Image
                    loader={() => src}
                    src={src}
                    alt='img'
                    width={600}
                    height={300}
                />
            )
        },
        code(props: any) {
            const { children, className, node, ...rest } = props
            // console.log(String(children).replace(/\n$/, ''), '\n', children)
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
                <SyntaxHighlighter
                    {...rest}
                    // children={children as String[]}
                    style={oneLight}
                    language={match[1]}
                    PreTag="div"
                >{children as String[]}</SyntaxHighlighter>
            ) : (
                <code {...rest} className={className}>
                    {children}
                </code>
            )
        },

    }
    const handleClickFun = (e: any, link: any) => {
        // e.preventDefault();
        if (link.href) {
            // 找到锚点对应得的节点
            let element = document.getElementById(link.href);
            // 如果对应id的锚点存在，就跳滚动到锚点顶部
            element && element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }

    const isRend = useRef(0)

    const [titles, setTitles] = useState([])
    const addAnchor = () => {
        // if (isRend.current === 1) return
        // let ele = mkRef.current
        // console.log('dwad', ele)
        // let eid = 0
        // let titles = []
        // if (ele) {
        //     isRend.current = 1
        //     for (const e of ele.childNodes) {
        //         if (e.nodeName === 'H1' || e.nodeName === 'H2' || e.nodeName === 'H3' || e.nodeName === 'H4' || e.nodeName === 'H5' || e.nodeName === 'H6') {
        //             let a = document.createElement('a');
        //             a.setAttribute('id', '#' + eid);
        //             a.setAttribute('class', 'anchor-title');
        //             a.setAttribute('href', '#' + eid);
        //             a.innerText = ' '
        //             let title = {
        //                 type: e.nodeName,
        //                 id: eid,
        //                 name: e.innerText
        //             };
        //             titles.push(title);
        //             e.appendChild(a);
        //             eid++;
        //         }
        //     }

        //     setTitles(titles)
        // }
    }
    useEffect(() => {
        addAnchor()
    }, [])

    return (
        <>
            {/* <MarkdownNav titles={titles} children={props.children} /> */}
            {/* <div style={{ width: '20%' }} >
                <Anchor
                    onClick={handleClickFun}
                    items={
                        titles.map(t => (
                            {
                                key: t.id,
                                className: `title${t.type}`,
                                title: t.name,
                                href: `#${t.id}`
                            }
                        ))
                    }
                />
            </div> */}
            <article ref={mkRef} className={"markdown-body"}>
                <Markdown
                    rehypePlugins={[rehypeRaw]} // 识别 HTML
                    remarkPlugins={[remarkGfm]}  // 识别表格。删除线等
                    components={customComponents}
                >
                    {props.children}
                </Markdown>
            </article>
        </>


    )
})
