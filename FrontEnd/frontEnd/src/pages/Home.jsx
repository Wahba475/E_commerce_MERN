import React from 'react'
import Hero from '../components/Hero'
import TrendingProducts from '../components/TrendingProducts'
import OurPolicy from '../components/OurPolicy'
import Footer from '../components/Footer'
import NewLetterBox from '../components/NewLetterBox'

function Home() {
  return (
    <div>
      <Hero />
      <TrendingProducts />
      <OurPolicy />
      <NewLetterBox />
     
    </div>
  )
}

export default Home