'use client'; // Mark as Client Component for interactivity

import Head from 'next/head';
import styles from './Home.module.css'; // CSS module for styling

export default function Home() {
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    console.log('Search query:', query);
    // Placeholder for search logic
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Secure Search Portal</title>
        <meta name="description" content="A secure and smart search platform" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Secure Search</h1>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            name="search"
            placeholder="Enter your search query"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </main>
    </div>
  );
}