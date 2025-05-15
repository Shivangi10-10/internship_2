import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Bookmark, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { Skill } from "@shared/schema";

const FeaturedSkillSection = () => {
  const { data: featuredSkill, isLoading } = useQuery<Skill>({
    queryKey: ["/api/skills/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-full max-w-md mb-4" />
            <Skeleton className="h-20 w-full max-w-lg mb-6" />
            <div className="space-y-4 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-4 w-full max-w-sm ml-3" />
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-12 w-36 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Skeleton className="h-64 md:h-80 w-full rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  if (!featuredSkill) {
    return null;
  }

  return (
    <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div 
          className="order-2 md:order-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-medium">Featured Skill</span>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-2">{featuredSkill.title}</h2>
          <p className="mt-4 text-neutral-600 text-base md:text-lg">{featuredSkill.description}</p>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-start">
              <CheckCircle className="flex-shrink-0 h-6 w-6 text-secondary" />
              <p className="ml-3 text-neutral-600">Generate professional quality content in seconds</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="flex-shrink-0 h-6 w-6 text-secondary" />
              <p className="ml-3 text-neutral-600">Learn prompt engineering techniques</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="flex-shrink-0 h-6 w-6 text-secondary" />
              <p className="ml-3 text-neutral-600">Master AI tools across different platforms</p>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              size="lg" 
              className="bg-primary hover:bg-primary/90"
            >
              <Link href={`/skill/${featuredSkill.id}`}>
                <Play className="mr-2 h-5 w-5" />
                Watch Now ({Math.floor(featuredSkill.duration / 60)}:{String(featuredSkill.duration % 60).padStart(2, '0')})
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900"
            >
              <Link href="#">
                <Bookmark className="mr-2 h-5 w-5" />
                Save for Later
              </Link>
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="order-1 md:order-2 relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={featuredSkill.thumbnailUrl || "https://pixabay.com/get/g6190c2053da859b74d6e5b121f06e31ec957649e0a7a9c71857e91367225855058b82db0e00352fe8a663a4674679564caa7eee1eb205cc882e45bf68e95ba2c_1280.jpg"} 
            alt={featuredSkill.title} 
            className="rounded-xl shadow-lg w-full" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              size="icon"
              className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary text-2xl hover:scale-110 transition-transform"
              asChild
            >
              <Link href={`/skill/${featuredSkill.id}`}>
                <Play className="h-8 w-8" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSkillSection;
