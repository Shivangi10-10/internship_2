import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertSkillSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Category } from "@shared/schema";

// Extend the insertSkillSchema for form validation
const uploadFormSchema = insertSkillSchema.extend({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  videoUrl: z.string().url("Must be a valid URL"),
  tags: z.string().transform(value => value.split(",").map(tag => tag.trim())),
});

// Type for the form values
type UploadFormValues = z.infer<typeof uploadFormSchema>;

const UploadForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get categories for the dropdown
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Form setup with zod validation
  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      duration: 120, // Default to 2 minutes
      categoryId: undefined,
      userId: 1, // Hardcoded for demo
      tags: "",
    },
  });

  // Mutation for creating a skill
  const createSkillMutation = useMutation({
    mutationFn: async (data: UploadFormValues) => {
      const res = await apiRequest("POST", "/api/skills", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your skill has been published.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to publish skill. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: UploadFormValues) => {
    // Simulate file upload first (in a real app, this would handle actual file upload)
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      // Then create the skill
      createSkillMutation.mutate(data);
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Upload Your Micro-Learning Content</h3>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Title</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Quick Mobile Photography Tips" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value))} 
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Briefly describe what users will learn" 
                        className="resize-none" 
                        rows={3} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="E.g., photography, mobile, lighting (comma separated)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="E.g., https://example.com/video.mp4" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div>
            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <CloudUpload className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-medium text-neutral-900 mb-2">Upload Your Video</h4>
              <p className="text-neutral-600 mb-6">Drag and drop your video file here or click to browse</p>
              <p className="text-neutral-500 text-sm mb-4">Maximum file size: 200MB (2 minutes max)</p>
              <Button type="button" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Select File"}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="button" variant="outline" className="mr-4">
            Save Draft
          </Button>
          <Button 
            type="submit" 
            disabled={createSkillMutation.isPending || isUploading}
          >
            {createSkillMutation.isPending ? "Publishing..." : "Publish Skill"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UploadForm;
