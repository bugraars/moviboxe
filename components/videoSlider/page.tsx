'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { fetchMovies } from '@/api/fetchMovies';
import fetchVideos from '@/api/fetchVideos';
import { Movie } from '@/types/movie';
import './style.css';
import { useTranslation } from '@/context/translationContext';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface VideoSliderProps {
    endpoint: string;
    title: string;
}

const VideoSlider: React.FC<VideoSliderProps> = ({ endpoint, title }) => {
    const [videos, setVideos] = useState<Movie[]>([]);
    const [trailers, setTrailers] = useState<{ [key: number]: string }>({});
    const locale = Cookies.get('NEXT_LOCALE') || 'en';
    const { messages } = useTranslation();

    useEffect(() => {
        const getVideos = async () => {
            try {
                const movies = await fetchMovies(endpoint);
                setVideos(movies.slice(0, 5)); // İlk 5 videoyu alıyoruz
                const trailersData = await Promise.all(movies.slice(0, 5).map(async (movie: any) => {
                    const trailer = await fetchVideos(movie.id.toString(), locale);
                    return { [movie.id]: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '#' };
                }));

                setTrailers(Object.assign({}, ...trailersData));
            } catch (error) {
                console.error("Error fetching videos:", error);
                setVideos([]);
            }
        };

        getVideos();
    }, [endpoint, locale]);

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
                        640: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 2.5,
                            spaceBetween: 40,
                        },
                    }}
                    navigation={{
                        nextEl: '.video-swiper-button-next',
                        prevEl: '.video-swiper-button-prev',
                    }}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                // className="custom-swiper"
                >
                    {Array.isArray(videos) && videos.length > 0 ? (
                        videos.map((video, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative flex flex-col w-full">
                                    <div className='flex items-center '>
                                        <img src={`https://image.tmdb.org/t/p/w500${video.backdrop_path}`} alt={video.title} className="w-full h-auto" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <a
                                                href={trailers[video.id] || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {/* Vercel svg hatasını aşmak için manuel eklendi */}
                                                <div className="w-14 h-14">
                                                    <svg width="56px" height="56px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                        <g id="SVGRepo_iconCarrier">
                                                            <circle cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="1.5" />
                                                            <path d="M15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868L9 9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941Z" stroke="#ffffff" stroke-width="1.5" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w-full text-center mt-2">
                                        <h3 className="text-lg font-semibold">{video.title}</h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="p-4 text-center">{messages.no_videos_found}</div>
                    )}
                </Swiper>
                <div className="swiper-navigation md:flex hidden">
                    <div className="swiper-button-prev video-swiper-button-prev"></div>
                    <div className="swiper-button-next video-swiper-button-next"></div>
                </div>
            </div>
        </div>
    );
};

export default VideoSlider;
