import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Skill } from "@shared/schema";

interface RecommendationOptions {
  userId: number;
  watchedSkillIds?: number[];
  interests?: string[];
  limit?: number;
}

export const useRecommendations = ({
  userId,
  watchedSkillIds = [],
  interests = [],
  limit = 4
}: RecommendationOptions) => {
  
  // Use React Query to get recommendations
  const {
    data: recommendedSkills,
    isLoading,
    error
  } = useQuery<Skill[]>({
    queryKey: [`/api/recommend/${userId}`, watchedSkillIds, interests, limit],
    queryFn: async () => {
      try {
        const response = await apiRequest("POST", "/api/recommend", {
          userId,
          skillIds: watchedSkillIds,
          interests,
          limit
        });
        
        const data = await response.json();
        return data.slice(0, limit);
      } catch (error) {
        console.error("Failed to get recommendations:", error);
        throw error;
      }
    },
    // Only run if we have a valid userId
    enabled: userId > 0,
    // Cache recommendations for 10 minutes
    staleTime: 10 * 60 * 1000
  });
  
  return {
    recommendedSkills,
    isLoading,
    error
  };
};
