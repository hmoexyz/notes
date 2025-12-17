import PageFrame from "@/components/PageFrame";
import { articles, content } from "@/utils/document";
import Image from "next/image";

export default async function Home() {
    const list = await articles();
    const markdown = await content('announcement.md', 'src/assets');
    return (
        <PageFrame list={list} current="announcement" content={markdown}/>
    )
}
