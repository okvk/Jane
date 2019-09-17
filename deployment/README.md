# Jane 部署

###

```
$ cd jane
$ mv .env_template .env
$ vim .env
# 填写各个环境变量的值

# 构建 image，注意以下命令运行时要与 docker-compose.yaml 同目录
$ docker-compose build
# 启动镜像
$ docker-compose up
```
