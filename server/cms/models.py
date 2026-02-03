from django.db import models

class Content(models.Model):
    """Model for storing CMS content items."""
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Contents'

    def __str__(self):
        return self.title
