import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContentList from './components/ContentList';

interface ContentItem {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

const App: React.FC = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/cms/content/');
        setContents(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching contents:', err);
        setError('Failed to fetch content items. Please try again later.');
        // Mock data for demonstration when API is not available
        setContents([
          {
            id: 1,
            title: 'Welcome to CMS Platform',
            body: 'This is a modern content management system built with React and Django. You can create, read, update, and delete content items through this interface.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 2,
            title: 'Getting Started',
            body: 'To get started with the CMS Platform, ensure both the Django backend and React frontend are running. The backend API is available at http://localhost:8000 and the frontend at http://localhost:3000.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>CMS Platform</h1>
        <p style={styles.subtitle}>Content Management System</p>
      </header>

      <main style={styles.main}>
        {loading && <p style={styles.loading}>Loading content...</p>}
        {error && <p style={styles.error}>{error}</p>}
        {!loading && <ContentList contents={contents} />}
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2024 CMS Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '2rem',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    opacity: 0.9,
  },
  main: {
    flex: 1,
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '2rem',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#666',
  },
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  footer: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1.5rem',
    textAlign: 'center',
    marginTop: 'auto',
  },
};

export default App;
