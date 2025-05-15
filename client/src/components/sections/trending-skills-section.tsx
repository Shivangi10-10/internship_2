import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SkillCard from "@/components/skills/skill-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Skill, Category } from "@shared/schema";

const TrendingSkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills", selectedCategory ? `category=${selectedCategory}` : "trending=true"],
  });

  return (
    <section className="py-10 bg-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-2xl font-bold text-neutral-900">Trending Skills</h2>
          <div className="flex space-x-2 mt-4 sm:mt-0 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              className={`rounded-full text-sm whitespace-nowrap ${
                selectedCategory === null ? "bg-primary" : "bg-white"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories?.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category.id ? "bg-primary" : "bg-white hover:bg-neutral-200"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                <Skeleton className="w-full h-40" />
                <div className="p-4">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Actual skill cards
            skills?.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingSkillsSection;
