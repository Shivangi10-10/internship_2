import { Link } from "wouter";
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z"/>
                <path fill="#0066CC" d="M12 4.5L7 7.5v4.5L12 15l5-3v-4.5L12 4.5z"/>
              </svg>
              <span className="ml-2 text-xl font-bold tracking-tight">Micro<span className="text-primary">Learning</span></span>
            </div>
            <p className="mt-4 text-neutral-400 text-sm">
              Learn fast, earn faster. Master in-demand skills through 2-minute tutorials and advance your career.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-neutral-400 hover:text-white transition-colors">Browse Categories</Link></li>
              <li><Link href="/trending" className="text-neutral-400 hover:text-white transition-colors">Trending Skills</Link></li>
              <li><Link href="/new" className="text-neutral-400 hover:text-white transition-colors">New Releases</Link></li>
              <li><Link href="/collections" className="text-neutral-400 hover:text-white transition-colors">Collections</Link></li>
              <li><Link href="/creators" className="text-neutral-400 hover:text-white transition-colors">Skill Creators</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-neutral-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/guidelines" className="text-neutral-400 hover:text-white transition-colors">Creator Guidelines</Link></li>
              <li><Link href="/forums" className="text-neutral-400 hover:text-white transition-colors">Community Forums</Link></li>
              <li><Link href="/api-docs" className="text-neutral-400 hover:text-white transition-colors">API Documentation</Link></li>
              <li><Link href="/become-creator" className="text-neutral-400 hover:text-white transition-colors">Become a Creator</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-neutral-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/press" className="text-neutral-400 hover:text-white transition-colors">Press</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-400 text-sm">
            &copy; {currentYear} MicroLearning. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/terms" className="text-neutral-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-neutral-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="text-neutral-400 hover:text-white text-sm transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
