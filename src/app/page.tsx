import PageFrame from "@/components/PageFrame";
import { SITE_CONFIG } from "@/config";
import { articles, content } from "@/utils/document";
import { text } from "@/utils/markdown";
import { Metadata } from "next";

// 生成元数据
export async function generateMetadata(): Promise<Metadata> {
    const markdown = await content('index.md', 'src/assets');
    const canonical = SITE_CONFIG.origin + SITE_CONFIG.basePath;
    
    return {
        title: `首页 - ${SITE_CONFIG.brand}`,
        description: text(markdown).substring(0, 150),
        robots: "index, follow",
        alternates: {
            canonical: canonical,
        }
    };
}

export default async function Home() {
    const list = await articles();
    const markdown = await content('index.md', 'src/assets');
    return (
        <PageFrame list={list} current="index" content={markdown}/>
    )
}
