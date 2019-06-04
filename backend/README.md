# Jane 后端

### 技术栈

- Python 3.5+
- Django 2.1+
- MySQL 5.7+

### 开发环境

##### 安装 Python 虚拟环境

```
$ virtualenv venv --python=python3.5
$ source venv/bin/activate
```

##### 安装项目相关依赖及配置

- 项目依赖

```
# 开发环境
$ pip install -r requirements/development.pip

# 生产环境
$ pip install -r requirements/production.pip
```

- 代码规范
  _ pre-commit 用于安装对应的 git hook，保证每次提交进行规范检查(.pre-commit-config.yaml)
  _ black 用于进行代码自动规整(pyproject.toml) \* flake8 检查代码是否遵循 PEP8 规范(.flake8)

##### 创建数据库

```
$ mysql -uroot -p -e 'CREATE DATABASE jane charset="utf8";'
```

##### 环境变量

```
# SECRET_KEY 可由以下步骤生成：
$ python
>>> from django.core.management import utils
>>> utils.get_random_secret_key()
'z1q=7ixu5&o=2lj05uziiemvhi)!z1-d9fwmyo(sqsyzpvg2u_'

# 添加以下内容到 venv/bin/activate 文件末尾，在激活虚拟环境时引入配置
export JANE_DEBUG=Ture
export JANE_SECRET_KEY='z1q=7ixu5&o=2lj05uziiemvhi)!z1-d9fwmyo(sqsyzpvg2u_'
# Database settings
export JANE_DB_HOST='localhost'
export JANE_DB_PORT=3306
export JANE_DB_USERNAME='root'
export JANE_DB_PASSWORD='123456'
export JANE_DB_NAME='jane'
# sentry 用于辅助追踪生产环境运行时错误
export JANE_SENTRY='https://......'

# 重新激活
$ source venv/bin/activate
```

##### 运行通过&数据库初始化

```
$ python manage.py check
$ python manage.py migrate
```
