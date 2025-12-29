# 瑞芯微MPP项目被GitHub封禁

## 等待两年之后，FFmpeg 开发者向瑞芯发出 DMCA 下架通知

> 转载自：https://www.oschina.net/news/392816

FFmpeg项目官方账号在社交平台[发布动态称](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fx.com%2FFFmpeg%2Fstatus%2F2004599109559496984)，在FFmpeg开发者提交DMCA删除请求后，GitHub已禁用瑞芯微电子（Rockchip）的开源代码库。

据了解，此前近两年间，FFmpeg曾多次公开指控这家中国芯片制造商存在许可违规行为。该通知于12月18日提交，指控瑞芯微从FFmpeg的libavcodec库中抄袭数千行代码——包括H.265、AV1和VP9格式的解码器，删除原始版权声明，虚假宣称著作权，并以Apache宽松许可证而非原始LGPL许可证重新分发代码。

![](https://oscimg.oschina.net/oscnet/up-a3c25bed8590f6f84e11275387f6251c0d5.png)

FFmpeg早在2024年2月就指控瑞芯微“公然将FFmpeg代码直接复制粘贴”至其驱动程序中，但该芯片制造商的最后回应表明其无意解决此事。此次DMCA通知要求对方删除侵权文件，或恢复正确署名并采用符合LGPL的许可协议。

## 背景

> 转载自：https://www.zhihu.com/question/1988268002181919106

瑞芯微电子 (RockChip) 致力于芯片设计，不过因为违反许可证复制代码遭到知名开源项目 FFmpeg 的投诉，在按照美国数字千年版权法要求发送 DMCA 通知函后，目前 GitHub 已经封禁瑞芯微的 MPP 项目存储库 ... 这件事最初是在 2024 年 2 月发生的，当时 FFmpeg 项目组发现瑞芯微复制代码粘贴到驱动程序中，作为开源项目代码确实是可以使用的，问题是瑞芯微更改许可证并删除了原作者信息 ... 这些编码器采用 LGPL 许可证进行分发，侵权者删除了原有的版权声明和作者信息以声称自己是相关代码的作者、以限制较少的 Apache 许可证分发代码，FFmpeg 项目组认为侵权者的行为都违反了 LGPL 条款。

## 解读

> 转载自：https://www.zhihu.com/question/1988268002181919106/answer/1988595911207695387

1. FFmpeg代码可以复制吗？
可以，但要保留FFmpeg的版权声明，被复制的代码仍然是LGPL协议。项目变成了混合协议，分发时需要符合LGPL协议的要求。

2. FFmpeg用的什么开源协议？

FFmpeg是LGPL和GPL混合协议：

FFmpeg主体是LGPL协议
当它使用了GPL协议的第三方库的时候，得按照GPL协议分发
编译时没有configure --enable-gpl，复制代码时没拷贝这块代码，则只受LGPL协议约束。

3. GPL协议和LGPL协议有什么区别？

LGPL协议要求，当它被编译成一个动态库时，只需要开源对应动态库的源码，不需要开源整个进程代码。GPL协议则要求开源整个进程代码。

4. MPP项目是什么？

MPP是瑞芯微的硬件编解码库
MPP项目是开源项目（至少挂在github上的版本是开源项目）
MPP是Apache-2.0 MIT协议
5. MPP项目对FFmpeg做了什么？

复制了FFmpeg的LGPL协议的代码 ✅
删除了FFmpeg的版权声明，替换成了Copyright Rockchip Electronics ❌
删除了FFmpeg的LGPL协议声明，换成了Apache-2.0 ❌