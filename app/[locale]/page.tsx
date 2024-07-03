// components/Page.tsx
'use client';
import React, { useState, useEffect } from "react";
import Layout from "../layout";
import MovieSlider from "@/components/movieSlider/page";
import VideoSlider from "@/components/videoSlider/page";
import SearchSlider from "@/components/searchSlider/page";
import BannerSlider from "@/components/bannerSlider/page";
import Skeleton from '@/components/skeleton/page'; 

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Layout>
      <BannerSlider endpoint="popular" title="banner_movies" id="banner" />
      <SearchSlider title="search_results" id="searchResults" />
      <MovieSlider endpoint="popular" title="featured_movies" id="featured" />
      <MovieSlider endpoint="upcoming" title="new_arrivals" id="upcoming" />
      <VideoSlider endpoint="top_rated" title="exclusive_videos" />
    </Layout>
  );
};

export default Page;
