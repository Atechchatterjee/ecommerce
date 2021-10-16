from django.db import models


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.TextField(blank=False, default="")
    phNumber = models.TextField(blank=False, unique=True, default="")
    email = models.EmailField(blank=False, unique=True)
    password = models.TextField(blank=False)
    auth = models.TextField(blank=True)

    def __str__(self):
        return self.email


class Token(models.Model):
    user_id = models.ForeignKey("authentication.User", verbose_name=(
        "user id"), on_delete=models.CASCADE)
    token = models.TextField(unique=True)
    created_at = models.DateTimeField()

    def __str__(self):
        return self.token


class AdminUser(models.Model):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(blank=False, unique=True)
    password = models.TextField(blank=False)
    editable = models.BooleanField(blank=False)


class AdminToken(models.Model):
    user_id = models.ForeignKey("authentication.AdminUser", verbose_name=(
        "user id"), on_delete=models.CASCADE)
    token = models.TextField(unique=True)
    created_at = models.DateTimeField()

    def __str__(self):
        return self.token
