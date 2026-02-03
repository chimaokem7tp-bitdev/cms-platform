# Backend Setup Guide

## Prerequisites

- Python 3.10 or higher
- PostgreSQL 13 or higher (via Docker)
- pip (Python package manager)

## Installation Steps

### 1. Navigate to Server Directory

```bash
cd server
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### 3. Activate Virtual Environment

**On macOS/Linux:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your database credentials if needed (defaults work with docker-compose):

```
DB_ENGINE=django.db.backends.postgresql
DB_NAME=cms_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```

### 6. Run Database Migrations

```bash
python manage.py migrate
```

### 7. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 8. Load Sample Data (Optional)

```bash
python manage.py shell
```

Then in the Django shell:

```python
from cms.models import Content

Content.objects.create(
    title="Welcome to CMS Platform",
    body="This is a modern content management system built with React and Django."
)

Content.objects.create(
    title="Getting Started",
    body="To get started, ensure PostgreSQL is running and both the frontend and backend servers are active."
)

exit()
```

### 9. Run Development Server

```bash
python manage.py runserver
```

The API will be available at: `http://localhost:8000`

## API Documentation

### Available Endpoints

#### List Content
- **URL**: `/api/cms/content/`
- **Method**: `GET`
- **Response**: List of content items

```json
[
  {
    "id": 1,
    "title": "Welcome to CMS Platform",
    "body": "This is a modern content management system...",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

#### Create Content
- **URL**: `/api/cms/content/`
- **Method**: `POST`
- **Body**:
```json
{
  "title": "New Content",
  "body": "Content body text"
}
```

#### Retrieve Content
- **URL**: `/api/cms/content/{id}/`
- **Method**: `GET`

#### Update Content
- **URL**: `/api/cms/content/{id}/`
- **Method**: `PUT`

#### Delete Content
- **URL**: `/api/cms/content/{id}/`
- **Method**: `DELETE`

## Admin Panel

Access the Django admin panel at: `http://localhost:8000/admin/`

Default credentials (if you created a superuser):
- Username: (what you entered)
- Password: (what you entered)

## Troubleshooting

### Port Already in Use

```bash
# Find process on port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>
```

### Database Connection Error

Ensure PostgreSQL is running:

```bash
docker-compose up -d
docker-compose ps
```

### Migration Issues

Reset migrations (development only):

```bash
python manage.py migrate cms zero
python manage.py migrate
```

## Common Commands

```bash
# Create new app
python manage.py startapp appname

# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run tests
python manage.py test

# Run Django shell
python manage.py shell

# Collect static files
python manage.py collectstatic
```
