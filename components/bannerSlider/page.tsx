'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { fetchMovies } from '@/api/fetchMovies';
import { Movie } from '@/types/movie';
import './style.module.css';
import Link from 'next/link';

interface BannerSliderProps {
    endpoint: string;
    title: string;
    id: string; // Unique ID for each slider
}

const BannerSlider: React.FC<BannerSliderProps> = ({ endpoint, title, id }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const pagination = {
        clickable: true,
        renderBullet: (index: number, className: string) => {
            return `<span class="${className} custom-bullet">${index + 1}</span>`;
        },
    };
    useEffect(() => {
        const getMovies = async () => {
            try {
                const movies = await fetchMovies(endpoint);
                setMovies(movies.slice(0, 5));
            } catch (error) {
                console.error("Error fetching movies:", error);
                setMovies([]);
            }
        };

        getMovies();
    }, [endpoint]);

    const truncateOverview = (overview: string) => {
        return overview.split(' ').slice(0, 12).join(' ') + '...';
    };
      

    return (
        <div className="relative">
            <Swiper
                direction="vertical"
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 2000,
                }}
                pagination={pagination}
                modules={[Navigation, Autoplay, Pagination]}
                className="w-full h-36-r"
            >
                {Array.isArray(movies) && movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <div>
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                    alt={movie.title}
                                    className="w-full object-cover"
                                />
                                <div className="z-50 absolute top-40 p-4 left-0 right-0 mx-auto text-white flex w-11/12">
                                    <div className='flex-col space-y-3 items-start justify-start w-2/5'>
                                        <Link href={`/${id}`} className='font-bold text-5xl'>{title}</Link>
                                        <span className='flex items-center space-x-4'>
                                            <img src="/images/IMDB.svg" alt="IMDB" />
                                            <p>{movie.imdbRating}/100</p>
                                            <img src="/images/Tomato.svg" alt="Ratings" />
                                            <p>{movie.tomatoRating}%</p>
                                        </span>
                                        <span className="block w-full text-justify">
                                            <p className="m-0">{truncateOverview(movie.overview)}</p>
                                        </span>
                                        <div>
                                            <button
                                                className='flex items-center bg-c-red text-white font-semibold py-2 px-4 rounded hover:bg-red-700'
                                            >
                                                <img src="/images/Play.svg" alt="play" className='m-1' /> WATCH TRAILER
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <div className="p-4 text-center">No movies found</div>
                )}
            </Swiper>
            <div className="swiper-pagination flex flex-col absolute right-4 top-1/2 transform -translate-y-1/2 z-20 space-y-2"></div>
        </div>
    );
};

export default BannerSlider;
