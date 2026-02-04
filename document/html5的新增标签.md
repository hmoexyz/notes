# html5的新增标签

## HTML5新增结构标签

HTML5引入了多个语义化标签，用于更清晰地描述网页结构：

* [`<header>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.header.md)：定义文档或节的页眉
* [`<footer>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.footer.md)：定义文档或节的页脚
* [`<nav>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.nav.md)：定义导航链接
* [`<article>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.article.md)：定义独立的内容块
* [`<section>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.section.md)：定义文档中的节
* [`<aside>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.aside.md)：定义页面内容之外的内容（如侧栏）

## HTML5新增多媒体标签

为支持原生多媒体内容，新增以下标签：

* [`<audio>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.audio.md)：嵌入音频内容
* [`<video>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.video.md)：嵌入视频内容
* [`<source>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.source.md)：为多媒体元素定义多种媒体资源
* [`<track>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.track.md)：为视频添加字幕或章节

```html
<video controls width="250">
    <source src="video.mp4" type="video/mp4">
    <track kind="subtitles" src="subtitles.vtt" srclang="en">
</video>

```

## HTML5新增表单元素和属性

新增表单控件和输入类型：

* [`<datalist>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.datalist.md)：定义输入控件的预定义选项
* [`<output>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.output.md)：表示计算结果
* [`<meter>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.meter.md)：定义度量衡
* [`<progress>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.progress.md)：显示任务进度

新增输入类型：

* `email`、`url`、`number`、`range`
* `date`、[`time`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.time.md)、`datetime-local`
* `search`、`color`、`tel`

## HTML5新增图形和嵌入标签

* [`<canvas>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.canvas.md)：通过脚本绘制图形
* [`<svg>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.svg.md)：定义矢量图形容器
* [`<embed>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.embed.md)：定义外部应用程序容器
* [`<figure>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.figure.md)和[`<figcaption>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.figcaption.md)：定义图像及标题

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
<script>
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 80, 80);
</script>

```

## HTML5其他重要标签

* [`<details>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.details.md)和[`<summary>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.summary.md)：创建可展开/折叠的内容
* [`<mark>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.mark.md)：高亮显示文本
* [`<time>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.time.md)：定义日期/时间
* [`<main>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.main.md)：定义文档主要内容
* [`<template>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.template.md)：定义可重复使用的HTML模板

这些新增标签提升了网页的语义化程度，减少了对div的依赖，并增强了原生多媒体支持能力。

---

> 《[html5的新增标签](https://notes.ksapp.me/home?page=8/111764ceb1f82937d030474663503a3112c774ad9d41f9d5972e265d6f9f7857)》 是转载文章，[点击查看原文](https://blog.csdn.net/2301_81365247/article/details/152889706)。