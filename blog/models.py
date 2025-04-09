from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField # type: ignore
import markdown  # type: ignore


class Post(models.Model):
    title = models.CharField(max_length=200, verbose_name="标题")
    content = RichTextField(verbose_name="内容")  # 修改为富文本字段
    created_at = models.DateTimeField(default=timezone.now, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")
    is_published = models.BooleanField(default=True, verbose_name="是否发布")

    # 新增字段：封面图
    cover = models.ImageField(upload_to='covers/', blank=True, null=True, verbose_name="封面图")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "文章"
        verbose_name_plural = "文章"

    def __str__(self):
        return self.title
    
    def get_content_as_html(self):
        return markdown.markdown(self.content)