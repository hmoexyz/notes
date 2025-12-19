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
                    img({ src }) {
                        return <img src={src} style={{display:'block', margin:'auto'}} referrerPolicy="no-referrer"/>
                    },

                    code({className, children}) {
                        const match = /language-(\w+)/.exec(className || '');

                        if (match) {
                            return (
                                <SyntaxHighlighter
                                    showLineNumbers
                                    className={className} 
                                    language={match[1].toLocaleLowerCase()}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            )
                        } else if(children?.toString().includes('\n')) {
                            return (
                                <SyntaxHighlighter
                                    showLineNumbers
                                    className={className} 
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            )
                        } else {
                            return (
                                <code className={className}>
                                    {children}
                                </code>
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