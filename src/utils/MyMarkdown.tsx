'use client'
import React from 'react'
import Markdown from 'react-markdown'
import Image from 'next/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkCold, darcula, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { github, googlecode, atomOneDark, monoBlue, vs, githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'

export default function MyMarkdown(props) {

    const customComponents = {
        img(image) {
            return (
                <Image
                    src={`/image/avator.png`}
                    alt='zzx'
                    width={600}
                    height={300}
                />
            )
        },
        code: (props) => {
            console.log('zzz', props)
            const { children, className, node, ...rest } = props
            const match = /language-(\w+)/.exec(className || '')
            return (<SyntaxHighlighter
                language={match?.[1]}
                showLineNumbers={true}
                style={oneLight as any}
                PreTag='div'
                className='syntax-hight-wrapper'
                {...props}
            >
                {children as string[]}
            </SyntaxHighlighter>)
        },
        // p: 'div'

    }

    return (
        <Markdown
            rehypePlugins={[rehypeHighlight, rehypeSanitize, rehypeRaw]}
            remarkPlugins={[remarkGfm]}
        // components={customComponents}
        >
            {props.children}
        </Markdown>
    )
}
