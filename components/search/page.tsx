'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSearch } from '../../context/searchContext';
import { Movie } from '../../types/movie';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import './style.css';

const Search = () => {
  const { query, setQuery, setResults } = useSearch();
  const [results, setLocalResults] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const searchRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const locale = params.locale as string;

  const genreMap: { [key: string]: string } = {
    "28": "Action",
    "12": "Adventure",
    "16": "Animation",
    // ... diğer tür eşlemeleri
  };

  useEffect(() => {
    const localeCookie = Cookies.get('NEXT_LOCALE') || 'en';
    const languageMap: { [key: string]: string } = {
      en: 'en-US',
      de: 'de-DE',
      tr: 'tr-TR',
      // Diğer diller
    };
    setLanguage(languageMap[localeCookie] || 'en-US');

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuery = event.target.value;
    setQuery(newQuery);

    // Birden fazla boşluğu tek bir boşluğa indirgeme
    newQuery = newQuery.replace(/\s+/g, ' ');

    if (newQuery.trim().length > 0) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmM3MDAyY2RlODFlZTZmMjRhYjRkZjJiNmFiZGEyYiIsIm5iZiI6MTcxOTYwOTIxOS45NTgxOSwic3ViIjoiNjY3ZjIwMGE2OTg3ZDc0YmFhM2JkYjZlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.AR1vIdswYVMLiAZus1Vs_M0Ta-OAeefkF1dxT66xsTQ'
        }
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(newQuery.trim())}&include_adult=false&language=${language}&page=1`, options);
        const data = await response.json();

        if (data.status_code) {
          console.error(`Error: ${data.status_message}`);
          return;
        }

        const fetchedResults = data.results.map((item: any) => ({
          id: item.id,
          backdrop_path: item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : '/images/placeholder.png',
          title: item.title || item.name,
          genres: item.genre_ids.map((id: number) => genreMap[id.toString()] || 'Unknown'),
          poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/images/placeholder.png'
        }));

        setLocalResults(fetchedResults);
        setResults(fetchedResults); // Global sonuçları güncelle
        setShowResults(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      setLocalResults([]);
      setResults([]);
      setShowResults(false);
    }
  };

  return (
    <div className="search-wrapper" ref={searchRef}>
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search..." 
          value={query}
          onChange={handleSearch}
          onFocus={() => setShowResults(true)}
        />
        <button className="search-button" onClick={() => handleSearch({ target: { value: query } })}>
          <img src="/images/search.svg" alt="search" width={20} />
        </button>
      </div>
      {showResults && query.trim().length > 0 && (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((result: Movie, index: number) => (
              <Link key={index} href={`/${locale}/${result.id}`}>
                <div className="search-result-item">
                  <img src={result.poster} alt={result.title} className="result-poster" />
                  <div className="result-info">
                    <h3>{result.title}</h3>
                    <p>{result.genres.join(', ')}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-results">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
