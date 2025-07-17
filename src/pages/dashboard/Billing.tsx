
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreditCard, Crown, Check, ExternalLink, Calendar, DollarSign, MoreHorizontal, TrendingUp, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BotinoLogo } from "@/components/BotinoLogo";

const Billing = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getPortalUrl = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/customer-portal`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast({ title: "Error opening billing portal", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error opening billing portal", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const features = {
    free: [
      "Up to 3 bots",
      "Basic analytics",
      "Community support",
      "Standard response time"
    ],
    premium: [
      "Up to 10 bots",
      "Advanced analytics",
      "Priority support",
      "Faster response time",
      "Custom webhooks",
      "API access"
    ]
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section - Similar to reference */}
      <div className="bg-gradient-to-br from-black via-slate-900/50 to-black border-b border-primary/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <BotinoLogo variant="compact" size="sm" />
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Avatar className="h-10 w-10 border-2 border-primary/30">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          {/* Billing Stats Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-primary/30 shadow-xl">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-2xl font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-green-500 h-6 w-6 rounded-full border-4 border-black"></div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Current Plan</p>
                <h1 className="text-4xl font-bold text-white mb-2">Free Tier</h1>
                <p className="text-muted-foreground text-sm">
                  3 Bots Created • $0/month • 2,491 messages used
                </p>
              </div>
            </div>
            
            {/* Usage Stats */}
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-muted-foreground text-sm mb-1">Monthly Usage</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Bots</p>
                    <p className="text-white font-semibold">3/3</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Messages</p>
                    <p className="text-white font-semibold">2,491</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">API Calls</p>
                    <p className="text-white font-semibold">567</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uptime</p>
                    <p className="text-white font-semibold">99.9%</p>
                  </div>
                </div>
              </div>
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-8 border-primary/20"></div>
                <div className="absolute inset-0 rounded-full border-8 border-primary border-r-transparent border-b-transparent transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">83%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">Usage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">

        <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mb-8">
          {/* Current Plan */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-white">
                <Crown className="h-5 w-5 mr-3 text-yellow-500" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Free Plan</h3>
                    <p className="text-muted-foreground">Perfect for getting started</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Active
                  </Badge>
                </div>
                
                <div className="pt-4 border-t border-slate-700">
                  <h4 className="font-medium text-white mb-4">Included Features:</h4>
                  <ul className="space-y-3">
                    {features.free.map((feature, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <Check className="h-4 w-4 mr-3 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 backdrop-blur-sm animate-fade-in relative overflow-hidden" style={{ animationDelay: "200ms" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-white">
                <Crown className="h-5 w-5 mr-3 text-primary" />
                Premium Plan
                <Badge className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1">Recommended</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Pro Plan</h3>
                    <p className="text-muted-foreground">For professional use</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">$19</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-700">
                  <h4 className="font-medium text-white mb-4">Premium Features:</h4>
                  <ul className="space-y-3 mb-6">
                    {features.premium.map((feature, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <Check className="h-4 w-4 mr-3 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Premium
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing Management */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-white">
                <CreditCard className="h-5 w-5 mr-3" />
                Billing Portal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Manage your payment method, view invoices, and update billing information through Stripe.
              </p>
              <Button 
                variant="outline" 
                className="w-full hover:bg-slate-800 hover:border-primary/50 transition-all duration-300"
                onClick={getPortalUrl}
                disabled={loading}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {loading ? "Opening..." : "Open Billing Portal"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-white">
                <Calendar className="h-5 w-5 mr-3" />
                Next Billing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="text-2xl font-bold text-white mb-1">
                    Free Plan
                  </div>
                  <p className="text-muted-foreground">
                    No upcoming charges
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <p className="text-sm text-muted-foreground mb-2">Upgrade to Pro for:</p>
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-white font-semibold">Advanced Analytics</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm animate-fade-in md:col-span-2 lg:col-span-1" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-white">
                <DollarSign className="h-5 w-5 mr-3" />
                Usage This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-muted-foreground">Bots Created</span>
                  <div className="text-right">
                    <span className="font-semibold text-white">3/3</span>
                    <div className="w-12 h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div className="w-full h-full bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-muted-foreground">Messages</span>
                  <div className="text-right">
                    <span className="font-semibold text-white">2,491</span>
                    <div className="w-12 h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div className="w-4/5 h-full bg-cyan-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-muted-foreground">API Calls</span>
                  <div className="text-right">
                    <span className="font-semibold text-white">567</span>
                    <div className="w-12 h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div className="w-1/2 h-full bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billing;
