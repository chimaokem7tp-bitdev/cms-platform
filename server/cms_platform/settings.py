"""
Django settings for cms_platform project.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Build paths inside the project
BASE_DIR = Path(__file__).resolve().parent.parent

# Security keys and debug/read from environment for flexibility
def env_bool(name: str, default: str = 'False') -> bool:
    return os.getenv(name, default).lower() in ('1', 'true', 'yes')

def env_list(name: str, default: str = '') -> list:
    val = os.getenv(name, default)
    if not val:
        return []
    return [p.strip() for p in val.split(',') if p.strip()]


SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-your-secret-key-change-this-in-production')

# DEBUG should be False in production. Set DJANGO_DEBUG env var to 'True' or 'False'.
DEBUG = env_bool('DJANGO_DEBUG', 'True')

# Hosts allowed to serve the application. Provide comma-separated list in DJANGO_ALLOWED_HOSTS
allowed = env_list('DJANGO_ALLOWED_HOSTS', '*')
ALLOWED_HOSTS = allowed if allowed and allowed != ['*'] else ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'cms',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'cms_platform.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cms_platform.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'cms_db'),
        'USER': os.getenv('DB_USER', 'postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'postgres'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework configuration
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

# CORS configuration
# CORS configuration - configurable via DJANGO_CORS_ALLOWED_ORIGINS (comma-separated)
CORS_ALLOWED_ORIGINS = env_list('DJANGO_CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://localhost:8000,http://127.0.0.1:3000')
CORS_ALLOW_CREDENTIALS = env_bool('CORS_ALLOW_CREDENTIALS', 'True')

# Security-sensitive settings (switch on in production via env)
SECURE_SSL_REDIRECT = env_bool('SECURE_SSL_REDIRECT', 'False')
SECURE_HSTS_SECONDS = int(os.getenv('SECURE_HSTS_SECONDS', '0'))
SESSION_COOKIE_SECURE = env_bool('SESSION_COOKIE_SECURE', 'False')
CSRF_COOKIE_SECURE = env_bool('CSRF_COOKIE_SECURE', 'False')
