import { Route, Switch } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import SkillDetail from "@/pages/skill-detail";
import Explore from "@/pages/explore";
import Create from "@/pages/create";
import NotFound from "@/pages/not-found";
import { LanguageProvider } from "./context/language-context";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/explore" component={Explore} />
      <Route path="/skill/:id" component={SkillDetail} />
      <Route path="/create" component={Create} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-neutral-100">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
