# CSS 的弹性布局

> 转载自 [CSS 的弹性布局](https://xplanc.org/primers/document/zh/03.HTML/02.%E6%A0%B7%E5%BC%8F/08.%E5%BC%B9%E6%80%A7%E5%B8%83%E5%B1%80.md)

## 弹性布局

通过将一个元素样式的 `display` 属性设为 `flex`，可以将该元素设为弹性布局的 **容器**，
容器的直接子元素将不再占据一行。

示例：

```html
<div style="display:flex; height:100px;">
    <main style="background-color:#212121; color:cyan;">
        main
    </main>
    <aside style="background-color:#666; color:yellow;">
        aside
    </aside>
</div>
```

## 主轴和交叉轴

弹性容器中，默认水平方向为主轴，竖直方向为交叉轴，子元素在主轴上依次排列。

可以通过容器的 `flex-direction` 属性改变方向：

* `row` - 水平方向为主轴，竖直方向为交叉轴
* `column` - 竖直方向为主轴，水平方向为交叉轴

示例：

```html
<div style="display:flex; flex-direction:column; height:100px;">
    <main style="background-color:#212121; color:cyan;">
        main
    </main>
    <aside style="background-color:#666; color:yellow;">
        aside
    </aside>
</div>
```

这个示例将弹性布局的主轴设为了数值方向；相应的，交叉轴为水平方向。

## flex-grow 和 flex-shrink

当子元素的总长度小于主轴长度时，可以给子元素的样式添加 `flex-grow` 使其长度增加。

这个属性的值表示当弹性容器没有被占满时，子元素增加的长度占剩余长度的比例。

下面这个示例将 `<main>` 元素的 `flex-grow` 值设为 5，`<aside>` 的 `flex-grow` 元素设为 1。

因此剩余空间的 $\frac{5}{5+1}$ 将分配给 `<main>` 元素，$\frac{1}{5+1}$  `aside` 元素。

```html
<div style="display:flex; height:100px;">
    <main style="flex-grow:5; background-color:#212121; color:cyan;">
        main
    </main>
    <aside style="flex-grow:1; background-color:#666; color:yellow;">
        aside
    </aside>
</div>
```

相似的，当子元素的总长度大于主轴长度时，可以给子元素的样式添加 `flex-shrink` 使其长度减少。

这个属性的值表示当弹性容器内容溢出时，子元素减少的长度占溢出长度的比例。

## 主轴上的对齐方式

默认情况下，子元素在容器主轴上向起始边缘对齐，可以通过容器的 `justify-content` 属性修改对齐方式。

* `start` - 子元素在容器主轴上向起始边缘对齐
* `end` - 子元素在容器主轴上向末端边缘对齐
* `center` - 子元素在容器主轴上居中对齐
* `space-between` - 子元素在容器主轴均匀分布，两端不留空
* `space-around` - 子元素在容器主轴均匀分布，两端留空为间隔的一半
* `space-evenly` - 子元素在容器主轴均匀分布，两端留空和间隔一致

下面的示例可以清晰的查看这六种对齐方式的差异。

```html 
<div style="display:flex; justify-content:start; height:100px; background-color:#212121;">
    <div style="background-color:red;color:white;">item</div>
    <div style="background-color:green;color:white;">item</div>
    <div style="background-color:blue;color:white;">item</div>
</div>

<div style="display:flex; justify-content:end; height:100px; background-color:#212121;">
    <div style="background-color:red;color:white;">item</div>
    <div style="background-color:green;color:white;">item</div>
    <div style="background-color:blue;color:white;">item</div>
</div>

<div style="display:flex; justify-content:center; height:100px; background-color:#212121;">
    <div style="background-color:red;color:white;">item</div>
    <div style="background-color:green;color:white;">item</div>
    <div style="background-color:blue;color:white;">item</div>
</div>

<div style="display:flex; justify-content:space-between; height:100px; background-color:#212121;">
    <div style="background-color:red;color:white;">item</div>
    <div style="background-color:green;color:white;">item</div>
    <div style="background-color:blue;color:white;">item</div>
</div>

<div style="display:flex; justify-content:space-around; height:100px; background-color:#212121;">
    <div style="background-color:red;color:white;">item</div>
    <div style="background-color:green;color:white;">item</div>
    <div style="background-color:blue;color:white;">item</div>
</div>

<div style="display:flex; justify-content:space-evenly; height:100px; background-color:#212121;">
    <div style="background-color:red;color:white;">item</div>
    <div style="background-color:green;color:white;">item</div>
    <div style="background-color:blue;color:white;">item</div>
</div>
```

## 交叉轴上的对齐方式

默认情况下，子元素在容器交叉轴上两端对齐，即占满整个交叉轴。可以通过容器的 `align-items` 属性修改对齐方式。

* `stretch` - 子元素在容器交叉轴上两端对齐
* `start` - 子元素在容器交叉轴上向起始边缘对齐
* `end` - 子元素在容器交叉轴上向末端边缘对齐
* `center` - 子元素在容器交叉轴上居中对齐

下面的示例可以清晰的查看这四种对齐方式的差异。

```html
<div style="display:flex; align-items:stretch; height:100px; background-color:#212121;">
    <div style="background-color:red;color:white;">item</div>
    <div style="background-color:green;color:white;">item</div>
    <div style="background-color:blue;color:white;">item</div>
</div>

<div style="display:flex; align-items:start; height:100px; background-color:#212121;">
    <div style="background-color:red;color:white;">item</div>
    <div style="background-color:green;color:white;">item</div>
    <div style="background-color:blue;color:white;">item</div>
</div>

<div style="display:flex; align-items:end; height:100px; background-color:#212121;">
    <div style="background-color:red;color:white;">item</div>
    <div style="background-color:green;color:white;">item</div>
    <div style="background-color:blue;color:white;">item</div>
</div>

<div style="display:flex; align-items:center; height:100px; background-color:#212121;">
    <div style="background-color:red;color:white;">item</div>
    <div style="background-color:green;color:white;">item</div>
    <div style="background-color:blue;color:white;">item</div>
</div>
```

## 换行

默认情况下，当子元素的总长度大于主轴长度时，子元素会溢出显示。
可以通过容器的 `flex-wrap` 属性让溢出的元素换行。

* `nowrap` - 不换行
* `wrap` - 当空间不足时自动换行
* `wrap-reverse` - 当空间不足时自动换行，并且行的顺序逆转

下面的示例中容器宽度在不断变化，可以清晰的查看这三种方式的差异。

```html
<div style="display:flex; align-items:center; flex-wrap:nowrap; background-color:#212121;">
    <div style="background-color:red;color:white; width:80px;">item</div>
    <div style="background-color:green;color:white; width:80px;">item</div>
    <div style="background-color:blue;color:white; width:80px;">item</div>
    <div style="background-color:orange;color:white; width:80px;">item</div>
    <div style="background-color:purple;color:white; width:80px;">item</div>
    <div style="background-color:cyan;color:white; width:80px;">item</div>
</div>

<div style="display:flex; align-items:center; flex-wrap:wrap; background-color:#212121;">
    <div style="background-color:red;color:white; width:80px;">item</div>
    <div style="background-color:green;color:white; width:80px;">item</div>
    <div style="background-color:blue;color:white; width:80px;">item</div>
    <div style="background-color:orange;color:white; width:80px;">item</div>
    <div style="background-color:purple;color:white; width:80px;">item</div>
    <div style="background-color:cyan;color:white; width:80px;">item</div>
</div>

<div style="display:flex; align-items:center; flex-wrap:wrap-reverse; background-color:#212121;">
    <div style="background-color:red;color:white; width:80px;">item</div>
    <div style="background-color:green;color:white; width:80px;">item</div>
    <div style="background-color:blue;color:white; width:80px;">item</div>
    <div style="background-color:orange;color:white; width:80px;">item</div>
    <div style="background-color:purple;color:white; width:80px;">item</div>
    <div style="background-color:cyan;color:white; width:80px;">item</div>
</div>
```

## 行在交叉轴上的对齐方式

通过容器的 `align-content` 属性设置行在交叉轴上的对齐方式。

* `start` - 行在容器交叉轴上向起始边缘对齐
* `end` - 行在容器交叉轴上向末端边缘对齐
* `center` - 行在容器交叉轴上居中对齐
* `space-between` - 行在容器交叉轴上均匀分布，两端不留空
* `space-around` - 行在容器交叉轴上均匀分布，两端留空为间隔的一半
* `space-evenly` - 行在容器交叉轴上均匀分布，两端留空为和间隔一致

下面的示例可以清晰的查看这六种对齐方式的差异。

```html
<div style="display:flex; align-content:start; align-items:start; flex-wrap:wrap; height:100px; width:80px; background-color:#212121;">
    <div style="background-color:red;color:white; width:40px;">item</div>
    <div style="background-color:green;color:white; width:40px;">item</div>
    <div style="background-color:blue;color:white; width:40px;">item</div>
</div>

<div style="display:flex; align-content:end; align-items:start; flex-wrap:wrap; height:100px; width:80px; background-color:#212121;">
    <div style="background-color:red;color:white; width:40px;">item</div>
    <div style="background-color:green;color:white; width:40px;">item</div>
    <div style="background-color:blue;color:white; width:40px;">item</div>
</div>

<div style="display:flex; align-content:center; align-items:start; flex-wrap:wrap; height:100px; width:80px; background-color:#212121;">
    <div style="background-color:red;color:white; width:40px;">item</div>
    <div style="background-color:green;color:white; width:40px;">item</div>
    <div style="background-color:blue;color:white; width:40px;">item</div>
</div>

<div style="display:flex; align-content:space-between; align-items:start; flex-wrap:wrap; height:100px; width:80px; background-color:#212121;">
    <div style="background-color:red;color:white; width:40px;">item</div>
    <div style="background-color:green;color:white; width:40px;">item</div>
    <div style="background-color:blue;color:white; width:40px;">item</div>
</div>

<div style="display:flex; align-content:space-around; align-items:start; flex-wrap:wrap; height:100px; width:80px; background-color:#212121;">
    <div style="background-color:red;color:white; width:40px;">item</div>
    <div style="background-color:green;color:white; width:40px;">item</div>
    <div style="background-color:blue;color:white; width:40px;">item</div>
</div>

<div style="display:flex; align-content:space-evenly; align-items:start; flex-wrap:wrap; height:100px; width:80px; background-color:#212121;">
    <div style="background-color:red;color:white; width:40px;">item</div>
    <div style="background-color:green;color:white; width:40px;">item</div>
    <div style="background-color:blue;color:white; width:40px;">item</div>
</div>
```
