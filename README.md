# CMS Platform - Full Stack Application

A modern content management system built with React (frontend) and Django (backend).

## Project Overview

This CMS Platform features:
- **Backend**: Django REST Framework API with PostgreSQL database
- **Frontend**: React with TypeScript for content management
- **Database**: PostgreSQL containerized with Docker Compose
- **CORS**: Configured for cross-origin requests between frontend and backend

## Folder Structure

```
cms-platform/
├── README.md
├── .gitignore
├── docker-compose.yml
├── client/                # React TypeScript frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.tsx
│   │   └── index.tsx
│   └── package.json
├── server/                # Django REST API
│   ├── cms/               # CMS app
│   │   ├── models.py      # Database models
│   │   ├── views.py       # API views
│   │   ├── urls.py        # URL routing
│   │   └── __init__.py
│   ├── cms_platform/      # Project settings
│   │   ├── settings.py    # Django settings
│   │   └── __init__.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
└── docs/                  # Documentation
```

## Prerequisites

- Python 3.10+
- Node.js 16+
- Docker & Docker Compose
- Git

## Installation & Setup

### 1. PostgreSQL Setup (Docker)

Start PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

This will start PostgreSQL on `localhost:5432`. Verify it's running:

```bash
docker-compose ps
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Copy the environment file:

```bash
cp .env.example .env
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

### 3. Frontend Setup

In a new terminal, navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Content Endpoints

- **GET** `/cms/content/` - Retrieve all content items
  
  Response:
  ```json
  [
    {
      "id": 1,
      "title": "Welcome to CMS Platform",
      "body": "This is a modern content management system..."
    }
  ]
  ```

## Development

### Backend Development

- Django Admin: `http://localhost:8000/admin/`
- API Documentation: `http://localhost:8000/api/`
- Models: [server/cms/models.py](server/cms/models.py)
- Views: [server/cms/views.py](server/cms/views.py)

### Frontend Development

- Main App: [client/src/App.tsx](client/src/App.tsx)
- Pages: [client/src/pages/](client/src/pages/)
- Components: [client/src/components/](client/src/components/)

## Database

PostgreSQL is used as the primary database. Connection details are configured in:
- Backend: [server/cms_platform/settings.py](server/cms_platform/settings.py)
- Environment: `server/.env`

## CORS Configuration

CORS is enabled to allow requests from the React frontend to the Django backend. Allowed origins are configured in [server/cms_platform/settings.py](server/cms_platform/settings.py).

## Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Access PostgreSQL CLI
docker-compose exec db psql -U postgres
```

## Troubleshooting

### Port Already in Use
- Backend (8000): `lsof -i :8000` and kill the process
- Frontend (3000): `lsof -i :3000` and kill the process
- PostgreSQL (5432): Check Docker container status

### Database Connection Issues
- Verify Docker container is running: `docker-compose ps`
- Check `.env` file has correct credentials
- Run migrations: `python manage.py migrate`

### CORS Errors
- Ensure backend is running on `http://localhost:8000`
- Check CORS settings in `settings.py`
- Verify frontend proxy in `package.json`

## License

MIT

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

---

**Happy coding!** 🚀
