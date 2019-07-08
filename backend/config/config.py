import os
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get("JANE_DEBUG", False)

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("JANE_SECRET_KEY", "unknown")

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "USER": os.environ.get("JANE_DB_USERNAME", "unknown"),
        "PASSWORD": os.environ.get("JANE_DB_PASSWORD", "unknown"),
        "NAME": os.environ.get("JANE_DB_NAME", "unknown"),
        "HOST": os.environ.get("JANE_DB_HOST", "unknown"),
        "PORT": os.environ.get("JANE_DB_PORT", "unknown"),
    }
}

# Support Email


# DEBUG settings
if DEBUG:
    ALLOWED_HOSTS = ["*"]
else:
    ALLOWED_HOSTS = []
    # Sentry
    sentry_sdk.init(
        dsn=os.environ.get("JANE_SENTRY"), integrations=[DjangoIntegration()]
    )
