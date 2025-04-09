from django.db import models
import markdown  # type: ignore
from django.utils import timezone


class Post(models.Model):
    title = models.CharField(max_length=200, verbose_name="标题")
    content = models.TextField(verbose_name="内容")  # 使用 TextField 来存储 Markdown 格式的文本
    created_at = models.DateTimeField(default=timezone.now, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")
    is_published = models.BooleanField(default=True, verbose_name="是否发布")
    cover = models.ImageField(upload_to='covers/', blank=True, null=True, verbose_name="封面图")

    def __str__(self):
        return self.title

    def get_content_as_html(self):
        """渲染 Markdown 内容为 HTML"""
        return markdown.markdown(self.content)

    class Meta:
        verbose_name = "文章"
        verbose_name_plural = "文章"
