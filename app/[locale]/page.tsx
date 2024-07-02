import BannerSlider from "@/components/bannerSlider/page";
import Layout from "../layout";
import MovieSlider from "@/components/movieSlider/page";
import VideoSlider from "@/components/videoSlider/page";
import SearchSlider from "@/components/searchSlider/page";

const Page = () => {
  return (
    <Layout>
      <div className="w-full h-96 bg-black">
        {/* <BannerSlider /> */}
      </div>
      <SearchSlider title="Search Results" id="searchResults" />
      <MovieSlider endpoint="popular" title="Featured Movies" id="featured" />
      <MovieSlider endpoint="upcoming" title="New Arrivals" id="upcoming" />
      <VideoSlider endpoint="top_rated" title="Exclusive Videos" />
    </Layout>
  );
};

export default Page;
