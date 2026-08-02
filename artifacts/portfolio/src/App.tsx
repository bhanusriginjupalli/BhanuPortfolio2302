import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Roles from '@/components/sections/Roles';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Leadership from '@/components/sections/Leadership';
import Contact from '@/components/sections/Contact';
import AiCloneModal from '@/components/ui/AiCloneModal';

const queryClient = new QueryClient();

function Home() {
  const [aiCloneOpen, setAiCloneOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <Navbar onOpenAiClone={() => setAiCloneOpen(true)} />
      <main className="flex flex-col pt-24 pb-16">
        <Hero onOpenAiClone={() => setAiCloneOpen(true)} />
        <Experience />
        <Roles />
        <Skills />
        <Projects />
        <Leadership />
        <Contact />
      </main>
      <Footer />
      <AiCloneModal open={aiCloneOpen} onClose={() => setAiCloneOpen(false)} />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={() => <div className="p-8 text-center font-mono text-foreground bg-background min-h-screen">404: Route Not Found</div>} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
