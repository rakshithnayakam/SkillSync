import React from 'react'
import Navbar from '../components/Navbar.jsx'
import HeroSection from '../components/HeroSection.jsx'
import FeatureHighlights from '../components/FeatureHighlights.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import ExploreSkills from '../components/ExploreSkills.jsx'
import StatsBanner from '../components/StatsBanner.jsx'
import PopularExchanges from '../components/PopularExchanges.jsx'
import TestimonialSection from '../components/TestimonialSection.jsx'
import GamificationSection from '../components/GamificationSection.jsx'
import FAQSection from '../components/FAQSection.jsx'
import CTABanner from '../components/CTABanner.jsx'
import Footer from '../components/Footer.jsx'

const LandingPage = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <FeatureHighlights/>
        <HowItWorks/>
        <ExploreSkills/>
        <StatsBanner/>
        <PopularExchanges/>
        <TestimonialSection/>
        <GamificationSection/>
        
        <FAQSection/>
        <CTABanner/>
        <Footer/>
    </div>
  )
}

export default LandingPage
