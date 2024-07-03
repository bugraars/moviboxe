// api/fetchVideos.ts

const fetchVideos = async (id: string, language: string) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmM3MDAyY2RlODFlZTZmMjRhYjRkZjJiNmFiZGEyYiIsIm5iZiI6MTcxOTYwOTIxOS45NTgxOSwic3ViIjoiNjY3ZjIwMGE2OTg3ZDc0YmFhM2JkYjZlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.AR1vIdswYVMLiAZus1Vs_M0Ta-OAeefkF1dxT66xsTQ'
      }
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
  