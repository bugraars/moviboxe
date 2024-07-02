// api/fetchVideos.ts

const fetchVideos = async (id: string, language: string) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`}
    };
  
    try {
      const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=${language}`, options);
      const videoData = await videoResponse.json();
      return videoData.results.find((video: any) => video.type === 'Trailer' || video.type === 'Teaser');
    } catch (error) {
      console.error("Error fetching videos:", error);
      return null;
    }
  };
  
  export default fetchVideos;
  