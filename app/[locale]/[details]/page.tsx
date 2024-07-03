// app/[locale]/[details]/page.tsx
'use client';
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import fetchVideos from '@/api/fetchVideos';
import { Movie } from '@/types/movie';
import './style.css';
import { useTranslation } from '@/context/translationContext';
import Skeleton from '@/components/skeleton/page';

interface DetailsProps {
  params: {
    details: string;
    locale: string;
  };
}

const Details: React.FC<DetailsProps> = ({ params }) => {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const { details: id, locale } = params;
  const { messages } = useTranslation();
  const pagination = {
    clickable: true,
    renderBullet: (index: number, className: string) => {
      return `<span class="${className} custom-bullet">${index + 1}</span>`;
    },
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
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
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=${language}`, options);
        const data = await response.json();

        const imageResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/images`, options);
        const imageData = await imageResponse.json();

        const trailer = await fetchVideos(id, language);

        const topBackdrops = imageData.backdrops
          .sort((a: any, b: any) => b.vote_average - a.vote_average)
          .slice(0, 3)
          .map((backdrop: any) => backdrop.file_path);

        const movieData: Movie = {
          backdrop_paths: topBackdrops,
          title: data.title,
          overview: data.overview,
          id: data.id,
          trailerLink: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '',
          year: "",
          genres: [],
          poster: "",
          backdrop_path: "",
          release_date: "",
          genre_ids: [],
          vote_average: data.vote_average,
          poster_path: "",
          popularity: data.popularity,
        };

        setMovieDetails(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const truncateOverview = (overview: string) => {
    return overview.split(' ').slice(0, 40).join(' ') + '...';
  };

  if (!movieDetails) {
    return <Skeleton />; // Use the Skeleton component while loading
  }

  return (
    <div className="relative">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        pagination={pagination}
        modules={[Navigation, Autoplay, Pagination]}
        className="h-90dvh w-full object-cover md:h-48-r"
      >
        {movieDetails.backdrop_paths.map((path, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={`https://image.tmdb.org/t/p/original/${path}`}
                alt={`${movieDetails.title} backdrop ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ zIndex: index + 1 }}
              />
              <div className="z-50 absolute bottom-[40px] md:bottom-[80px] p-4 left-0 right-0 mx-auto text-white flex w-11/12">
                <div className='flex-col space-y-3 items-start justify-start w-4/5 lg:w-2/5'>
                  <h3 className='font-bold text-3xl md:text-4xl lg:text-5xl'>{movieDetails.title}</h3>
                  <span className='flex items-center space-x-4'>
                    <img src="/images/IMDB.svg" alt="IMDB" />
                    <p>{movieDetails.vote_average.toFixed(1)}/10</p>
                    <img src="/images/Tomato.svg" alt="Ratings" />
                    <p>{movieDetails.popularity.toFixed(1)}</p>
                  </span>
                  <span className="block w-full text-justify">
                    <p className="m-0">{truncateOverview(movieDetails.overview)}</p>
                  </span>
                  <div>
                    <a
                      href={movieDetails.trailerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='inline-flex items-center justify-center bg-c-red text-white font-semibold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out'
                    >
                      <img src="/images/Play.svg" alt="play" className='m-1' /> {messages.watch_trailer}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination flex flex-col absolute right-4 top-1/2 transform -translate-y-1/2 z-20 space-y-2"></div>
    </div>
  );
};

export default Details;

