import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import UploadForm from "@/components/upload/upload-form";

const Create = () => {
  const [selectedTab, setSelectedTab] = useState("upload");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <>
      <Helmet>
        <title>Share Your Knowledge | Micro Learning</title>
        <meta 
          name="description" 
          content="Upload your own micro-learning content and share your skills with thousands of professionals." 
        />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Share Your Expertise</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Have a skill that can help others? Create a 2-minute tutorial and share it with our community of learners.
          </p>
        </motion.div>

        <Tabs defaultValue="upload" onValueChange={setSelectedTab} className="mb-8">
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger value="upload" className="flex-1">Upload Content</TabsTrigger>
            <TabsTrigger value="guidelines" className="flex-1">Creator Guidelines</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white rounded-xl shadow-md overflow-hidden border-0">
                <CardContent className="p-6 md:p-8">
                  <UploadForm />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="guidelines">
            <motion.div
              key="guidelines"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white rounded-xl shadow-md overflow-hidden border-0">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">Content Creation Guidelines</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">Keep it concise</h3>
                      <p className="text-neutral-600">
                        All tutorials should be 2 minutes or less. Focus on teaching one specific skill or technique clearly and efficiently.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">Maintain quality</h3>
                      <p className="text-neutral-600">
                        Use good lighting and clear audio. Make sure your demonstrations are easy to follow and visually clear.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">Be specific with your title and description</h3>
                      <p className="text-neutral-600">
                        Your title should clearly state what skill you're teaching. The description should outline what viewers will learn.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">Focus on practical skills</h3>
                      <p className="text-neutral-600">
                        Our community values actionable knowledge that helps them build their careers or businesses. Focus on practical applications.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">Add relevant tags</h3>
                      <p className="text-neutral-600">
                        Tags help users find your content. Include relevant keywords related to your skill.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button onClick={() => setSelectedTab("upload")} className="bg-primary hover:bg-primary/90">
                      Go to Upload
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16">
          <motion.div
            {...fadeIn}
            className="bg-neutral-100 rounded-xl p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Why Share on Micro Learning?</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Earn Revenue</h3>
                <p className="text-neutral-600">Popular creators can join our revenue sharing program. Earn money every time someone watches your tutorials.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Build Your Portfolio</h3>
                <p className="text-neutral-600">Showcase your expertise and build a professional portfolio that helps you land clients and jobs.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Grow Your Network</h3>
                <p className="text-neutral-600">Connect with professionals across different industries. Expand your network and find collaboration opportunities.</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          {...fadeIn}
          className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Share Your Knowledge?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of creators who are sharing their expertise and helping others build valuable skills.
          </p>
          <Button 
            onClick={() => setSelectedTab("upload")} 
            className="bg-white hover:bg-neutral-100 text-primary"
          >
            Start Creating
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default Create;
