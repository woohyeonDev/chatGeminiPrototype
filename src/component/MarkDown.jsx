import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'




export default function Markdown({text}) {
	return (
    	<ReactMarkdown
    	components={{
          	// 코드를 어떻게 표현할지에 대한 내용
      		code({node, inline, className, children, ...props}) {
            // markdown에 사용된 언어
        	const match = /language-(\w+)/.exec(className || '')
            // 사용된 언어가 표시되어있는 경우
        	return !inline && match ? (
          	<SyntaxHighlighter
				{...props}
				children={String(children).replace(/\n$/, '')}
				style={dark}
				language={match[1]}
				PreTag="div"
          />
            // 사용된 언어를 따로 적지 않거나 적합하지 않을 경우
        	) : (
          	<code {...props} className={className}>
            {children}
          	</code>
        	)
      	}
    	}}
  	>{text}</ReactMarkdown>
    )
}