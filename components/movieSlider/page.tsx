'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { fetchMovies } from '@/api/fetchMovies';
import { Movie } from '@/types/movie';
import './style.css';
import Link from 'next/link';
import { useTranslation } from '@/context/translationContext';

interface MovieSliderProps {
    endpoint: string;
    title: string;
    id: string;
}

const MovieSlider: React.FC<MovieSliderProps> = ({ endpoint, title, id }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const { messages, locale } = useTranslation();

    useEffect(() => {
        const getMovies = async () => {
            try {
                const movies = await fetchMovies(endpoint);
                setMovies(movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
                setMovies([]);
            }
        };

        getMovies();
    }, [endpoint]);

    const getGenreNames = (genreIds: number[]): string[] => {
        return genreIds.map(id => messages.genres[id.toString()] || 'Unknown');
    };

    return (
        <div className="m-8">
            <div className='m-5 flex justify-between items-center'>
                <h3 className="font-bold text-xl md:text-3xl">{messages[title]}</h3>
                <a href="#" className='text-red-700 flex items-center'>{messages.see_more} <img src="/images/Chevron right.svg" alt="right arrow" /></a>
            </div>
            <div className="relative">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1.2}
                    breakpoints={{
                        480: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                    }}
                    navigation={{
                        nextEl: `.swiper-button-next-${id}`,
                        prevEl: `.swiper-button-prev-${id}`,
                    }}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="custom-swiper"
                >
                    {Array.isArray(movies) && movies.length > 0 ? (
                        movies.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col items-center">
                                    <Link href={`/${locale}/${movie.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto cursor-pointer" />
                                    </Link>
                                    <div className="w-full mt-2">
                                        <small className="text-xs font-bold text-c-gray">{movie.release_date.split('-')[0]}</small>
                                        <Link href={`/${locale}/${movie.id}`}>
                                            <h3 className="text-lg font-semibold cursor-pointer">{movie.title}</h3>
                                        </Link>
                                        <div className='flex justify-between'>
                                            <span className='flex items-center'>
                                                <img src="/images/IMDB.svg" alt="IMDB" />
                                                <p className='text-xs mx-1'>{movie.vote_average.toFixed(1)}/10</p>
                                            </span>
                                            <span className='flex items-center'>
                                            <img src="/images/Tomato.svg" alt="Ratings" />
                                            <p className='text-xs mx-1'>{movie.popularity.toFixed(1)}</p>
                                            </span>
                                        </div>
                                        <p className="my-2 text-xs font-bold text-c-gray">{getGenreNames(movie.genre_ids).join(', ')}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="p-4 text-center">{messages.no_movies_found}</div>
                    )}
                </Swiper>
                <div className="swiper-navigation md:flex hidden">
                    <div className={`swiper-button-prev swiper-button-prev-${id}`}></div>
                    <div className={`swiper-button-next swiper-button-next-${id}`}></div>
                </div>
            </div>
        </div>
    );
};

export default MovieSlider;
