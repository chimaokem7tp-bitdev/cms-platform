import React, { useEffect, useState } from 'react';
import ContentList from './components/ContentList';
import './App.css';

interface ContentItem {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:8000/cms/content/');
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>CMS Platform</h1>
        <p>Welcome to the minimal CMS platform</p>
      </header>
      <main className="App-main">
        {loading && <p>Loading content...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && <ContentList items={content} />}
      </main>
    </div>
  );
}

export default App;
