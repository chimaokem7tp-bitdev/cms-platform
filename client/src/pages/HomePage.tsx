import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to CMS Platform</h1>
      <p>This is the home page of the CMS Platform application.</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
  },
};

export default HomePage;
