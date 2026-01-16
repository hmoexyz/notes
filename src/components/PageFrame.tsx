import { Article } from "@/utils/document";
import Markdown from "./Markdown";
import Link from "next/link";

export default async function PageFrame(props:{list:Article[], current:string, content:string}) {
    return (
        <div style={{display:'flex', gap:8}}>
            <div style={{minWidth:0, flex:1,position:'relative',borderRight:'1px solid rgba(0,0,0,0.1)'}}>
                <nav style={{position:'sticky', top:0, height:'100vh', overflow:'auto' }}>
                    <ol reversed style={{listStyle:'none', margin: 0, padding:8, fontSize:'14px', }}>
                        <li style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color: props.current === 'index' ? '#00a152' : '#555', fontWeight: props.current === 'index' ? 'bold' : 'normal'}}>
                            <Link title="首页" href="/" style={{color:'unset', textDecoration:'none'}}><span style={{display:'inline-block', width:'4em', textAlign:'center'}}>🏡</span>首页</Link>
                        </li>
                        <li style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color: props.current === 'announcement' ? '#00a152' : '#555', fontWeight: props.current === 'announcement' ? 'bold' : 'normal'}}>
                            <Link title="公共" href="/announcement" style={{color:'unset', textDecoration:'none'}}><span style={{display:'inline-block', width:'4em', textAlign:'center'}}>📣</span>公告</Link>
                        </li>
                        {
                            props.list.flat().map((item,i) => {
                                return (
                                    <li key={i} style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color: item.path === props.current ? '#00a152' : '#555', fontWeight: item.path === props.current ? 'bold' : 'normal'}}>
                                        <Link title={item.title} href={`/${item.path}`} style={{color:'unset', textDecoration:'none'}}><span style={{display:'inline-block', width:'4em', textAlign:'center'}}>EP{(props.list.length - i).toString().padStart(3, '0')}</span>{item.title}</Link>
                                    </li>
                                )
                            })
                        }
                    </ol>
                </nav>
            </div>
            <main style={{minWidth:0, flex:4, padding:8}}>
                <Markdown content={props.content}/>
            </main>
        </div>
    )
}