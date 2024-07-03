'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { fetchMovies } from '@/api/fetchMovies';
import fetchVideos from '@/api/fetchVideos';
import { Movie } from '@/types/movie';
import './style.module.css';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useTranslation } from '@/context/translationContext';

interface BannerSliderProps {
    endpoint: string;
    title: string;
    id: string;
}

const BannerSlider: React.FC<BannerSliderProps> = ({ endpoint, title, id }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [trailers, setTrailers] = useState<{ [key: number]: string }>({});
    const locale = Cookies.get('NEXT_LOCALE') || 'en';
    const { messages } = useTranslation();

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
                const trailersData = await Promise.all(movies.slice(0, 5).map(async (movie: any) => {
                    const trailer = await fetchVideos(movie.id.toString(), locale);
                    return { [movie.id]: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '#' };
                }));

                setTrailers(Object.assign({}, ...trailersData));
            } catch (error) {
                console.error("Error fetching movies or trailers:", error);
                setMovies([]);
            }
        };

        getMovies();
    }, [endpoint, locale]);

    const truncateOverview = (overview: string) => {
        return overview.split(' ').slice(0, 20).join(' ') + '...';
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
                className="h-dvh w-full object-cover md:h-36-r"
            >
                {Array.isArray(movies) && movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <div>
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                    alt={movie.title}
                                    className=" h-dvh w-full object-cover md:h-36-r"
                                />
                                <div className="z-50 absolute bottom-[40px] md:bottom-[80px] p-4 left-0 right-0 mx-auto text-white flex w-11/12">
                                    <div className='flex-col space-y-3 items-start justify-start w-4/5 lg:w-2/5'>
                                        <Link href={`${locale}/${movie.id}`} className='font-bold text-3xl md:text-4xl lg:text-5xl'>{movie.title}</Link>
                                        <span className='flex items-center space-x-4'>
                                            <img src="/images/IMDB.svg" alt="IMDB" />
                                            <p>{movie.vote_average.toFixed(1)}/10</p>
                                            <img src="/images/Tomato.svg" alt="Ratings" />
                                            <p>{movie.popularity.toFixed(1)}</p>
                                        </span>
                                        <span className="block w-full text-justify">
                                            <p className="m-0">{truncateOverview(movie.overview)}</p>
                                        </span>
                                        <div>
                                            <a
                                                href={trailers[movie.id] || '#'}
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
                    ))
                ) : (
                    <div className="p-4 text-center">{messages.no_movies_found}</div>
                )}
            </Swiper>
            <div className="swiper-pagination flex flex-col absolute right-4 top-1/2 transform -translate-y-1/2 z-20 space-y-2"></div>
        </div>
    );
};

export default BannerSlider;
