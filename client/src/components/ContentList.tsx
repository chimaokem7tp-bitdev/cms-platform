import React from 'react';

interface ContentItem {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

interface ContentListProps {
  contents: ContentItem[];
}

const ContentList: React.FC<ContentListProps> = ({ contents }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div style={styles.container}>
      {contents.length === 0 ? (
        <p style={styles.emptyMessage}>No content available.</p>
      ) : (
        <div style={styles.grid}>
          {contents.map((item) => (
            <article key={item.id} style={styles.card}>
              <h2 style={styles.cardTitle}>{item.title}</h2>
              <p style={styles.cardBody}>{item.body}</p>
              <div style={styles.cardMeta}>
                <small style={styles.date}>
                  Created: {formatDate(item.created_at)}
                </small>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    fontSize: '1.1rem',
    padding: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '0.75rem',
    color: '#2c3e50',
  },
  cardBody: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  cardMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    color: '#999',
    fontSize: '0.9rem',
  },
};

export default ContentList;
