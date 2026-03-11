# Canvas绘图示例



## 什么是 HTML Canvas

HTML [`<canvas>`](https://xplanc.org/primers/document/zh/03.HTML/EX.HTML%20%E5%85%83%E7%B4%A0/EX.canvas.md) 元素是 HTML5 新增的一个绘图标签，它提供了一个可以通过 JavaScript 绘制图形的区域。Canvas 本质上是一个位图画布，允许开发者通过脚本（通常是 JavaScript）动态渲染图形、图表、动画等内容。

### 基本语法

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

## Canvas 的主要特性

1. **动态绘图能力**：可以在网页上实时绘制各种图形
2. **像素级操作**：可以对画布上的每个像素进行精确控制
3. **无插件**：不需要任何额外插件，原生支持在现代浏览器中
4. **丰富的 API**：提供了丰富的绘图方法和属性

## 基本使用步骤

1. **获取 Canvas 元素**：
   ```javascript
   const canvas = document.getElementById('myCanvas');
   ```

2. **获取绘图上下文**：
   ```javascript
   const ctx = canvas.getContext('2d');
   ```

3. **开始绘图**：
   ```javascript
   ctx.fillStyle = 'red';
   ctx.fillRect(10, 10, 150, 80);
   ```

## 常用绘图方法

### 绘制矩形
- `fillRect(x, y, width, height)` - 绘制填充矩形
- `strokeRect(x, y, width, height)` - 绘制矩形边框
- `clearRect(x, y, width, height)` - 清除指定矩形区域

### 绘制路径
- `beginPath()` - 开始新路径
- `moveTo(x, y)` - 移动画笔到指定位置
- `lineTo(x, y)` - 绘制直线到指定位置
- `arc(x, y, radius, startAngle, endAngle, anticlockwise)` - 绘制圆弧
- `closePath()` - 闭合路径
- `fill()` - 填充路径
- `stroke()` - 描边路径

### 文本绘制
- `fillText(text, x, y)` - 绘制填充文本
- `strokeText(text, x, y)` - 绘制文本轮廓

## 样式控制

1. **颜色**：
   ```javascript
   ctx.fillStyle = 'blue'; // 设置填充颜色
   ctx.strokeStyle = '#FF0000'; // 设置描边颜色
   ```

2. **线条样式**：
   ```javascript
   ctx.lineWidth = 5; // 设置线条宽度
   ctx.lineCap = 'round'; // 设置线条末端样式
   ctx.lineJoin = 'bevel'; // 设置线条连接处样式
   ```

## 应用场景

1. **数据可视化**：绘制各种图表（柱状图、折线图、饼图等）
2. **游戏开发**：开发2D网页游戏
3. **图像处理**：实现滤镜、裁剪等图像处理功能
4. **动画效果**：创建各种动态效果
5. **交互式绘图**：实现画板、签名板等功能

## 性能优化建议

1. 尽量减少不必要的画布重绘
2. 对于复杂的静态图形，可以考虑先绘制到离屏canvas
3. 合理使用`requestAnimationFrame`进行动画绘制
4. 对于大量相似图形，考虑使用路径批量绘制而非单独绘制

## 浏览器兼容性

现代浏览器（Chrome、Firefox、Safari、Edge等）都良好支持Canvas。对于IE9以下版本，可以使用兼容库如excanvas.js。

## 示例：画一个哆啦A梦

![哆啦A梦](/notes/dream.png)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas 哆啦A梦</title>
    <style>
        body {
            background: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }
        canvas {
            display: block;
            border: 1px solid #ccc;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <canvas id="doraemonCanvas" width="400" height="400"></canvas>
    <script>
        (function() {
            const canvas = document.getElementById('doraemonCanvas');
            const ctx = canvas.getContext('2d');

            // 辅助函数：将 tkinter 的 create_oval(矩形坐标) 转换为 canvas 椭圆
            function drawOvalFromRect(x1, y1, x2, y2, fill, outline = 'black', lineWidth = 1) {
                const cx = (x1 + x2) / 2;
                const cy = (y1 + y2) / 2;
                const rx = (x2 - x1) / 2;
                const ry = (y2 - y1) / 2;
                ctx.beginPath();
                ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
                ctx.fillStyle = fill;
                ctx.fill();
                if (outline) {
                    ctx.strokeStyle = outline;
                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
                }
            }

            // 辅助函数：绘制 tkinter 的 chord 弧（填充扇形）
            function drawChordFromRect(x1, y1, x2, y2, startAngleDeg, extentDeg, fill, outline = 'black') {
                const cx = (x1 + x2) / 2;
                const cy = (y1 + y2) / 2;
                const rx = (x2 - x1) / 2;
                const ry = (y2 - y1) / 2;
                const startRad = startAngleDeg * Math.PI / 180;
                const endRad = (startAngleDeg + extentDeg) * Math.PI / 180;

                ctx.beginPath();
                ctx.moveTo(cx, cy);
                // 计算弧起点 (相对于椭圆)
                const startX = cx + rx * Math.cos(startRad);
                const startY = cy + ry * Math.sin(startRad);
                ctx.lineTo(startX, startY);
                // 绘制椭圆弧 (使用 ellipse 的一段)
                // 由于 canvas 没有直接绘制椭圆弧的简单方法，这里用缩放变换模拟
                // 更简单的做法：保存上下文，缩放，画圆，再恢复
                ctx.save();
                ctx.translate(cx, cy);
                ctx.scale(1, ry / rx);  // 将椭圆变为圆 (rx 方向不变，y 方向缩放)
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(startRad) * rx, Math.sin(startRad) * rx * (rx / ry)); // 需要调整
                // 这种方法太复杂，改用参数方程直接画线
                ctx.restore();

                // 改用更直接的方法：用很多小线段逼近椭圆弧
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                const steps = 50;
                for (let i = 0; i <= steps; i++) {
                    const t = i / steps;
                    const angle = startRad + t * (endRad - startRad);
                    const x = cx + rx * Math.cos(angle);
                    const y = cy + ry * Math.sin(angle);
                    if (i === 0) {
                        ctx.lineTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.closePath();
                ctx.fillStyle = fill;
                ctx.fill();
                if (outline) {
                    ctx.strokeStyle = outline;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            // 清除画布
            ctx.clearRect(0, 0, 400, 400);

            // 大蓝脸 (圆脸)
            drawOvalFromRect(125, 70, 275, 220, 'blue', 'blue', 1);

            // 白色脸
            drawOvalFromRect(140, 100, 260, 220, 'white', 'black', 1);

            // 眼睛白色部分 (左眼和右眼)
            drawOvalFromRect(200, 80, 230, 120, 'white', 'black', 1);   // 右眼 (从角色视角)
            drawOvalFromRect(170, 80, 200, 120, 'white', 'black', 1);   // 左眼

            // 黑色眼珠
            drawOvalFromRect(203, 92, 215, 108, 'black', 'black', 1);   // 右眼珠
            drawOvalFromRect(185, 92, 197, 108, 'black', 'black', 1);   // 左眼珠

            // 眼睛高光
            drawOvalFromRect(206, 95, 212, 105, 'white', null);          // 右高光 (无边框)
            drawOvalFromRect(188, 95, 194, 105, 'white', null);          // 左高光

            // 红色鼻子
            drawOvalFromRect(193, 115, 207, 130, 'red', 'black', 1);

            // 嘴巴弧线 (arc)
            ctx.beginPath();
            ctx.arc(200, 120, 60, 60 * Math.PI / 180, 120 * Math.PI / 180);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.stroke();

            // 鼻子下的竖线
            ctx.beginPath();
            ctx.moveTo(200, 130);
            ctx.lineTo(200, 180);
            ctx.strokeStyle = 'black';
            ctx.stroke();

            // 胡须
            ctx.beginPath();
            // 上横须
            ctx.moveTo(215, 150); ctx.lineTo(245, 150);
            ctx.moveTo(155, 150); ctx.lineTo(185, 150);
            // 斜须
            ctx.moveTo(158, 127); ctx.lineTo(185, 137);
            ctx.moveTo(215, 137); ctx.lineTo(242, 127);
            ctx.moveTo(158, 170); ctx.lineTo(185, 163);
            ctx.moveTo(215, 163); ctx.lineTo(242, 168);
            ctx.strokeStyle = 'black';
            ctx.stroke();

            // 身体矩形 (蓝色)
            ctx.fillStyle = 'blue';
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 1;
            ctx.fillRect(150, 200, 100, 85);   // 150->250, 200->285
            ctx.strokeRect(150, 200, 100, 85);

            // 白色肚皮 (chord 弧)  (160,190,240,270) start=135 extent=270
            // 使用自定义函数绘制扇形填充
            // 为了简化，我们使用路径手动绘制扇形
            const cx1 = (160 + 240) / 2; // 200
            const cy1 = (190 + 270) / 2; // 230
            const rx1 = (240 - 160) / 2; // 40
            const ry1 = (270 - 190) / 2; // 40
            const start1 = -45 * Math.PI / 180;
            const end1 = (-45 + 270) * Math.PI / 180; // 405° 相当于 45°
            ctx.beginPath();
            ctx.moveTo(cx1, cy1);
            const steps = 50;
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const angle = start1 + t * (end1 - start1);
                const x = cx1 + rx1 * Math.cos(angle);
                const y = cy1 + ry1 * Math.sin(angle);
                ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();

            // 计算弧的起点 (start1 = -45° 对应 315°) 和终点 (end1 = 225°)
            const startX = cx1 + rx1 * Math.cos(start1);
            const startY = cy1 + ry1 * Math.sin(start1);
            const endX = cx1 + rx1 * Math.cos(end1);
            const endY = cy1 + ry1 * Math.sin(end1);

            // 计算椭圆上顶点 (角度 90°)
            const topX = cx1;  // 90° 的余弦为0，所以 x = cx1
            const topY = cy1;  // 90° 的正弦为1，所以 y = cy1 + ry1

            // 绘制填充三角形
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.lineTo(topX, topY);
            ctx.closePath();
            ctx.fillStyle = 'white';   // 与扇形颜色一致
            ctx.fill();
            ctx.strokeStyle = 'white'; // 可选：添加黑色边框以保持风格
            ctx.stroke();

            // 白色小弧线 (185,270,215,300) start=0 extent=180
            const cx2 = (185 + 215) / 2; // 200
            const cy2 = (270 + 300) / 2; // 285
            const rx2 = (215 - 185) / 2; // 15
            const ry2 = (300 - 270) / 2; // 15
            const start2 = 180 * Math.PI / 180;
            const end2 = 360 * Math.PI / 180;
            ctx.beginPath();
            ctx.moveTo(cx2, cy2);
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const angle = start2 + t * (end2 - start2);
                const x = cx2 + rx2 * Math.cos(angle);
                const y = cy2 + ry2 * Math.sin(angle);
                ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();


            // 两只脚 (白色椭圆)
            drawOvalFromRect(140, 275, 190, 295, 'white', 'black', 1);
            drawOvalFromRect(210, 275, 260, 295, 'white', 'black', 1);

            // 手臂多边形 (左手)
            ctx.beginPath();
            ctx.moveTo(150, 205);
            ctx.lineTo(150, 235);
            ctx.lineTo(120, 250);
            ctx.lineTo(120, 235);
            ctx.closePath();
            ctx.fillStyle = 'blue';
            ctx.fill();
            ctx.strokeStyle = 'blue';
            ctx.stroke();

            // 右手
            ctx.beginPath();
            ctx.moveTo(250, 205);
            ctx.lineTo(250, 235);
            ctx.lineTo(280, 250);
            ctx.lineTo(280, 235);
            ctx.closePath();
            ctx.fillStyle = 'blue';
            ctx.fill();
            ctx.strokeStyle = 'blue';
            ctx.stroke();

            // 手掌圆形
            drawOvalFromRect(110, 230, 135, 255, 'white', 'black', 1);
            drawOvalFromRect(265, 230, 290, 255, 'white', 'black', 1);

            // 红色项圈 (粗线)
            ctx.beginPath();
            ctx.moveTo(150, 200);
            ctx.lineTo(250, 200);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 10;
            ctx.lineCap = 'round';
            ctx.stroke();

            // 铃铛
            // 黄色主体
            drawOvalFromRect(190, 200, 210, 220, 'yellow', 'black', 1);
            // 黑色粗线
            ctx.beginPath();
            ctx.moveTo(191, 210);
            ctx.lineTo(209, 210);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.stroke();
            // 黄色细线
            ctx.beginPath();
            ctx.moveTo(192, 210);
            ctx.lineTo(208, 210);
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.stroke();
            // 小红点
            drawOvalFromRect(198, 213, 202, 217, 'red', null);
            // 小红点下的竖线
            ctx.beginPath();
            ctx.moveTo(200, 218);
            ctx.lineTo(200, 220);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.stroke();

            // 口袋弧线 (170,200,230,260) start=180 extent=180
            const cx3 = (170 + 230) / 2; // 200
            const cy3 = (200 + 260) / 2; // 230
            const rx3 = (230 - 170) / 2; // 30
            const ry3 = (260 - 200) / 2; // 30
            const start3 = 0 * Math.PI / 180;
            const end3 = 180 * Math.PI / 180; // 180+180=360
            ctx.beginPath();
            ctx.moveTo(cx3, cy3);
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const angle = start3 + t * (end3 - start3);
                const x = cx3 + rx3 * Math.cos(angle);
                const y = cy3 + ry3 * Math.sin(angle);
                ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();

            // 恢复线宽为默认，以免影响后续 (虽然没有了)
            ctx.lineWidth = 1;
        })();
    </script>
</body>
</html>
```