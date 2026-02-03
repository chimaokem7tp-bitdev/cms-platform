# CMS Platform

Minimal full-stack CMS example:
- Frontend: React + TypeScript (client/)
- Backend: Django + Django REST Framework (server/)
- Database: PostgreSQL (docker-compose.yml)

API:
- GET /cms/content/ — returns a list of content items (mock items returned if DB empty)

## Quickstart (local development)

1. Start PostgreSQL (via Docker Compose)
```bash
docker-compose up -d
```

2. Backend setup
```bash
cd server
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

3. Frontend setup (new terminal)
```bash
cd client
npm install
npm start
```

4. Navigate to http://localhost:3000

## Project Structure

- `client/` — React + TypeScript frontend
- `server/` — Django + DRF backend
- `docs/` — Documentation
