import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { LoginPage } from "@/pages/login";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

function AppRouter() {
  const basePath = import.meta.env.DEV ? '/' : '/cnwk-goal-tracker/';
  return (
    <Router base={basePath}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const session = localStorage.getItem("authenticated");
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: any, password: any) => {
    const correctPassword = "Unsaid8-Appraiser0-Willing9-Enviable7-Revenue8";
    if (
      username.trim() === import.meta.env.VITE_USERNAME?.trim() &&
      password.trim() === correctPassword
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("authenticated", "true");
      toast({
        title: "Success",
        description: "Logged in successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <LoginPage onLogin={handleLogin} />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;