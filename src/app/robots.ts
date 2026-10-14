import { SITE_CONFIG } from "@/config";
import { MetadataRoute } from "next";

export const dynamic = 'force-static'

// 生成 robots.txt，声明站点地图地址
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${SITE_CONFIG.origin}${SITE_CONFIG.basePath}/sitemap.xml`,
    };
}
