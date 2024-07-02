// utils/fetchMovies.ts
import Cookies from 'js-cookie';

export const fetchMovies = async (endpoint: string) => {
    const localeCookie = Cookies.get('NEXT_LOCALE') || 'en';
    const languageMap: { [key: string]: string } = {
        en: 'en-US',
        de: 'de-DE',
    };
    const language = languageMap[localeCookie] || 'en-US';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        }
    };

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?language=${language}`, options);
        if (!response.ok) {
            throw new Error(`An error occurred: ${response.statusText}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};
