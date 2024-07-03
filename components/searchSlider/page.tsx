'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useSearch } from '../../context/searchContext';
import './style.css';
import Link from 'next/link';
import { useTranslation } from '@/context/translationContext';

interface SearchSliderProps {
  title: string;
  id: string;
}

const SearchSlider: React.FC<SearchSliderProps> = ({ title, id }) => {
  const { results } = useSearch();
  const { messages, locale } = useTranslation();

  if (results.length === 0) {
    return null;
  }

  const getGenreNames = (genreIds: number[] = []): string[] => {
    return genreIds.map(id => messages.genres[id.toString()] || 'Unknown');
  };

  return (
    <div className="m-8">
      <div className='m-5 flex justify-between items-center'>
        <h3 className="font-bold text-xl md:text-3xl">{messages[title]}</h3>
      </div>
      <div className="relative">
        <Swiper
          spaceBetween={10}
          slidesPerView={1.2}
          breakpoints={{
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
          // className="custom-swiper"
        >
          {Array.isArray(results) && results.length > 0 ? (
  results.map((movie, index) => (
    <SwiperSlide key={index}>
      <div className="flex flex-col items-center">
        <div className="poster-container">
          <Link href={`/${locale}/${movie.id}`}>
            <img
              src={movie.poster}
              alt={movie.title}
              className="movie-poster cursor-pointer"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.svg';
                e.currentTarget.classList.add('error-poster');
              }}
            />
          </Link>
        </div>
        <div className="w-full text-center mt-2">
          <small className="text-xs font-bold text-c-gray">{movie.release_date?.split('-')[0]}</small>
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
  <div className="p-4 text-center">{messages.no_results_found}</div>
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

export default SearchSlider;
