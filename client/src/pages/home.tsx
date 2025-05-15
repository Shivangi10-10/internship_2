import { useEffect } from "react";
import { Helmet } from "react-helmet";
import HeroSection from "@/components/sections/hero-section";
import CategoriesSection from "@/components/sections/categories-section";
import TrendingSkillsSection from "@/components/sections/trending-skills-section";
import FeaturedSkillSection from "@/components/sections/featured-skill-section";
import AIFeatureSection from "@/components/sections/ai-feature-section";
import StatisticsSection from "@/components/sections/statistics-section";
import CallToAction from "@/components/sections/call-to-action";
import { useRecommendations } from "@/hooks/use-recommendations";

const Home = () => {
  // Example of using the recommendation system
  // In a real app, these would come from the authenticated user
  const { recommendedSkills } = useRecommendations({
    userId: 1,
    interests: ["programming", "design"]
  });

  // Log recommendations for demo purposes
  useEffect(() => {
    if (recommendedSkills) {
      console.log("AI Recommended Skills:", recommendedSkills);
    }
  }, [recommendedSkills]);
  
  return (
    <>
      <Helmet>
        <title>Micro Learning - Learn Skills in Minutes</title>
        <meta 
          name="description" 
          content="Master in-demand skills in just 2 minutes a day. Perfect for your freelance journey or next career leap." 
        />
      </Helmet>
      
      <HeroSection />
      <CategoriesSection />
      <TrendingSkillsSection />
      <FeaturedSkillSection />
      <AIFeatureSection />
      <StatisticsSection />
      <CallToAction />
    </>
  );
};

export default Home;
