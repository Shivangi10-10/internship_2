import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PlayCircle, Upload } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Learn Fast, Earn Faster</h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8">Master in-demand skills in just 2 minutes a day. Perfect for your freelance journey or next career leap.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-white hover:bg-neutral-100 text-primary"
              >
                <Link href="/explore">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Learning
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="bg-transparent hover:bg-white/10 text-white border-white"
              >
                <Link href="/create">
                  <Upload className="mr-2 h-5 w-5" />
                  Share Your Knowledge
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center text-blue-100">
              <div className="flex -space-x-2">
                <img 
                  className="w-8 h-8 rounded-full border-2 border-primary" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                  alt="User profile" 
                />
                <img 
                  className="w-8 h-8 rounded-full border-2 border-primary" 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                  alt="User profile" 
                />
                <img 
                  className="w-8 h-8 rounded-full border-2 border-primary" 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                  alt="User profile" 
                />
              </div>
              <span className="ml-3 text-sm md:text-base">Join 100K+ professionals & creators</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
              alt="People learning together" 
              className="rounded-lg shadow-xl" 
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-100 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
