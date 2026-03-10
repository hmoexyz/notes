# HTML的<ruby>元素

[`<ruby>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.ruby.md)元素是HTML5中用于添加注音或字符注解的语义化标签，主要用于东亚文字（如中文、日文）的注音标注。以下是关于该元素的详细介绍：

## 基本结构

[`<ruby>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.ruby.md)元素通常包含以下子元素：
- 基础文本（需要标注的文字）
- [`<rt>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.rt.md)元素（包含注音或注解）
- 可选的[`<rp>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.rp.md)元素（为不支持ruby的浏览器提供后备显示）

```html
<ruby>
  汉 <rp>(</rp><rt>hàn</rt><rp>)</rp>
  字 <rp>(</rp><rt>zì</rt><rp>)</rp>
</ruby>
```

## 主要应用场景

1. **中文拼音标注**：
   ```html
   <ruby>中<rt>zhōng</rt>国<rt>guó</rt></ruby>
   ```

2. **日语假名标注**：
   ```html
   <ruby>
     绅<rp>(</rp><rt>へん</rt><rp>)</rp> 
     士<rp>(</rp><rt>たい</rt><rp>)</rp>
   </ruby>
   ```

3. **生僻字解释**：
   ```html
   <ruby>魑<rt>chī</rt>魅<rt>mèi</rt>魍<rt>wǎng</rt>魉<rt>liǎng</rt></ruby>
   ```

## 浏览器支持

现代主流浏览器（Chrome、Firefox、Safari、Edge等）都支持[`<ruby>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.ruby.md)元素。对于不支持的老旧浏览器：
- [`<rp>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.rp.md)元素中的内容会显示为后备
- 没有[`<rp>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.rp.md)时，[`<rt>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.rt.md)内容会直接显示在基础文本旁边

## 样式定制

可以通过CSS自定义[`<ruby>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.ruby.md)元素的显示效果：

```css
ruby {
  font-size: 24px;
}

rt {
  font-size: 12px;
  color: #666;
}
```

## 注意事项

1. 每个基础字符通常需要单独的[`<rt>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.rt.md)注解
2. 注解文本不宜过长，以免影响可读性
3. 在移动端使用时需注意小屏幕上的显示效果

[`<ruby>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.ruby.md)元素为东亚文字的注音标注提供了标准化的解决方案，比传统使用[`<span>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.span.md)等元素实现的方式更加语义化和规范化。
