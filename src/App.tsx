import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/oxygene-liquide" element={<ProductPage />} />
          <Route path="/concentrateur-doxygene" element={<ProductPage />} />
          <Route path="/les-ppc" element={<ProductPage />} />
          <Route path="/vni" element={<ProductPage />} />
          <Route path="/les-masques-respiratoires" element={<ProductPage />} />
          <Route path="/autres-produits" element={<ProductPage />} />
          <Route path="/cpap-maroc" element={<ProductPage />} />
          <Route path="/apnee-du-sommeil-maroc" element={<ProductPage />} />
          <Route path="/oxygenotherapie-a-domicile" element={<ProductPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
