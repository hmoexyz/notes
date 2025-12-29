// 复制：https://github.com/hubenchang0515/primers/blob/master/src/utils/document.ts

import path from "path/posix";
import fs from 'fs/promises';
import { execFile } from "child_process";
import { DOCUMENT_CONFIG } from "@/config";
import { title } from "./markdown";

export interface DocState {
    createdTime: Date;
    updatedTime: Date;
}

export interface Article {
    path: string;
    state: DocState;
    title: string;
}

// 获取文章列表
export async function articles() {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root);
    const files = await fs.readdir(dir, { withFileTypes: true });
    const results:Article[] = [];
    for (const file of files) {
        if (!file.name.endsWith('.md'))
            continue;

        results.push({
            path: file.name.replace(/\.[^/.]+$/, ''),
            state: await docState(file.name),
            title: title(await content(file.name)),
        });
    }
    results.sort((x, y) => y.state.createdTime.getTime() - x.state.createdTime.getTime());
    return results;
}

// 获取文章内容
export async function content(article:string, root?:string) {
    try {
        const file = path.join(process.cwd(), root ?? DOCUMENT_CONFIG.root, article);
        const text = await fs.readFile(file, 'utf-8');
        return text;
    } catch (err) {
        throw err;
    }
}

// 获取文档状态（创建与更新时间）
export async function docState(article:string): Promise<DocState> {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root);
    const file = path.join(process.cwd(), DOCUMENT_CONFIG.root, article);

    return new Promise((resolve) => {
        execFile('git', ['-C', dir, 'log', '--format="%ai"', file], (err, stdout) => {
            if (err || stdout.trim().length === 0) {
                if (err) {
                    console.error(err);
                }

                resolve({
                    createdTime: new Date(),
                    updatedTime: new Date(),
                });
            } else {
                const lines = stdout.split("\n").filter(Boolean);
                resolve({
                    createdTime: new Date(lines[lines.length - 1]),
                    updatedTime: new Date(lines[0]),
                });
            }
        })
    })
}