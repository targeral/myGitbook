# myGitbook
自己DIY的gitbook

## 下载
* git clone
* 通过npm(还没实现)

## 安装及使用
1. 通过git clone或者npm install下载后，引用bin文件下的gitbook.min.css, util.js, markdown.js, gitbook.min.js
2. 如下配置目录,参数:
  * BookName:书的名字
  * HomePage:主页
  * BookTitle:书的别名(可与书名一致)
  * BookFile：文章的文件位置
  * Content:目录内容

```javascript
Book.Config({
    BookName  : "How to use myGitbook",
    HomePage  : "index.md",
    BookTitle : "如何使用myGitbook",
    BookFile  : "/article/",
    Content   : {
        1 : {
            title : "下载",
            src : "download.md",
            childlist : [
                {title : "xxxx", src : "xxxx.md"}
            ]
        },
        2 : {
            title : "安装",
            src : "install.md"
        }
    }
});
```
3. 目录内容格式
```
key(任意内容，建议为数字，表示章节) : {
    title : "xxx",
    src : "xxxx",//(相对于article)
    childlist : [//二级子目录，若没有，可不写
        {title : "xxxx", src : "xxx.md"},
        {title : "xxxx", src : "xxx.md"}
    ]
}
```

4.关于图片
正常的相对于*.md的目录设置就可以，无特殊设置

5.在运行的页面上设置
```html
<div id="gitbook" class="book"></div>
```

6.设置服务
若是在本地的话，需要在运行的页面目录下启动一个服务。建议如果有node环境下，使用http-server
```
npm install -g http-server
```
在当前目录下，运行终端，然后http-server就可以轻松启动一个服务。访问localhost:8080即可。

## 还存在的问题
* 样式需要修改，借鉴的是gitbook的样式表和自己的一些修改
* 搜索功能没有实现，听实验室的同学说，是一个很复杂的实现算法，正考虑如何实现