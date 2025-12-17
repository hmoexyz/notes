import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import "@/assets/markdown.css";

export interface MarkdownProps {
    content:string;
}

export default function Markdown(props: MarkdownProps) {
    
    return (
        <article className='markdown'>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({className, children}) {
                        const match = /language-(\w+)/.exec(className || '');

                        if (!match) {
                            return (
                                <code className={className}>
                                    {children}
                                </code>
                            )
                        } else {
                            return (
                                <SyntaxHighlighter
                                    showLineNumbers
                                    className={className} 
                                    language={match[1].toLocaleLowerCase()}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            )
                        }
                    }
                }}
            >
                {props.content}
            </ReactMarkdown>
        </article>
    )
}