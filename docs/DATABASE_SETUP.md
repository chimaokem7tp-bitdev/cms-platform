# Database Setup Guide

## PostgreSQL (Production/Development)

### Using Docker Compose
```bash
docker-compose up -d
```

This starts PostgreSQL with:
- Database: `cms_db`
- User: `cms_user`
- Password: `cms_password`
- Port: `5432`

### Manual Setup
1. Install PostgreSQL
2. Create database:
```sql
CREATE DATABASE cms_db;
CREATE USER cms_user WITH PASSWORD 'cms_password';
GRANT ALL PRIVILEGES ON DATABASE cms_db TO cms_user;
```

3. Update `.env` with database credentials

## SQLite (Development)
SQLite is configured by default in Django settings. No setup required for local development.

## Migrations
```bash
python manage.py migrate
```

## Seeding Data
Add sample data to the database using the management command:
```bash
python manage.py shell
```

Then create Content objects through the Django shell or admin interface.
