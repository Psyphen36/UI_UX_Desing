import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, Mail, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // 🧪 Dummy login for frontend-only dev (fallback mode)
      const isFrontendOnlyMode = import.meta.env.VITE_FAKE_AUTH === "true";
      console.log("VITE_FAKE_AUTH:", import.meta.env.VITE_FAKE_AUTH);

      if (isFrontendOnlyMode) {
        let dummyUser = null;
        let redirectPath = "/dashboard";

        if (email === "admin@admin.com" && password === "administrator") {
          dummyUser = {
            id: "1",
            email,
            name: "Admin",
            role: "admin",
            username: email,
          };
          redirectPath = "/admin";
        } else if (email === "user@user.com" && password === "testing") {
          dummyUser = {
            id: "2",
            email,
            name: "User",
            role: "user",
            username: email,
          };
          redirectPath = "/dashboard";
        } else {
          throw new Error("Invalid test credentials");
        }

        // ✅ Set context and then defer navigation after update
        localStorage.setItem("user", JSON.stringify(dummyUser));
        if (typeof setUser === "function") {
          setUser(dummyUser);
          // Delay navigation to allow context update to propagate
          setTimeout(() => {
            navigate(redirectPath);
          }, 0);
        }

        return;
      }


      // ✅ Real login (backend available)
      await login(email, password);

      const isAdmin = email.includes("admin");
      navigate(isAdmin ? "/admin" : "/dashboard");

    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Something went wrong during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ChatBot Hub
            </span>
          </Link>
        </div>

        <Card className="card-hover border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue building amazing chatbots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="btn-gradient w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up for free
                </Link>
              </p>
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-3 border border-border bg-background hover:bg-accent transition rounded-md py-2"
              onClick={() => {
                window.location.href = import.meta.env.VITE_DISCORD_LOGIN_URL || "http://localhost:8080/api/auth/discord/login";
              }}
            >
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-white-icon.png"
                alt="Discord Logo"
                className="h-5 w-5"
              />
              <span className="font-medium text-sm">Continue with Discord</span>
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
