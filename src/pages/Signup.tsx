
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";


const Signup = () => {
  const {signup} = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signup(formData.name, formData.email, formData.password);

      toast({
        title: "Account created!",
        description: "You are now logged in.",
      });

      navigate("/dashboard"); // or "/login" if you don't auto-login after signup
    } catch (err: any) {
      toast({
        title: "Signup failed",
        description: err?.response?.data?.detail || "Something went wrong. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const features = [
    "Create unlimited chatbots",
    "Connect to 10+ platforms",
    "Advanced analytics dashboard",
    "24/7 customer support"
  ];

  return (
    <div className="min-h-screen flex lg:flex-row flex-col">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8">
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
              <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
              <CardDescription>
                Start building AI chatbots in minutes. No credit card required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
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
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="btn-gradient w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    <>
                      Create Free Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="flex-1 bg-gradient-primary p-8 lg:p-12 flex items-center justify-center">
        <div className="max-w-md text-white animate-slide-in">
          <h2 className="text-3xl font-bold mb-6">
            Join thousands of businesses automating customer engagement
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Start with our free plan and scale as you grow. No commitment, cancel anytime.
          </p>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
            <div className="text-2xl font-bold mb-2">⚡ Quick Setup</div>
            <p className="text-white/90">
              Get your first chatbot live in under 5 minutes with our guided setup wizard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
