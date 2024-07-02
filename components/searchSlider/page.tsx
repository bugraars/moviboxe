'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useSearch } from '../../context/searchContext';
import './style.css';

interface SearchSliderProps {
  title: string;
  id: string; // Unique ID for each slider
}

const SearchSlider: React.FC<SearchSliderProps> = ({ title, id }) => {
  const { results } = useSearch();

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="m-8">
      <div className='m-5 flex justify-between items-center'>
        <h3 className="font-bold text-xl md:text-3xl">{title}</h3>
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
          className="custom-swiper"
        >
          {Array.isArray(results) && results.length > 0 ? (
            results.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center">
                  <div className="poster-container">
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      className="movie-poster" 
                      onError={(e) => {
                        e.currentTarget.src = ''; 
                        e.currentTarget.style.display = 'none'; // Hata durumunda resmi gizle
                        const fallbackDiv = document.createElement('div');
                        fallbackDiv.className = 'fallback-poster';
                        e.currentTarget.parentElement?.appendChild(fallbackDiv);
                      }}
                    />
                  </div>
                  <div className="w-full text-center mt-2">
                    <small className="text-xs font-bold text-c-gray">{movie.release_date?.split('-')[0]}</small>
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <div className='flex justify-between'>
                      <span className='flex'><img src="/images/IMDB.svg" alt="IMDB" /><p className='text-xs mx-1'>{movie.vote_average}</p></span>
                    </div>
                    <p className="my-2 text-xs font-bold text-c-gray">{movie.genres.join(', ')}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="p-4 text-center">No movies found</div>
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
