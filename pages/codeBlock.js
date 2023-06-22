import React from "react"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
//import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"
import solidity from 'react-syntax-highlighter/dist/cjs/languages/prism/solidity'

//SyntaxHighlighter.registerLanguage('solidity', solidity)

const CodeBlock = ({ language, value }) => {
    return (
        <SyntaxHighlighter language={language} >
            {value}
        </SyntaxHighlighter>
    )
}

export default CodeBlock