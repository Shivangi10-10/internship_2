import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Skill, Category } from "@shared/schema";

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const { data: category } = useQuery<Category>({
    queryKey: [`/api/categories/${skill.categoryId}`],
  });

  // Format duration to MM:SS
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="skill-card overflow-hidden shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <Link href={`/skill/${skill.id}`} className="block">
        <img 
          src={skill.thumbnailUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=340"} 
          alt={skill.title} 
          className="w-full h-40 object-cover"
        />
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            {category && (
              <Badge 
                variant="outline" 
                className={`bg-opacity-10 text-xs py-1 px-2 rounded-full`}
                style={{ 
                  backgroundColor: `${category.color}20`, 
                  color: category.color 
                }}
              >
                {category.name}
              </Badge>
            )}
            <h3 className="mt-2 text-lg font-medium text-neutral-900 line-clamp-2">
              <Link href={`/skill/${skill.id}`}>
                {skill.title}
              </Link>
            </h3>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-neutral-600">{formatDuration(skill.duration)}</span>
          </div>
        </div>

        <p className="mt-2 text-neutral-600 text-sm line-clamp-2">{skill.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* This would come from the user data */}
            <img 
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
              alt="Author" 
              className="w-6 h-6 rounded-full" 
            />
            <span className="ml-2 text-xs text-neutral-600">Creator</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-neutral-600 mr-3 flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {skill.views || 0}
            </span>
            <span className="text-xs text-neutral-600 flex items-center">
              <Star className="h-3 w-3 mr-1 text-yellow-400" fill="#F59E0B" />
              {skill.rating || 0}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
