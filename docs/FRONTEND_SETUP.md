# Frontend Setup Guide

## Prerequisites
- Node.js 16+ and npm/yarn
- A running backend server

## Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Building for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Environment Variables
Create a `.env` file in the `client/` directory:
```
REACT_APP_API_URL=http://localhost:8000
```

## Available Scripts

- `npm start` — Start development server
- `npm build` — Create production build
- `npm test` — Run tests
- `npm eject` — Eject from Create React App (irreversible)
