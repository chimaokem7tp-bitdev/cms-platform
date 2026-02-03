# Architecture & API Documentation

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (Frontend)                  │
│  React 18 + TypeScript                                      │
│  - Components: ContentList, HomePage                        │
│  - Hooks: useState, useEffect                               │
│  - HTTP Client: Axios                                       │
└─────────────────────────────────────────────────────────────┘
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  API LAYER (Backend)                        │
│  Django + Django REST Framework                             │
│  - Views: ContentViewSet (CRUD operations)                  │
│  - Serializers: ContentSerializer                           │
│  - Authentication: CORS-enabled                             │
└─────────────────────────────────────────────────────────────┘
                            │ SQL
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  DATA LAYER (Database)                      │
│  PostgreSQL 15 (Docker Container)                           │
│  - Tables: cms_content, Django system tables               │
│  - Persistence: Docker volume (postgres_data)               │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React**: 18.2.0 - UI library
- **TypeScript**: 5.3.2 - Type safety
- **Axios**: 1.6.2 - HTTP client
- **React Router**: 6.17.0 - Routing (ready to use)

### Backend
- **Django**: 4.2.8 - Web framework
- **Django REST Framework**: 3.14.0 - REST API
- **Django CORS Headers**: 4.3.1 - Cross-origin support
- **PostgreSQL**: 15 - Database
- **Psycopg2**: 2.9.9 - PostgreSQL adapter

### Infrastructure
- **Docker**: Containerization
- **Docker Compose**: Orchestration
- **Python**: 3.10+ backend runtime
- **Node.js**: 16+ frontend runtime

## API Specification

### Base URL
```
http://localhost:8000/api/cms/
```

### Content Endpoints

#### 1. List All Content Items

```http
GET /api/cms/content/
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `page_size` (optional): Items per page (default: 10)

**Response:** 200 OK
```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Welcome to CMS Platform",
      "body": "This is a modern content management system...",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### 2. Retrieve Single Content Item

```http
GET /api/cms/content/{id}/
```

**Path Parameters:**
- `id` (required): Content item ID

**Response:** 200 OK
```json
{
  "id": 1,
  "title": "Welcome to CMS Platform",
  "body": "This is a modern content management system built with React and Django.",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Response:** 404 Not Found
```json
{
  "detail": "Not found."
}
```

#### 3. Create Content Item

```http
POST /api/cms/content/
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Content Item",
  "body": "This is the content body text."
}
```

**Response:** 201 Created
```json
{
  "id": 3,
  "title": "New Content Item",
  "body": "This is the content body text.",
  "created_at": "2024-01-15T11:00:00Z",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

#### 4. Update Content Item

```http
PUT /api/cms/content/{id}/
Content-Type: application/json
```

**Path Parameters:**
- `id` (required): Content item ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "body": "Updated body content."
}
```

**Response:** 200 OK
```json
{
  "id": 1,
  "title": "Updated Title",
  "body": "Updated body content.",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T12:00:00Z"
}
```

#### 5. Partial Update Content Item

```http
PATCH /api/cms/content/{id}/
Content-Type: application/json
```

**Path Parameters:**
- `id` (required): Content item ID

**Request Body (partial):**
```json
{
  "title": "Updated Title Only"
}
```

**Response:** 200 OK
```json
{
  "id": 1,
  "title": "Updated Title Only",
  "body": "Original body content remains unchanged.",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T12:00:00Z"
}
```

#### 6. Delete Content Item

```http
DELETE /api/cms/content/{id}/
```

**Path Parameters:**
- `id` (required): Content item ID

**Response:** 204 No Content

## Data Models

### Content Model

```python
class Content(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

**Fields:**
- `id` (auto-generated): Primary key
- `title`: Content title (max 200 characters)
- `body`: Content body (unlimited text)
- `created_at`: Automatic timestamp on creation
- `updated_at`: Automatic timestamp on update

**Ordering:** Default ordering by `-created_at` (newest first)

## Request/Response Examples

### Using Axios (Frontend)

```typescript
import axios from 'axios';

// Fetch all content
const fetchContent = async () => {
  try {
    const response = await axios.get('/api/cms/content/');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching content:', error);
  }
};

// Create new content
const createContent = async () => {
  try {
    const response = await axios.post('/api/cms/content/', {
      title: 'New Post',
      body: 'This is the content body.'
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error creating content:', error);
  }
};

// Update content
const updateContent = async (id: number) => {
  try {
    const response = await axios.put(`/api/cms/content/${id}/`, {
      title: 'Updated Title',
      body: 'Updated body.'
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error updating content:', error);
  }
};

// Delete content
const deleteContent = async (id: number) => {
  try {
    await axios.delete(`/api/cms/content/${id}/`);
    console.log('Content deleted successfully');
  } catch (error) {
    console.error('Error deleting content:', error);
  }
};
```

### Using cURL (Backend Testing)

```bash
# Get all content
curl http://localhost:8000/api/cms/content/

# Get specific content
curl http://localhost:8000/api/cms/content/1/

# Create content
curl -X POST http://localhost:8000/api/cms/content/ \
  -H "Content-Type: application/json" \
  -d '{"title":"New Post","body":"Content here"}'

# Update content
curl -X PUT http://localhost:8000/api/cms/content/1/ \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title","body":"Updated body"}'

# Delete content
curl -X DELETE http://localhost:8000/api/cms/content/1/
```

## Authentication & CORS

### CORS Configuration

Current CORS allowed origins:
- `http://localhost:3000` (React frontend)
- `http://localhost:8000` (Backend)
- `http://127.0.0.1:3000` (Localhost alternative)

### Modify CORS Settings

Edit `server/cms_platform/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://example.com',  # Add your domain
]
```

### Future: Add Authentication

To add token-based authentication:

```python
# In settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}

# In views.py
from rest_framework.permissions import IsAuthenticated

class ContentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    # ...
```

## Error Handling

### Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid data |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Django error |

### Error Response Format

```json
{
  "detail": "Error message here"
}
```

## Development Workflow

1. **Start PostgreSQL**: `docker-compose up -d`
2. **Start Backend**: `cd server && python manage.py runserver`
3. **Start Frontend**: `cd client && npm start`
4. **Test API**: Use Postman, cURL, or Axios
5. **Debug**: Check browser console and Django logs

## Performance Considerations

- Pagination: Default 10 items per page
- Lazy loading: Ready to implement
- Caching: Can be added with Django-Redis
- Rate limiting: Can be added with DRF throttling

## Deployment Considerations

- Use gunicorn for production: `gunicorn cms_platform.wsgi`
- Use nginx as reverse proxy
- Use managed PostgreSQL (AWS RDS, etc.)
- Enable DEBUG=False in production
- Use environment variables for secrets
- Configure proper CORS for production domains
