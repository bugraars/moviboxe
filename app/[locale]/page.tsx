// components/Page.tsx
import Layout from "../layout";
import MovieSlider from "@/components/movieSlider/page";
import VideoSlider from "@/components/videoSlider/page";
import SearchSlider from "@/components/searchSlider/page";
import BannerSlider from "@/components/bannerSlider/page";


const Page = () => {
  return (
    <Layout>
      <BannerSlider endpoint="popular" title="Banner Movies" id="banner" />
      <SearchSlider title="Search Results" id="searchResults" />
      <MovieSlider endpoint="popular" title="Featured Movies" id="featured" />
      <MovieSlider endpoint="upcoming" title="New Arrivals" id="upcoming" />
      <VideoSlider endpoint="top_rated" title="Exclusive Videos" />
    </Layout>
  );
};

export default Page;
