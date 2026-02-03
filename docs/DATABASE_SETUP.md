# Docker & Database Setup Guide

## Overview

This project uses Docker and Docker Compose to manage PostgreSQL database containerization.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (usually included with Docker Desktop)

## Quick Start

### Start PostgreSQL

```bash
docker-compose up -d
```

### Check Status

```bash
docker-compose ps
```

Expected output:
```
NAME      IMAGE             STATUS         PORTS
cms_db    postgres:15-alpine   Up 10 seconds  0.0.0.0:5432->5432/tcp
```

### Stop PostgreSQL

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f db
```

## Database Configuration

### Docker Compose Configuration

File: `docker-compose.yml`

```yaml
services:
  db:
    image: postgres:15-alpine    # PostgreSQL 15 on Alpine Linux
    container_name: cms_db        # Container name
    environment:
      POSTGRES_DB: cms_db         # Database name
      POSTGRES_USER: postgres      # Username
      POSTGRES_PASSWORD: postgres  # Password
    ports:
      - "5432:5432"              # Host:Container port mapping
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Data persistence
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
```

### Connection Details

```
Host: localhost
Port: 5432
Database: cms_db
Username: postgres
Password: postgres
```

These are configured in:
- Docker: `docker-compose.yml` environment variables
- Django: `server/.env.example` and `server/.env`

## Using PostgreSQL CLI

### Access PostgreSQL Container

```bash
docker-compose exec db psql -U postgres
```

### Common PostgreSQL Commands

```sql
-- List databases
\l

-- Connect to database
\c cms_db

-- List tables
\dt

-- View table structure
\d cms_content

-- List all content
SELECT * FROM cms_content;

-- Count records
SELECT COUNT(*) FROM cms_content;

-- Exit
\q
```

### Example: Query Content

```bash
docker-compose exec db psql -U postgres -d cms_db -c "SELECT * FROM cms_content;"
```

## Data Persistence

The `postgres_data` volume automatically persists database data:

```yaml
volumes:
  postgres_data:
    driver: local
```

Data survives container restarts and is stored on your system.

### View Docker Volumes

```bash
docker volume ls
```

### Inspect Volume

```bash
docker volume inspect cms-platform_postgres_data
```

### Remove Volume (WARNING: Deletes data)

```bash
docker volume rm cms-platform_postgres_data
```

## Troubleshooting

### Connection Refused

```bash
# Ensure Docker is running and container is up
docker-compose ps

# If not running, start it
docker-compose up -d

# Check logs
docker-compose logs db
```

### Port Already in Use

```bash
# Find process using port 5432
lsof -i :5432

# Kill the process
kill -9 <PID>

# Or change port in docker-compose.yml
# ports:
#   - "5433:5432"  # Use 5433 instead
```

### Database Connection Error in Django

Ensure:
1. PostgreSQL container is running: `docker-compose ps`
2. `.env` file has correct credentials
3. Django settings.py uses correct environment variables

### Reset Database

```bash
# Backup current data if needed
docker-compose exec db pg_dump -U postgres cms_db > backup.sql

# Remove container and volume
docker-compose down -v

# Restart with fresh database
docker-compose up -d

# Re-run migrations
cd server
python manage.py migrate
```

### Check Database Size

```bash
docker-compose exec db psql -U postgres -d cms_db -c "SELECT pg_size_pretty(pg_database_size('cms_db'));"
```

## Advanced Operations

### Backup Database

```bash
# Full backup
docker-compose exec db pg_dump -U postgres cms_db > backup.sql

# Backup to compressed file
docker-compose exec db pg_dump -U postgres cms_db | gzip > backup.sql.gz
```

### Restore Database

```bash
# Restore from backup
docker-compose exec -T db psql -U postgres cms_db < backup.sql

# Restore from compressed backup
gunzip -c backup.sql.gz | docker-compose exec -T db psql -U postgres cms_db
```

### Monitor Database

```bash
# Check PostgreSQL logs
docker-compose logs db

# Real-time logs
docker-compose logs -f db

# View container stats
docker stats cms_db
```

## Docker Commands Reference

```bash
# Build and start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove everything including volumes
docker-compose down -v

# View services status
docker-compose ps

# View logs
docker-compose logs

# View specific service logs
docker-compose logs db

# Follow logs
docker-compose logs -f

# Execute command in container
docker-compose exec db <command>

# View service configuration
docker-compose config
```

## Performance Tips

### For Development

- Keep PostgreSQL running: `docker-compose up -d`
- Use persistent volumes for data
- Monitor container resources

### For Production

- Use managed PostgreSQL (AWS RDS, Google Cloud SQL, etc.)
- Set up regular backups
- Configure connection pooling
- Use environment-specific settings

## Security Notes

**For Development Only:**
- Current credentials are simple (postgres/postgres)
- Not suitable for production

**For Production:**
- Use strong, unique passwords
- Store credentials in secure vaults
- Use SSL/TLS connections
- Implement proper access controls
- Regular security updates
