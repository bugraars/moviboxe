// components/BannerSlider.tsx
'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';
import { Movie } from '@/types/movie';
import { useSearch } from '@/context/searchContext';

const BannerSlider: React.FC = () => {
    const { results } = useSearch();
    
    const pagination = {
        clickable: true,
        renderBullet: (index: number, className: string) => {
            return `<span class="${className} custom-bullet">${index + 1}</span>`;
        },
    };

    return (
        <div className="relative">
            <Swiper
                direction="vertical"
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                }}
                pagination={pagination}
                modules={[Navigation, Autoplay, Pagination]}
                className="z-0"
            >
                {results.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <div>
                            <img
                                src={movie.backdrop_path}
                                alt={movie.title}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-pagination flex flex-col absolute right-4 top-1/2 transform -translate-y-1/2 z-20 space-y-2"></div>
        </div>
    );
};

export default BannerSlider;
