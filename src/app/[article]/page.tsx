import Markdown from "@/components/Markdown";
import PageFrame from "@/components/PageFrame";
import { SITE_CONFIG } from "@/config";
import { articles, content } from "@/utils/document";
import { text, title } from "@/utils/markdown";
import { Metadata } from "next";
import ReactMarkdown, { Components } from 'react-markdown'

export interface PageParams {
    article:string;
}

// 生成静态页面路径
export async function generateStaticParams() {
    const paramsList:PageParams[] = []
    for (const article of await articles()) {
        if (process.env.NODE_ENV === 'development') {
            paramsList.push({
                article: encodeURIComponent(article.path),
            });
        } else {
            paramsList.push({
                article: article.path,
            });
        }
    }
    return paramsList;
}

// 生成元数据
export async function generateMetadata({params}:{params:Promise<PageParams>}): Promise<Metadata> {
    const path = (await params);
    const markdown = await content(decodeURIComponent(path.article) + '.md');
    const canonical = SITE_CONFIG.origin + SITE_CONFIG.basePath + decodeURIComponent(path.article);
    
    return {
        title: `${title(markdown)} - ${SITE_CONFIG.brand}`,
        description: text(markdown).substring(0, 150),
        robots: "index, follow",
        alternates: {
            canonical: canonical,
        }
    };
}


// 生成页面
export default async function Page({params}:{params:Promise<PageParams>}) {
    const path = await params;
    const markdown = await content(decodeURIComponent(path.article) + '.md');
    const list = await articles();
    return (
        <PageFrame list={list} content={markdown} current={decodeURIComponent(path.article)}/>
    )
}