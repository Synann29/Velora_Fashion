import React from 'react';

import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Categories from '../sections/Categories';
import TopSellers from '../sections/TopSellers';
import PromoBanner from '../sections/PromoBanner';
import DealsOfTheDay from '../sections/DealsOfTheDay';
import InstagramFeed from '../sections/InstagramFeed';
import Testimonial from '../sections/Testimonial';
import Blogs from '../sections/Blogs';
import FAQ from '../sections/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <TopSellers />
      <PromoBanner />
      <DealsOfTheDay />
      <InstagramFeed />
      <Testimonial />
      <Blogs />
      <FAQ />
    </>
  );
}