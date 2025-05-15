import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { 
  Play, 
  Bookmark, 
  BookmarkCheck,
  Share2, 
  MessageSquare,
  ThumbsUp,
  User, 
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useTranslate } from "@/hooks/use-translate";
import { useLanguage } from "@/context/language-context";
import { useRecommendations } from "@/hooks/use-recommendations";
import { apiRequest } from "@/lib/queryClient";
import { Skill, Category } from "@shared/schema";
import SkillCard from "@/components/skills/skill-card";

const SkillDetail = () => {
  const { id } = useParams<{ id: string }>();
  const skillId = parseInt(id);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Fetch skill data
  const { data: skill, isLoading: isLoadingSkill } = useQuery<Skill>({
    queryKey: [`/api/skills/${skillId}`],
    enabled: !isNaN(skillId)
  });
  
  // Fetch category data if we have a skill
  const { data: category } = useQuery<Category>({
    queryKey: [`/api/categories/${skill?.categoryId}`],
    enabled: !!skill
  });
  
  // Get recommendations based on this skill
  const { recommendedSkills, isLoading: isLoadingRecommendations } = useRecommendations({
    userId: 1, // Hardcoded for demo
    watchedSkillIds: skill ? [skill.id] : [],
    limit: 3
  });
  
  // Check if skill is bookmarked
  useEffect(() => {
    const checkIfBookmarked = async () => {
      try {
        // In a real app, this would call an API to check if bookmarked
        setIsBookmarked(false);
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };
    
    if (skill) {
      checkIfBookmarked();
    }
  }, [skill]);
  
  // Handle bookmark toggling
  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      if (isBookmarked) {
        await apiRequest("DELETE", `/api/users/1/saved-skills/${skillId}`, null);
        return false;
      } else {
        await apiRequest("POST", "/api/saved-skills", {
          userId: 1,
          skillId
        });
        return true;
      }
    },
    onSuccess: (newState) => {
      setIsBookmarked(newState);
      toast({
        title: newState ? "Skill saved" : "Skill removed",
        description: newState 
          ? "This skill has been added to your saved list" 
          : "This skill has been removed from your saved list"
      });
    },
    onError: () => {
      toast({
        title: "Action failed",
        description: "There was a problem updating your saved skills",
        variant: "destructive"
      });
    }
  });
  
  // Use translate hook for content
  const { text: translatedTitle } = useTranslate(skill?.title || "");
  const { text: translatedDescription } = useTranslate(skill?.description || "");
  
  if (isLoadingSkill) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="aspect-video bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }
  
  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Skill not found</h1>
        <p className="mb-6">The skill you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/explore">Browse Skills</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{skill.title} | Micro Learning</title>
        <meta name="description" content={skill.description} />
      </Helmet>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm text-neutral-600">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          {category && (
            <>
              <Link href={`/explore?category=${category.id}`} className="hover:text-primary">{category.name}</Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-neutral-900 font-medium">{skill.title}</span>
        </div>
        
        {/* Title and actions */}
        <div className="mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              {category && (
                <Badge 
                  variant="outline" 
                  className="mb-2"
                  style={{ 
                    backgroundColor: `${category.color}20`, 
                    color: category.color 
                  }}
                >
                  {category.name}
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">{translatedTitle}</h1>
              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Creator Name
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {Math.floor(skill.duration / 60)}:{String(skill.duration % 60).padStart(2, '0')} mins
                </span>
                <span className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {skill.rating || 0}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => bookmarkMutation.mutate()}>
                {isBookmarked ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                {isBookmarked ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
        
        {/* Video player */}
        <div className="relative aspect-video bg-black rounded-lg mb-8 overflow-hidden">
          {skill.videoUrl ? (
            <video 
              src={skill.videoUrl} 
              controls 
              poster={skill.thumbnailUrl}
              className="w-full h-full object-cover"
            ></video>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Button size="lg" className="rounded-full h-16 w-16">
                <Play className="h-8 w-8" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Content tabs */}
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="discussion">
              Discussion <Badge variant="outline" className="ml-2">3</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="py-4">
            <p className="text-neutral-700 whitespace-pre-line">{translatedDescription}</p>
            
            {skill.tags && skill.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-neutral-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-neutral-100 text-neutral-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources" className="py-4">
            <p className="text-neutral-600 mb-4">Additional resources to help you master this skill:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700">
              <li><a href="#" className="text-primary hover:underline">Downloadable cheat sheet</a></li>
              <li><a href="#" className="text-primary hover:underline">Practice exercises</a></li>
              <li><a href="#" className="text-primary hover:underline">Further reading</a></li>
            </ul>
          </TabsContent>
          
          <TabsContent value="discussion" className="py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Comments (3)</h3>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Comment
              </Button>
            </div>
            <div className="space-y-4">
              <div className="bg-neutral-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="User" 
                    className="w-8 h-8 rounded-full mr-2" 
                  />
                  <div>
                    <p className="text-sm font-medium">Michael Ross</p>
                    <p className="text-xs text-neutral-500">2 days ago</p>
                  </div>
                </div>
                <p className="text-neutral-700">This was super helpful! I've been struggling with this concept for weeks.</p>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="User" 
                    className="w-8 h-8 rounded-full mr-2" 
                  />
                  <div>
                    <p className="text-sm font-medium">Emma Wilson</p>
                    <p className="text-xs text-neutral-500">5 days ago</p>
                  </div>
                </div>
                <p className="text-neutral-700">Great explanation! Could you recommend any follow-up skills to learn next?</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-10" />
        
        {/* Recommended skills */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingRecommendations ? (
              // Loading skeletons
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                  <div className="h-40 bg-neutral-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-4 bg-neutral-200 rounded w-1/3 mb-2 animate-pulse"></div>
                    <div className="h-6 bg-neutral-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-4 animate-pulse"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-neutral-200 rounded w-1/4 animate-pulse"></div>
                      <div className="h-6 bg-neutral-200 rounded w-1/6 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              recommendedSkills?.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillDetail;
