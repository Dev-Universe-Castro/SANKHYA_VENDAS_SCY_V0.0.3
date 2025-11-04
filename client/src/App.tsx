
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Empresas from "@/pages/empresas";
import Logs from "@/pages/logs";
import Configuracoes from "@/pages/configuracoes";
import NotFound from "@/pages/not-found";
import { Building2, LayoutDashboard, FileText, Settings, Lock } from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Empresas", url: "/empresas", icon: Building2 },
  { title: "Logs", url: "/logs", icon: FileText },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/sankhya-logo-horizontal.png" alt="Sankhya" className="h-16" />
          </div>

          {/* Horizontal Navigation */}
          <nav className="flex items-center gap-1">
            {navigationItems.map((item) => {
              const isActive = location === item.url;
              return (
                <button
                  key={item.title}
                  onClick={() => setLocation(item.url)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  data-testid={`nav-${item.title.toLowerCase()}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </button>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setLocation("/login");
              }}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              data-testid="button-logout"
            >
              <Lock className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}

function Router() {
  const [location, setLocation] = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirecionar para login se não autenticado
  if (!isAuthenticated && location !== "/login") {
    setLocation("/login");
    return null;
  }

  // Redirecionar para dashboard se já autenticado e tentar acessar login
  if (isAuthenticated && location === "/login") {
    setLocation("/");
    return null;
  }

  if (location === "/login") {
    return <Login />;
  }

  return (
    <AuthenticatedLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/empresas" component={Empresas} />
        <Route path="/logs" component={Logs} />
        <Route path="/configuracoes" component={Configuracoes} />
        <Route component={NotFound} />
      </Switch>
    </AuthenticatedLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
