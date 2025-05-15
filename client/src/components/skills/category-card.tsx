import { Link } from "wouter";
import type { Category } from "@shared/schema";
import { 
  LayoutGrid, Play, Film, Utensils, PaintBucket, Languages, Megaphone 
} from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  // Map category icons to Lucide components
  const getIcon = () => {
    switch (category.icon) {
      case "laptop-code":
        return <LayoutGrid className="text-xl" />;
      case "film":
        return <Film className="text-xl" />;
      case "utensils":
        return <Utensils className="text-xl" />;
      case "paint-brush":
        return <PaintBucket className="text-xl" />;
      case "language":
        return <Languages className="text-xl" />;
      case "bullhorn":
        return <Megaphone className="text-xl" />;
      default:
        return <Play className="text-xl" />;
    }
  };

  return (
    <Link 
      href={`/explore?category=${category.id}`}
      className="category-card flex flex-col items-center bg-white hover:bg-neutral-100 p-4 rounded-xl transition duration-300"
    >
      <div 
        className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
        style={{ 
          backgroundColor: `${category.color}20`,
          color: category.color 
        }}
      >
        {getIcon()}
      </div>
      <h3 className="text-neutral-900 font-medium text-center">{category.name}</h3>
      <p className="text-neutral-600 text-xs mt-1 text-center">Explore skills</p>
    </Link>
  );
};

export default CategoryCard;
