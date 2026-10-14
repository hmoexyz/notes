import { SITE_CONFIG } from "@/config";
import { articles } from "@/utils/document";
import { MetadataRoute } from "next";

export const dynamic = 'force-static'

const BASE = SITE_CONFIG.origin + SITE_CONFIG.basePath;

// 生成站点地图
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const list = await articles();
    return [
        { url: BASE, changeFrequency: 'daily', priority: 1 },
        { url: `${BASE}/announcement`, changeFrequency: 'weekly', priority: 0.5 },
        ...list.map((article) => ({
            url: `${BASE}/${encodeURIComponent(article.path)}`,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        })),
    ];
}
