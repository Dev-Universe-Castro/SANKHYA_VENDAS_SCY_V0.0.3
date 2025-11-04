import { useState } from "react";
import { useLocation } from "wouter";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Usuário estático
    const STATIC_USER = {
      email: "admin@sistema.com",
      password: "admin123",
      nome: "Administrador",
    };

    setTimeout(() => {
      if (email === STATIC_USER.email && password === STATIC_USER.password) {
        localStorage.setItem("token", "static-token-demo");
        localStorage.setItem("user", JSON.stringify({
          id: "1",
          email: STATIC_USER.email,
          nome: STATIC_USER.nome,
          perfil: "ADM",
        }));

        toast({
          title: "Login realizado",
          description: `Bem-vindo, ${STATIC_USER.nome}!`,
        });
        setLocation("/");
      } else {
        toast({
          title: "Erro",
          description: "Credenciais inválidas. Use: admin@sistema.com / admin123",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Panel - Form */}
      <div className="flex w-full flex-col justify-between bg-white p-6 sm:p-8 md:p-12 lg:w-5/12 lg:min-h-screen">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 lg:mb-0">
          <img src="/sankhya-logo-horizontal.png" alt="Sankhya" className="h-16 sm:h-20 md:h-24" />
        </div>

        {/* Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-500">Welcome Back, Please enter your details</p>
          </div>

          {/* Tabs */}
          <div className="mb-6 md:mb-8 flex gap-2 rounded-lg bg-gray-50 p-1">
            <button
              onClick={() => setActiveTab("signin")}
              className={`flex-1 rounded-md px-3 sm:px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === "signin"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 rounded-md px-3 sm:px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === "signup"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Signup
            </button>
          </div>

          {activeTab === "signin" ? (
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@sistema.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 sm:h-12 pl-10 sm:pl-12 text-sm sm:text-base"
                    data-testid="input-email"
                  />
                  {email && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
                      <div className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-green-500">
                        <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 sm:h-12 pl-10 sm:pl-12 text-sm sm:text-base"
                    data-testid="input-password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="h-11 sm:h-12 w-full bg-green-600 text-sm sm:text-base font-medium hover:bg-green-700" 
                disabled={loading}
              >
                {loading ? "Entrando..." : "Continue"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4 md:space-y-5 text-center text-gray-500">
              <p className="text-sm sm:text-base">Funcionalidade de cadastro em desenvolvimento.</p>
              <p className="text-xs sm:text-sm">Use as credenciais: admin@sistema.com / admin123</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-xs sm:text-sm text-gray-500 mt-8 lg:mt-0">
          <p>
            Gerencie sincronizações entre Sankhya e Oracle de forma centralizada. 
            <br className="hidden sm:block" />
            Acompanhe logs e configure empresas facilmente.
          </p>
        </div>
      </div>

      {/* Right Panel - Image/Illustration */}
      <div className="hidden lg:flex w-7/12 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 lg:items-center lg:justify-center">
        <div className="relative">
          {/* Safe/Vault Illustration using CSS */}
          <div className="relative h-80 w-80 xl:h-96 xl:w-96">
            {/* Background glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-200/40 to-green-300/40 blur-3xl"></div>

            {/* Safe body */}
            <div className="relative h-full w-full rounded-3xl bg-gradient-to-br from-emerald-400 to-green-500 shadow-2xl">
              {/* Safe door */}
              <div className="absolute inset-8 rounded-2xl bg-gradient-to-br from-emerald-300 to-green-400 shadow-inner">
                {/* Lock circle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="h-28 w-28 xl:h-32 xl:w-32 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg">
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-400 to-green-500"></div>
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>

                    {/* Lock handle */}
                    <div className="absolute left-1/2 top-1/2 h-16 w-2 xl:h-20 xl:w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-emerald-600 to-green-700 shadow-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}