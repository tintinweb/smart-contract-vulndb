import React from "react"
import ReactMarkdown from "react-markdown"
import CodeBlock from './codeBlock'
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"

const RenderedMarkdown = ({ content }) => (
    <ReactMarkdown>{content}</ReactMarkdown>
)

export default RenderedMarkdown