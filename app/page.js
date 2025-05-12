'use client';

import { useState } from 'react';
import Head from 'next/head';
import DOMPurify from 'dompurify';
import styles from './Home.module.css';

export default function Home() {
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
  e.preventDefault();
  setError(null);
  const query = DOMPurify.sanitize(e.target.search.value);
  try {
    const url = `/api/search?query=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`;
    const res = await fetch(url); // Line ~19
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Search failed');
    }
    const data = await res.json(); // Line ~27
    setResults(data);
  } catch (error) {
    console.error('Error fetching search results:', error);
    setError(error.message);
    setResults([]);
  }
}; 

  return (
    <div className={styles.container}>
      <Head>
        <title>Eco-Friendly Product Guide</title>
        <meta name="description" content="Search sustainable products" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Eco-Friendly Product Guide</h1>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.searchSelect}
          >
            <option value="">All Categories</option>
            <option value="clothing">Clothing</option>
            <option value="personal care">Personal Care</option>
            <option value="home goods">Home Goods</option>
          </select>
          <input
            type="text"
            name="search"
            placeholder="Search eco-friendly products"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
        {error && (
          <div className={styles.error}>
            <p>Error: {error}</p>
          </div>
        )}
        <div className={styles.results}>
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result.id} className={styles.resultItem}>
                <h3>{result.name}</h3>
                <p>{result.description}</p>
                <p><strong>Category:</strong> {result.category}</p>
              </div>
            ))
          ) : (
            <p>{error ? 'Please try again.' : 'No results found'}</p>
          )}
        </div>
      </main>
    </div>
  );
}