import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Languages, BrainCircuit, Bot } from "lucide-react";

const AIFeatureSection = () => {
  const features = [
    {
      icon: <Languages className="text-xl" />,
      title: "Multilingual Support",
      description: "Our AI automatically translates content into 50+ languages, making skills accessible globally."
    },
    {
      icon: <BrainCircuit className="text-xl" />,
      title: "Smart Recommendations",
      description: "Get personalized skill suggestions based on your interests, learning history, and career goals."
    },
    {
      icon: <Bot className="text-xl" />,
      title: "AI Learning Assistant",
      description: "Get instant answers to your questions and additional resources as you learn new skills."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Powered by AI</h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">Our platform uses advanced AI to enhance your learning experience and help you acquire skills faster.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button asChild className="bg-white hover:bg-neutral-100 text-primary font-medium">
            <Link href="/ai-features">
              Explore AI Features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 right-0 opacity-20">
        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="white" d="M39.5,-65.3C52.9,-56.7,66.8,-49.2,76.7,-37.1C86.6,-25,92.6,-8.4,90.7,7.1C88.8,22.7,79.1,37.3,67.8,49.9C56.5,62.5,43.5,73.1,28.8,78.3C14.1,83.4,-2.3,83.1,-18.8,79.7C-35.3,76.3,-51.8,69.7,-64.4,58.2C-77.1,46.7,-85.9,30.2,-88.4,12.8C-90.9,-4.6,-87.1,-23,-78.7,-38.1C-70.2,-53.2,-57.1,-65,-42.7,-73.2C-28.3,-81.3,-12.6,-85.8,0.8,-86.9C14.1,-88.1,26.1,-73.9,39.5,-65.3Z" transform="translate(100 100)" />
        </svg>
      </div>
    </section>
  );
};

export default AIFeatureSection;
