# API Architecture

## Overview
The CMS Platform API is built with Django REST Framework and provides RESTful endpoints for content management.

## Endpoints

### Content
- `GET /cms/content/` — List all content items
- `POST /cms/content/` — Create a new content item
- `GET /cms/content/{id}/` — Retrieve a specific content item
- `PUT /cms/content/{id}/` — Update a content item
- `DELETE /cms/content/{id}/` — Delete a content item

## Response Format
All endpoints return JSON responses.

### Example Content Item
```json
{
  "id": 1,
  "title": "Example Title",
  "body": "Example body content",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

## CORS
CORS is enabled for `http://localhost:3000` to allow frontend requests.

## Documentation
Swagger API documentation is available at `/api/docs/`
