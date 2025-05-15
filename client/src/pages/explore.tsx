import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import SkillCard from "@/components/skills/skill-card";
import { Skill, Category } from "@shared/schema";

const Explore = () => {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");
  
  // Extract category from URL params if present
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1]);
    const categoryParam = params.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);
  
  // Fetch categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Fetch skills with filters
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: [
      "/api/skills",
      selectedCategory ? `categoryId=${selectedCategory}` : "",
      searchQuery ? `q=${searchQuery}` : "",
    ],
  });
  
  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This would trigger the query with the search param
    console.log("Searching for:", searchQuery);
  };
  
  // Sort skills based on selected sort option
  const sortedSkills = skills ? [...skills].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "popular":
        return (b.views || 0) - (a.views || 0);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "duration":
        return a.duration - b.duration;
      default:
        return 0;
    }
  }) : [];

  return (
    <>
      <Helmet>
        <title>Explore Skills | Micro Learning</title>
        <meta name="description" content="Discover thousands of micro-skills across various categories. Learn new abilities in just 2 minutes and advance your career." />
      </Helmet>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Explore Skills</h1>
            <p className="text-neutral-600 mt-1">Discover new skills in just 2 minutes</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pr-10"
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Skills</SheetTitle>
                    <SheetDescription>
                      Narrow down skills based on your preferences
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Categories</h3>
                      <div className="space-y-2">
                        <Button 
                          variant={selectedCategory === null ? "default" : "outline"}
                          size="sm"
                          className="mr-2 mb-2"
                          onClick={() => setSelectedCategory(null)}
                        >
                          All
                        </Button>
                        {categories?.map((category) => (
                          <Button 
                            key={category.id}
                            variant={selectedCategory === category.id.toString() ? "default" : "outline"}
                            size="sm"
                            className="mr-2 mb-2"
                            onClick={() => setSelectedCategory(category.id.toString())}
                          >
                            {category.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Duration</h3>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="mr-2">Under 1 min</Button>
                        <Button variant="outline" size="sm" className="mr-2">1-2 mins</Button>
                        <Button variant="outline" size="sm">2+ mins</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Rating</h3>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="mr-2">4+ Stars</Button>
                        <Button variant="outline" size="sm">3+ Stars</Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button variant="outline">Reset</Button>
                      <Button>Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Select defaultValue={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="duration">Shortest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Active filters */}
        {selectedCategory && (
          <div className="mb-6 flex items-center">
            <span className="text-sm text-neutral-600 mr-2">Active filters:</span>
            <Badge variant="outline" className="flex items-center">
              {categories?.find(c => c.id.toString() === selectedCategory)?.name || "Category"}
              <button 
                className="ml-1 p-1" 
                onClick={() => setSelectedCategory(null)}
              >
                ×
              </button>
            </Badge>
          </div>
        )}
        
        {/* Skills grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 animate-pulse">
                <div className="h-40 bg-neutral-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-neutral-200 rounded w-1/3 mb-2"></div>
                  <div className="h-6 bg-neutral-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-neutral-200 rounded w-1/4"></div>
                    <div className="h-6 bg-neutral-200 rounded w-1/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : sortedSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-neutral-900 mb-2">No skills found</h3>
            <p className="text-neutral-600 mb-6">Try changing your search criteria or check back later for new content.</p>
            <Button onClick={() => {
              setSearchQuery("");
              setSelectedCategory(null);
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
