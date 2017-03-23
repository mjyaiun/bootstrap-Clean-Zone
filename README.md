# clean-zone-Modal
bootstrap前端管理框架
需要引用style.css、bootstrap.css、bootstrap.js文件


# 一、模态框
前端框架：clean zone，基于bootstrap的样式框架，用于管理平台；

在clean zone里，模态框进行了二次分装，与原生的bootstrap的modal使用方式略有不同。clean zone的模态框使用的是jquery.niftymodals；

为了在弹出模态框、关闭模态框后能执行自定义方法，对其js稍微进行了修改，在HTML中新增属性（data-openevent、data-closeevent）。
