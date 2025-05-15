import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { UserPlus, Play } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Level Up Your Skills?</h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Join thousands of professionals learning in-demand skills in just 2 minutes a day. Start your journey to freelance success!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            size="lg" 
            className="bg-white hover:bg-neutral-100 text-primary font-medium"
          >
            <Link href="/signup">
              <UserPlus className="mr-2 h-5 w-5" />
              Sign Up Free
            </Link>
          </Button>
          <Button 
            asChild
            size="lg" 
            variant="outline" 
            className="bg-transparent hover:bg-white/10 border border-white text-white"
          >
            <Link href="/explore">
              <Play className="mr-2 h-5 w-5" />
              Browse Skills
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
