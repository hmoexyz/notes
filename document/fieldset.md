# HTML的<fieldset>元素

HTML的[`<fieldset>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.fieldset.md)元素是一个表单分组容器，用于将表单中的相关元素组合在一起，并可通过[`<legend>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.legend.md)元素添加分组标题。

## 基本语法
```html
<fieldset>
  <legend>分组标题</legend>
  <!-- 表单元素 -->
</fieldset>
```

## 主要特性
1. **视觉分组**：默认会在分组周围显示边框，使表单结构更清晰
2. **语义化**：提升表单可访问性，屏幕阅读器能识别分组关系
3. **禁用功能**：通过`disabled`属性可禁用整个分组内的表单元素

## 使用示例
```html
<fieldset>
  <legend>个人信息</legend>
  <label>姓名：<input type="text" name="name"></label>
  <label>年龄：<input type="number" name="age"></label>
</fieldset>

<fieldset disabled>
  <legend>会员信息（当前不可用）</legend>
  <label>会员等级：<input type="text" name="level"></label>
</fieldset>
```

## 样式定制
可以通过CSS修改默认外观：
```css
fieldset {
  border: 2px solid #3498db;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
}

legend {
  font-weight: bold;
  color: #3498db;
  padding: 0 10px;
}
```

## 应用场景
1. 复杂表单的多部分信息收集（如注册表单中的个人信息、联系方式等）
2. 需要整体禁用/启用一组表单控件时
3. 提升表单的可访问性和可读性

## 注意事项
- 必须配合[`<legend>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.legend.md)使用才能达到最佳可访问性效果
- 嵌套使用时要注意层级关系，避免过于复杂的结构
- 在现代布局中常与Flexbox/Grid配合使用
