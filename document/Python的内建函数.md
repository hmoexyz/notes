# Python的内建函数

> 转载自：https://xplanc.org/primers/document/zh/02.Python/99.API%20%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C/00.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0.md

| 函数名            | 详情                                                                                                    | 简介                         |
| -------------- | ----------------------------------------------------------------------------------------------------- | -------------------------- |
| \_\_import\_\_ | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.%5F%5Fimport%5F%5F.md) | 导入模块                       |
| abs            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.abs.md)                | 计算绝对值                      |
| aiter          | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.aiter.md)              | 获取异步可迭代对象的迭代器              |
| all            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.all.md)                | 判断可迭代对象内容是否全部为真值           |
| anext          | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.anext.md)              | 获取异步迭代器的下一数据项              |
| any            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.any.md)                | 判断可迭代对象内容是否存在真值            |
| ascii          | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.ascii.md)              | 转换为字符串，非 ASCII 字符将被转义      |
| bin            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.bin.md)                | 将一个整数转换为带前缀 0b 的二进制数字符串    |
| bool           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.bool.md)               | 类型转换为 bool                 |
| breakpoint     | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.breakpoint.md)         | 调用位置进入调试器                  |
| bytearray      | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.bytearray.md)          | 类型转换为 bytearray            |
| bytes          | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.bytes.md)              | 类型转换为 bytes                |
| callable       | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.callable.md)           | 判断对象是否可调用                  |
| chr            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.chr.md)                | 单个 Unicode 字符的整数编码转字符串     |
| classmethod    | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.classmethod.md)        | 把一个方法封装成类方法                |
| compile        | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.compile.md)            | 将 source 编译成代码或 AST 对象     |
| complex        | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.complex.md)            | 类型转换为 complex              |
| delattr        | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.delattr.md)            | 删除指定的属性                    |
| dict           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.dict.md)               | 类型转换为 dict                 |
| dir            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.dir.md)                | 返回当前本地作用域中的名称列表或对象的属性列表    |
| divmod         | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.divmod.md)             | 返回整数除法时的商和余数               |
| enumerate      | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.enumerate.md)          | 返回一个枚举对象                   |
| eval           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.eval.md)               | 执行表达式并返回结果                 |
| exec           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.exec.md)               | 执行代码                       |
| filter         | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.filter.md)             | 过滤数据                       |
| float          | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.float.md)              | 类型转换为 float                |
| format         | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.format.md)             | 格式化                        |
| frozenset      | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.frozenset.md)          | 类型转换为 frozenset            |
| getattr        | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.getattr.md)            | 获取属性的值                     |
| globals        | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.globals.md)            | 返回实现当前模块命名空间的字典            |
| hasattr        | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.hasattr.md)            | 判断属性是否存在                   |
| hash           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.hash.md)               | 获取哈希值                      |
| help           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.help.md)               | 启动内置的帮助系统                  |
| hex            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.hex.md)                | 将整数转换为带前缀 0x 前缀的小写十六进制数字符串 |
| id             | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.id.md)                 | 返回对象的 ID                   |
| input          | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.input.md)              | 获取输入                       |
| int            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.int.md)                | 类型转换为 int                  |
| isinstance     | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.isinstance.md)         | 判断是否是某个类型的实例               |
| issubclass     | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.issubclass.md)         | 判断是否是某个类的子类                |
| iter           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.iter.md)               | 获取迭代器                      |
| len            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.len.md)                | 获取长度                       |
| list           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.list.md)               | 类型转换为 list                 |
| locals         | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.locals.md)             | 返回一个代表当前局部符号表的映射对象         |
| map            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.map.md)                | 将可迭代对象进行映射                 |
| max            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.max.md)                | 获取最大值                      |
| memoryview     | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.memoryview.md)         | 返回由给定实参创建的“内存视图”对象         |
| min            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.min.md)                | 获取最小值                      |
| next           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.next.md)               | 获取迭代器的下一个元素                |
| object         | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.object.md)             | 所有类的终极基类，调用时构建一个基本对象       |
| oct            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.oct.md)                | 将整数转换为带前缀 0o 的八进制数字符串      |
| open           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.open.md)               | 打开文件                       |
| ord            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.ord.md)                | 单个 Unicode 字符的字符串转整数编码     |
| pow            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.pow.md)                | 计算乘方                       |
| print          | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.print.md)              | 打印                         |
| property       | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.property.md)           | 创建属性                       |
| range          | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.range.md)              | 生成范围序列                     |
| repr           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.repr.md)               | 转换为字符串                     |
| reversed       | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.reversed.md)           | 迭代器逆转                      |
| round          | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.round.md)              | 四舍五入                       |
| set            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.set.md)                | 类型转换为 set                  |
| setattr        | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.setattr.md)            | 设置属性的值                     |
| slice          | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.slice.md)              | 生成切片                       |
| sorted         | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.sorted.md)             | 排序                         |
| staticmethod   | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.staticmethod.md)       | 将方法转换为静态方法                 |
| str            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.str.md)                | 类型转换为 str                  |
| sum            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.sum.md)                | 求和                         |
| super          | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.super.md)              | 获取父类                       |
| tuple          | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.tuple.md)              | 类型转换为 tuple                |
| type           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.type.md)               | 获取类型                       |
| vars           | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.vars.md)               | 获取对象的属性列表                  |
| zip            | [查看](/primers/document/zh/02.Python/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0/EX.zip.md)                | 多个迭代器组合成元组迭代器              |