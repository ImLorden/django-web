# Jay Lorden's blog
---
date: 2025-04-09
---
# 过程

## 一、环境搭建
---
### 1. Python 虚拟环境
#### **创建**
```shell
conda create -n django-blog python=3.10
conda activate django-blog
```

> [!notes]
> - 可以使用 `conda info --envs` 查看这个 conda 虚拟环境的位置
> - 比如我的结果是：
>  - `django-blog          * /opt/homebrew/Caskroom/miniconda/base/envs/django-blog`
>  - `*` 表示正在运行的虚拟环境


#### 操作
- 停用虚拟环境
```shell
conda deactivate
```

- 开启本虚拟环境
```shell
conda activate django-blog
```

#### 导出
```shell
pip freeze > requirements.txt
```

### 2. 工具
#### 介绍

**Django**
- Django 是一个功能强大的 Python Web 框架，用于构建网站的核心逻辑：路由、视图、模型、模板、后台管理等

**Pillow**
- Pillow 是 Python 的图像处理库（PIL 的分支）， Django 中处理图片字段（如文章封面图）时必须用它

**Django-ckeditor**
- 是一个基于 CKEditor 的富文本编辑器插件，可以在 Django 后台像 Word 一样编辑文章内容，支持图片、超链接、格式化文本等

**django-tailwind**
- 用于在 Django 项目中无缝集成 [Tailwind CSS](https://tailwindcss.com/)，它一种现代化的实用类前端框架


#### 安装
```shell
pip install django pillow django-ckeditor django-tailwind
```

>[!warning]
>- 我使用 pip 经常遇到网络问题，可能是因为代理和源的不匹配
>- 使用 
>- `pip install django pillow django-ckeditor django-tailwind -i https://pypi.org/simple` 从官方 PyPI 直接下载安装

#### 检查
```shell
% pip list

asgiref           3.8.1
Django            5.2
django-ckeditor   6.7.2
django-js-asset   3.1.2
django-tailwind   4.0.1
pillow            11.1.0
pip               25.0.1
setuptools        78.1.0
sqlparse          0.5.3
typing_extensions 4.13.1
wheel             0.45.1
```



## 二、搭建框架
---
- 在工作区（比如桌面）建立项目文件
```shell
% django-admin startproject myblog
% cd myblog
% ls
% python manage.py runserver


Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
April 09, 2025 - 07:39:39
Django version 5.2, using settings 'myblog.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```


- 创建超级用户
```shell
python manage.py createsuperuser
```

- 登陆超级用户：访问 [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)




## 三、创建 blog 应用
---
```shell
python manage.py startapp blog
```

- 打开 `myblog/settings.py`，找到 `INSTALLED_APPS`，添加 `'blog',`

```shell
python manage.py runserver
```


