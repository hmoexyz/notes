# 2025 年 11 月 18 日 Cloudflare 服务中断

> 转载自：https://blog.cloudflare.com/zh-cn/18-november-2025-outage/

![](https://cf-assets.www.cloudflare.com/zkvhlag99gkb/9f2k63fiixI2YXDgsnbGq/3c377a6fbd84b5347f814deb6435c476/Cloudflare-Outage-hero-18-nov-2025.png)

2025 年 11 月 18 日 11:20 UTC（本博客中的所有时间均为世界标准时间），Cloudflare 网络开始出现严重故障，无法正常传输核心网络流量。尝试访问我们客户网站的互联网用户会看到一个错误页面，提示 Cloudflare 网络出现故障。 

![HTTP error page displayed during the incident](https://cf-assets.www.cloudflare.com/zkvhlag99gkb/3ony9XsTIteX8DNEFJDddJ/7da2edd5abca755e9088002a0f5d1758/BLOG-3079_2.png) 

**并不是任何类型的网络攻击或恶意活动直接或间接引发了此问题**。相反，它是因为我们数据库系统权限变更而触发，权限变更导致数据库将多个条目输出到 Cloudflare 机器人管理系统使用的“特征文件”。结果，该特征文件的大小增加了一倍。随后，这个超出预期大小的特征文件传播到构成 Cloudflare 网络的所有计算机。

这些计算机上运行的负责路由 Cloudflare 网络流量的软件，会读取该特征文件，使 Cloudflare 机器人管理系统能够及时更新，以应对不断变化的威胁。但软件设置了特征文件大小限制，即：不超过其两倍大小。因此，导致软件无法运行。

起初，我们误以为这些观察到的迹象是由超大规模 DDoS 攻击引起。随后，我们正确识别了核心问题，并成功阻止了异常增大的特征文件传播，将其替换为早期版本。到 14:30 时，核心流量基本恢复正常。在接下来的几小时内，随着流量逐步恢复在线，我们努力减轻网络各部分增加的负载。截至 17:06，Cloudflare 所有系统均已恢复正常运行。

对于此次事件给 Cloudflare 客户以及整个互联网带来的影响，我们深表歉意。鉴于 Cloudflare 在互联网生态系统中的重要作用，任何系统中断都是不可接受的。网络故障期间导致无法正常传输流量，这令我们团队所有成员都深感痛心。我们深知，今天的服务中断让大家失望了。

本文将详细回顾事件的来龙去脉，以及哪些系统和流程出现了故障。这也是我们制定一系列措施的开端，但绝非终点，以确保此类故障不再发生。

## 服务中断

[ ](#fu-wu-zhong-duan) 

下图显示了 Cloudflare 网络处理的 5xx 错误 HTTP 状态代码的数量。通常情况下，这个数值应该非常低，而且在故障发生前也确实如此。 

![Volume of HTTP 5xx requests served by the Cloudflare network](https://cf-assets.www.cloudflare.com/zkvhlag99gkb/7GdZcWhEqNjwOmLcsKOXT0/fca7e6970d422d04c81b2baafb988cbe/BLOG-3079_3.png) 

11:20 之前的数量是 Cloudflare 网络中观察到的 5xx 错误的预期基准。峰值以及随后的波动表明，Cloudflare 系统因加载了错误的特征文件而发生故障。值得注意的是，Cloudflare 系统随后恢复了一段时间。对于内部错误而言，这是非比寻常的行为。

合乎逻辑的解释是，该文件由 ClickHouse 数据库集群上运行的查询每五分钟生成一次，该集群正在逐步更新，以改进权限管理。只有当查询在集群中已更新的部分运行时，才会生成错误数据。因此，有可能每五分钟生成一组正确的配置文件或一组错误的配置文件，并在 Cloudflare 网络中快速传播。

这种波动导致我们无法确切知晓发生了什么情况，因为整个系统短暂恢复，然后再次出现故障，Cloudflare 网络中有时分发正确的配置文件，有时分发错误的配置文件。起初，这让我们怀疑故障可能是由攻击引起。最终，每个 ClickHouse 节点都生成了错误的配置文件，并且波动稳定在故障状态。

错误持续出现，直到 14:30 才找到并解决了根本问题。我们采用的解决办法是停止生成和传播错误的特征文件，并手动将已知的正确文件插入特征文件分发队列。然后，强制重启 Cloudflare 核心代理。

如上图剩余的长尾部分所示，我们团队重新启动了其余进入故障状态的服务，5xx 错误代码数量已在 17:06 恢复正常。

以下服务受到了影响：

| **服务/产品**    | **影响描述**                                                                                                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 核心 CDN 与安全服务 | HTTP 5xx 状态代码。本文顶部的屏幕截图显示了最终用户看到的典型错误页面。                                                                                                                                                       |
| Turnstile    | Turnstile 无法加载。                                                                                                                                                                                |
| Workers KV   | 由于核心代理出现故障，导致对 KV“前端”网关发出的请求失败，进而导致 Workers KV 返回的 HTTP 5xx 错误数量显著增加。                                                                                                                          |
| 仪表板          | 虽然仪表板基本维持正常运行，但由于登录页面中的 Turnstile 不可用，导致大多数用户无法登录。                                                                                                                                             |
| 电子邮件安全       | 虽然电子邮件处理和递送未受影响，但我们观察到对某个 IP 信誉源的访问暂时中断，这降低了垃圾邮件检测的准确性，阻止了某些新域期限检测的触发，不过未对客户造成严重影响。此外，我们还发现了某些自动移动操作出现故障；所有受影响的邮件均已审核并修复。                                                                      |
| Access       | 从事件发生之初一直持续到 13:05 启动回滚为止，大多数用户普遍遭遇了身份验证失败。所有现有 Access 会话均未受到影响。 所有身份验证失败的尝试均导致显示错误页面，也就是说，在身份验证失败的情况下，没有任何用户能够访问目标应用。在此期间，所有成功的登录均已正确记录。 当时尝试的任何 Access 配置更新，要么直接失败，要么传播速度非常缓慢。现在，所有配置更新均已恢复。 |

在受影响期间，除了返回 HTTP 5xx 错误之外，我们还观察到 CDN 的响应延迟显著增加。这是由于 Cloudflare 调试和可观测系统消耗了大量 CPU 资源，这些系统会自动为未处理的错误添加额外的调试信息。

## Cloudflare 如何处理请求，以及今天出现的问题

[ ](#cloudflare-ru-he-chu-li-qing-qiu-yi-ji-jin-tian-chu-xian-de-wen-ti) 

每个发送到 Cloudflare 的请求都会沿着我们网络中一条明确定义的路径进行传输，可能是来自加载网页的浏览器、调用 API 的移动应用，或来自其他服务的自动化流量。这些请求首先在 HTTP 和 TLS 层终止，然后流入 Cloudflare 核心代理系统（我们称之为“前线 (FL)”），最后经过 Pingora，它会根据需要执行缓存查询或从源服务器获取数据。

我们之前详细介绍了核心代理的工作原理，请访问[此处](https://blog.cloudflare.com/20-percent-internet-upgrade/.)查看。

![Diagram of our reverse proxy architecture](https://cf-assets.www.cloudflare.com/zkvhlag99gkb/6qlWXM3gh4SaYYvsGc7mFV/99294b22963bb414435044323aed7706/BLOG-3079_4.png) 

当请求经过核心代理时，我们会运行网络中可用的各种安全和性能产品。代理会应用每个客户的独特配置和设置，包括强制执行 WAF 规则、DDoS 防护，以及将流量路由至开发人员平台和 R2。它通过一组特定的域模块来实现这一目标，这些模块将配置和策略规则应用于经过 Cloudflare 代理服务器的流量。

其中一个模块，也就是“机器人管理”，是导致今天服务中断的根本原因。

Cloudflare 的[机器人管理](https://www.cloudflare.com/application-services/products/bot-management/)模块包含多个系统，其中之一是机器学习模型，我们使用该模型为流经 Cloudflare 网络的每个请求生成机器人评分。我们的客户使用机器人评分来控制允许或禁止哪些机器人访问其网站。

该模型将一个“特征”配置文件作为输入。在这里的语境中，特征是指机器学习模型用于预测请求是否为自动化请求的单个特征。功能配置文件是这些单个特征的集合。

此特征文件每隔几分钟会更新一次，并发布到整个 Cloudflare 网络，使我们能够应对互联网流量的变化。这让我们可以针对新型机器人和新型机器人攻击做出反应。总之，鉴于恶意行为者快速变更其策略，频繁且迅速地部署特征文件至关重要。

由于底层 ClickHouse 查询行为变更（详见下文），导致生成特征文件时出现了大量重复的“特征”行。这改变了原本固定大小的特征配置文件的大小，从而导致机器人模块触发错误。

因此，对于所有依赖于机器人模块的流量，负责处理客户流量的核心代理系统都返回了 HTTP 5xx 错误代码。这也影响了同样依赖于核心代理的 Workers KV 和 Access 服务。

与此次事件无关的一点是，我们曾经且目前正在将客户流量迁移到新版本的代理服务，内部称为 [FL2](https://blog.cloudflare.com/20-percent-internet-upgrade/)。虽然两个版本都受到了影响，但根据观察，二者的影响程度有所不同。

部署在新 FL2 代理引擎上的客户，观察到了 HTTP 5xx 错误；使用旧代理引擎（称为 FL）的客户未观察到任何错误，但生成的机器人评分不正确，导致所有流量的机器人评分均为零。已部署规则用于阻止机器人的客户，发现了大量误报。相比之下，未在其规则中使用 Cloudflare 机器人评分的客户，则未受到任何影响。

另一个让我们失去警惕且误以为这次遭受了攻击的明显迹象是：Cloudflare 的状态页面宕机了。状态页面完全托管在 Cloudflare 的基础设施之外，不依赖于 Cloudflare 网络。虽然最终证实这只是一个巧合，但它让参与问题诊断的团队成员认为，攻击者可能同时针对 Cloudflare 系统和状态页面发起攻击。当时访问状态页面的用户会看到一则错误消息：

![Error on the Cloudflare status page](https://cf-assets.www.cloudflare.com/zkvhlag99gkb/7LwbB5fv7vdoNRWWDGN7ia/dad8cef76eee1305e0216d74a813612b/BLOG-3079_5.png) 

在内部事件聊天室中，我们担心这可能是近期一波高流量 [Aisuru ](https://techcommunity.microsoft.com/blog/azureinfrastructureblog/defending-the-cloud-azure-neutralized-a-record-breaking-15-tbps-ddos-attack/4470422)[DDoS 攻击](https://blog.cloudflare.com/defending-the-internet-how-cloudflare-blocked-a-monumental-7-3-tbps-ddos/)的延续：

![Internal chat screenshot](https://cf-assets.www.cloudflare.com/zkvhlag99gkb/3Ph13HSsOGC0KYRfoeZmSy/46522e46ed0132d2ea551aef4c71a5d6/BLOG-3079_6.png) 

### 查询行为变更

[ ](#cha-xun-xing-wei-bian-geng) 

我在上文提到过，底层查询行为变更导致该特征文件中出现大量重复行。关联的数据库系统使用 ClickHouse 软件。

为了便于理解，了解 ClickHouse 分布式查询的工作原理大有裨益。一个 ClickHouse 集群由多个分片组成。为了查询所有分片中的数据，我们在名为 `default` 的数据库中使用了所谓的分布式表（由表引擎 `Distributed` 提供支持）。Distributed 引擎会查询数据库 `r0` 中的基础表。基础表用于存储 ClickHouse 集群中每个分片上的数据。

分布式表的查询通过共享系统账户运行。为了提高分布式查询的安全性和可靠性，我们努力让查询以初始用户账户身份运行。

在今天之前，当 ClickHouse 用户从 ClickHouse 系统表中查询表元数据（例如 `system.tables` 或 `system.columns` 时，只能看到 `default` 数据库中的表。

由于用户已经拥有对 `r0` 中基础表的隐式访问权限，我们在 11:05 进行了一项更改，使这种访问权限显化，以便用户也可以查看这些表的元数据。通过确保所有分布式子查询都能够以初始用户身份运行，我们可以更精细化地评估查询限制和访问权限授权，从而避免因某个用户的错误子查询而影响其他用户。

上述更改使所有用户都能够访问其有权访问的表中的准确元数据。遗憾的是，过去我们做出了一些假设，认为此类查询返回的列的列表仅包含 `default` 数据库：

```txt
SELECT
  name,
  type
FROM system.columns
WHERE
  table = 'http_requests_features'
order by name;
```

请注意，该查询并未按数据库名称进行筛选。随着我们逐步向特定 ClickHouse 集群的用户授予显式权限，在 11:05 进行更改之后，上述查询开始返回“重复”列，因为这些列对应存储在 r0 数据库中的基础表。

可惜，这种类型的查询恰好由机器人管理功能文件生成逻辑执行，目的是构建本节开头提到的文件的每个输入“特征”。

上述查询会返回一个包含列的表，类似于下表（简化版示例）：

![Example of code block](https://cf-assets.www.cloudflare.com/zkvhlag99gkb/ZIC5X8vMM7ifbJc0vxgLD/49dd33e7267bdb03b265ee0acccf381d/Screenshot_2025-11-18_at_2.51.24%C3%A2__PM.png) 

然后，由于用户获得了额外的权限，响应现在包含 `r0` 架构的所有元数据，导致响应中的行数增加了一倍以上，最后影响最终文件输出中的行数（即：特征数量）。

### 内存预分配

[ ](#nei-cun-yu-fen-pei) 

我们代理服务上运行的每个模块都设置了一些限制，以避免无限制的内存消耗，并通过预分配内存来优化性能。在本实例中，机器人管理系统限制了运行时可用的机器学习特征数量。当前，该限制设置为 200，远高于我们目前使用的大约 60 个特征。同样，设置此限制是出于性能考虑，我们为这些特征预分配了内存。

当包含 200 多个特征的错误文件传输到 Cloudflare 服务器时，达到了此项限制，导致系统崩溃。以下显示了执行检查并导致未处理错误的 FL2 Rust 代码：

![code that generated the error](https://cf-assets.www.cloudflare.com/zkvhlag99gkb/640fjk9dawDk7f0wJ8Jm5S/668bcf1f574ae9e896671d9eee50da1b/BLOG-3079_7.png) 

这导致了以下线程崩溃，进而引发了 5xx 错误：

`thread fl2_worker_thread panicked: called Result::unwrap() on an Err value`

### 事件期间的其他影响

[ ](#shi-jian-qi-jian-de-qi-ta-ying-xiang) 

其他依赖我们核心代理的系统也受到了此次事件的影响，包括 Workers KV 和 Cloudflare Access。团队于 13:04 发布了针对 Workers KV 的补丁，以绕过核心代理，成功降低了这些系统所受的影响。随后，所有依赖于 Workers KV 的下游系统（例如 Access 本身）的错误率均有所降低。

由于内部使用了 Workers KV 且 Cloudflare Turnstile 部署作为登录流程的一部分，Cloudflare 控制面板也受到了影响。

Turnstile 受到了本次服务中断的影响，导致没有建立活跃仪表板会话的客户无法登录。这表现为两个时段的服务可用性降低：一是 11:30 至 13:10，二是 14:40 至 15:30，如下图所示。

![availability of Cloudflare internal APIs during the incident](https://cf-assets.www.cloudflare.com/zkvhlag99gkb/nB2ZlYyXiGTNngsVotyjN/479a0f9273c160c63925be87592be023/BLOG-3079_8.png) 

第一个时段（11:30 至 13:10）是由于 Workers KV 受到影响，而某些控制平面和仪表板功能依赖于 Workers KV。此问题已于 13:10 修复，解决办法是 Workers KV 绕过了核心代理系统。 恢复功能配置数据后，对仪表板产生了第二次影响。大量登录尝试开始涌入仪表板，导致其不堪重负。这种任务积压，再加上重试尝试，导致延迟增加，降低了仪表板的可用性。在 15:30 左右，通过扩展控制平面并发，恢复了服务可用性。

## 补救及后续步骤

[ ](#bu-jiu-ji-hou-xu-bu-zou) 

Cloudflare 系统现已恢复在线并正常运行，我们已开始着手研究如何增强系统防御，以防止未来再次发生此类故障。具体而言，我们将：

* 强化对 Cloudflare 生成的配置文件的摄取，使其与用户生成的输入文件一样安全
* 为各个特征启用更多全局终止开关
* 防止核心转储或其他错误报告占用过多系统资源
* 审核所有核心代理模块中的故障模式，找出错误原因

今天发生的事件是 Cloudflare [自 2019 年](https://blog.cloudflare.com/details-of-the-cloudflare-outage-on-july-2-2019/)以来最严重的一次服务中断。我们之前也遇到过导致[仪表板不可用](https://blog.cloudflare.com/post-mortem-on-cloudflare-control-plane-and-analytics-outage/)的故障，以及导致在特定时段无法使用[新增功能](https://blog.cloudflare.com/cloudflare-service-outage-june-12-2025/)的情况。但在过去 6 年多时间里，我们从未发生过像今天这样导致大部分核心流量中断的故障。

像今天这样的服务中断是不可接受的。Cloudflare 设计的系统架构具有极高的故障恢复能力，以确保流量始终畅通无阻。过去发生的故障总会促使我们构建全新的、更有韧性性的系统。

我谨代表 Cloudflare 全体员工，对因今日故障导致的互联网服务中断而受影响的各方致以诚挚歉意。 

| 时间 (UTC)    | 状态                                               | 描述                                                                                                                                                          |
| ----------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 11:05       | 正常。                                              | 数据库访问控制变更已部署。                                                                                                                                               |
| 11:28       | 影响开始显现。                                          | 部署到达客户环境，首次在客户 HTTP 流量中发现错误。                                                                                                                                |
| 11:32-13:05 | Cloudflare 团队调查了 Workers KV 服务的流量激增和错误情况。        | 最初的迹象表现为 Workers KV 响应速度下降，进而导致下游的其他 Cloudflare 服务受到影响。 我们尝试了流量控制和账户限制等缓解措施，以便让 Workers KV 服务恢复到正常运行水平。 首次自动化测试于 11:31 检测到问题，人工调查于 11:32 启动。事件呼叫于 11:35 创建。 |
| 13:05       | 实施了 Workers KV 和 Cloudflare Access 绕过措施 - 已减轻影响。 | 在调查过程中，我们针对 Workers KV 和 Cloudflare Access 使用了内部系统绕过措施，使二者回退到我们核心代理的先前版本。虽然我们代理的先前版本中也存在这个问题，但如下文所述，其影响较小。                                                  |
| 13:37       | 工作重点是将机器人管理配置文件回滚至最近的已知合适版本。                     | 我们确信，机器人管理配置文件是此次事件的触发因素。团队通过多个工作流程研究了补救服务的方法，其中最快的方法是恢复该文件之前的版本。                                                                                           |
| 14:24       | 已停止创建和传播新的机器人管理配置文件。                             | 我们已确定机器人管理模块是 500 错误的根源，而问题是由一个错误的配置文件引起。我们停止了自动部署新的机器人管理配置文件。                                                                                              |
| 14:24       | 新文件测试完成。                                         | 我们观察到使用旧版本的配置文件成功恢复，随后集中精力加快全球范围的修复进程。                                                                                                                      |
| 14:30       | 主要问题已解决。下游受影响服务的错误开始减少。                          | 在全球范围内部署正确的机器人管理配置文件，并且大多数服务已开始正常运行。                                                                                                                        |
| 17:06       | 所有服务均已恢复。影响结束。                                   | 所有下游服务均已重新启动，所有操作完全恢复。                                                                                                                                      |
