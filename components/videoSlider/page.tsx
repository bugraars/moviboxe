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

interface VideoSliderProps {
    endpoint: string;
    title: string;
}

const VideoSlider: React.FC<VideoSliderProps> = ({ endpoint, title }) => {
    const [videos, setVideos] = useState<Movie[]>([]);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const videos = await fetchMovies(endpoint);
                setVideos(videos);
            } catch (error) {
                console.error("Error fetching videos:", error);
                setVideos([]);
            }
        };

        getVideos();
    }, [endpoint]);

    return (
        <div className="m-8">
            <div className='m-5 flex justify-between items-center'>
                <h3 className="font-bold text-xl md:text-3xl">{title}</h3>
                <a href="#" className='text-red-700 flex items-center'>See more <img src="/images/Chevron right.svg" alt="right arrow" /></a>
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
                    className="custom-swiper"
                    
                >
                    {Array.isArray(videos) && videos.length > 0 ? (
                        videos.map((video, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative flex flex-col w-full">
                                    <div className='flex items-center '>
                                        <img src={`https://image.tmdb.org/t/p/w500${video.backdrop_path}`} alt={video.title} className="w-full h-auto" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <img src="/images/play 2.svg" alt="Play icon" className="w-12 h-12" />
                                        </div>
                                    </div>
                                    <div className="w-full text-center mt-2">
                                        <h3 className="text-lg font-semibold">{video.title}</h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="p-4 text-center">No videos found</div>
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
