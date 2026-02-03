# Backend Setup Guide

## Prerequisites
- Python 3.9+
- PostgreSQL (or SQLite for development)
- pip or conda

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd server
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your settings
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser:
```bash
python manage.py createsuperuser
```

6. Start the development server:
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/`

## Admin Interface
Access the admin interface at `http://localhost:8000/admin/`
