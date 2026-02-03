# Frontend Setup Guide

## Prerequisites

- Node.js 16 or higher
- npm 8 or higher (comes with Node.js)

## Installation Steps

### 1. Navigate to Client Directory

```bash
cd client
```

### 2. Install Dependencies

```bash
npm install
```

This will install all packages listed in `package.json`:
- React 18.2.0
- TypeScript
- Axios (for API calls)
- React Router (for routing)

### 3. Configure API Proxy

The `package.json` already includes a proxy configuration:

```json
"proxy": "http://localhost:8000"
```

This forwards API requests to the Django backend running on port 8000.

### 4. Start Development Server

```bash
npm start
```

The application will open at: `http://localhost:3000`

## Project Structure

```
src/
├── App.tsx              # Main application component
├── index.tsx            # React entry point
├── components/          # Reusable components
│   └── ContentList.tsx   # Displays list of content items
└── pages/               # Page components
    └── HomePage.tsx     # Home page component
```

## Component Overview

### App Component

The main component that:
- Fetches content from the backend API
- Displays loading state
- Handles errors with fallback mock data
- Renders the ContentList component

### ContentList Component

Displays content items in a responsive grid layout with:
- Formatted titles
- Content body text
- Creation date
- Responsive card design

## Available Scripts

```bash
# Start development server (with hot reload)
npm start

# Build for production
npm build

# Run tests
npm test

# Remove Create React App configuration (one-way operation)
npm eject
```

## API Integration

The app connects to the backend API at `/api/cms/content/`:

```typescript
const response = await axios.get('/api/cms/content/');
```

### Expected API Response

```json
[
  {
    "id": 1,
    "title": "Content Title",
    "body": "Content body text",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

## Styling

The application uses inline CSS-in-JS with React CSS Properties:

```typescript
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    // CSS properties
  }
};
```

This approach:
- Keeps styles scoped to components
- Requires no build configuration
- Provides TypeScript support

## Troubleshooting

### Port Already in Use

```bash
# Find process on port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### API Connection Issues

1. **Ensure backend is running**: `http://localhost:8000`
2. **Check CORS settings** in `server/cms_platform/settings.py`
3. **Look at browser console** for CORS errors
4. **Check backend logs** for API errors

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Changes Not Reflecting

- Clear browser cache (Cmd+Shift+Delete or Ctrl+Shift+Delete)
- Restart dev server
- Hard refresh page (Cmd+Shift+R or Ctrl+Shift+R)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tips

### React Developer Tools

Install React Developer Tools browser extension for debugging:
- [Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

### TypeScript Checking

The project uses TypeScript for type safety. Watch for type errors:
- In VS Code terminal
- In browser console
- During `npm build`

### Performance

- Components use React.FC for proper typing
- Hooks for state management
- Lazy loading ready (can add React.lazy() if needed)

## Environment Variables

Create a `.env` file in the `client` directory if needed:

```
REACT_APP_API_URL=http://localhost:8000
```

Then access in code:

```typescript
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory:
- Minified JavaScript
- Optimized CSS
- Static files ready for deployment

Deploy to services like Vercel, Netlify, or AWS S3 + CloudFront.
