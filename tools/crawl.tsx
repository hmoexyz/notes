import axios from "axios";
import * as cheerio from "cheerio";
import { writeFileSync } from "fs";
import { NodeHtmlMarkdown, TranslatorConfigObject } from 'node-html-markdown';

// HTML 转 Markdown
export function htmlToMarkdown(html: string): string {
    const customRules: TranslatorConfigObject = {
        code: ({ node }) => {
            if (!node.innerText.includes("\n")) {
                return {
                    prefix: "`",
                    postfix: "`",
                    content: node.textContent || "",
                };
            }

            const className = node.classList.toString() || "";
            const match = className.match(/language-(\w+)/);
            const lang = match ? match[1] : "txt"; // 没有就用 txt
            return {
                prefix: `\`\`\`${lang}\n`,
                postfix: "\n```",
                content: node.textContent || "",
            };
        }
    };
    const nhm = new NodeHtmlMarkdown({}, customRules);
    return nhm.translate(html);
}


// 爬取正文
export async function crawl(url:string, selector:string='article') {
    try {
        // 1. 请求页面
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
            },
        });

        // 2. 加载 HTML
        const $ = cheerio.load(data);

        // 4. 保存文章
        const html = $(selector).html()?.trim();
        if (!html) {
            return false;
        }
        writeFileSync(`document/crawl.md`, htmlToMarkdown(html));

        return true;
    } catch (err) {
        console.error(`爬取 ${url} 失败：`, err);
        return false
    }
}

crawl(process.argv[2], process.argv[3])