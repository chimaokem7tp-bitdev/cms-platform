import React from 'react';
import '../styles/ContentList.css';

interface ContentItem {
  id: number;
  title: string;
  body: string;
}

interface ContentListProps {
  items: ContentItem[];
}

const ContentList: React.FC<ContentListProps> = ({ items }) => {
  if (items.length === 0) {
    return <p>No content available.</p>;
  }

  return (
    <div className="content-list">
      <h2>Content Items</h2>
      <div className="items-grid">
        {items.map((item) => (
          <div key={item.id} className="content-item">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentList;
