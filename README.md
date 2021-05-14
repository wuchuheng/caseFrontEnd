## 使用
需要先全局安装`angular` 
``` bash 
$ yarn global add @angular/cli
```

```angular2html
$ yarn 
$ yarn start // 运行 
$ yarn  build // 生成 dist 中
```

## 配置 环境变量
`src/environments/environments.prod.ts`

## 部署 `nginx`

由于使用路径路由，如`/admin`这个路由下，`nginx`就找不到相关的文件，需要配置`nignx`路由重写,把所有的访问指向'index.html'文件
``` nginx 
    location / {  
    	try_files $uri $uri/ /index.html$is_args$query_string;  
    } 
```
