import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CategoryCard from "@/components/skills/category-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@shared/schema";

const CategoriesSection = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <section className="py-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-neutral-900">Popular Categories</h2>
        <Link 
          href="/categories"
          className="text-primary hover:text-primary-dark font-medium text-sm flex items-center mt-2 sm:mt-0"
        >
          View all categories
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {isLoading ? (
          // Loading skeletons
          Array(6).fill(0).map((_, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-4 rounded-xl">
              <Skeleton className="w-14 h-14 rounded-full mb-3" />
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))
        ) : (
          // Actual category cards
          categories?.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
