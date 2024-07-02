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
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmM3MDAyY2RlODFlZTZmMjRhYjRkZjJiNmFiZGEyYiIsIm5iZiI6MTcxOTYwOTIxOS45NTgxOSwic3ViIjoiNjY3ZjIwMGE2OTg3ZDc0YmFhM2JkYjZlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.AR1vIdswYVMLiAZus1Vs_M0Ta-OAeefkF1dxT66xsTQ'
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
