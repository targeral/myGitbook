# 安装及使用
1. 通过git clone或者npm install下载后，引用bin文件下的gitbook.min.css, util.js, markdown.js, gitbook.min.js

2. 如下配置目录,参数:
  * BookName:书的名字
  * HomePage:主页
  * BookTitle:书的别名(可与书名一致)
  * BookFile：文章的文件位置
  * Content:目录内容


3. 目录内容格式

4. 关于图片
正常的相对于*.md的目录设置就可以，无特殊设置

5. 在运行的页面上设置

6. 设置服务
若是在本地的话，需要在运行的页面目录下启动一个服务。建议如果有node环境下，使用http-server
在当前目录下，运行终端，然后http-server就可以轻松启动一个服务。访问localhost:8080即可。