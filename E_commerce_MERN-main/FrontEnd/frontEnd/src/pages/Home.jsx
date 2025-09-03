import React from 'react'
import Hero from '../components/Hero'
import FeaturedCategories from '../components/FeaturedCategories'
import TrendingProducts from '../components/TrendingProducts'
import BrandShowcase from '../components/BrandShowcase'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'

function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <TrendingProducts />
      <BrandShowcase />
      <OurPolicy />
      <NewLetterBox />
    </div>
  )
}

export default Home