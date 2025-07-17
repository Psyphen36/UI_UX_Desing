
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, MessageSquare, Clock, Zap, Activity, Bot, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { BotinoLogo } from "@/components/BotinoLogo";

const Analytics = () => {
  const [usageStats, setUsageStats] = useState([
    { date: 'Jan 1', tokens: 1200, messages: 45 },
    { date: 'Jan 2', tokens: 1800, messages: 67 },
    { date: 'Jan 3', tokens: 1600, messages: 52 },
    { date: 'Jan 4', tokens: 2200, messages: 78 },
    { date: 'Jan 5', tokens: 1900, messages: 63 },
    { date: 'Jan 6', tokens: 2400, messages: 89 },
    { date: 'Jan 7', tokens: 2100, messages: 71 },
  ]);
  
  const [stats, setStats] = useState([
    { title: "Total Messages", value: "12,491", trend: "+12.5% from last month", icon: "messages" },
    { title: "Active Users", value: "2,849", trend: "+8.2% from last month", icon: "users" },
    { title: "Response Time", value: "0.8s", trend: "-5.2% from last month", icon: "clock" },
    { title: "Success Rate", value: "99.2%", trend: "+0.8% from last month", icon: "activity" },
  ]);
  
  const [topBots, setTopBots] = useState([
    { name: "Support Bot", conversations: 1247, trend: "up", platform: "discord" },
    { name: "FAQ Assistant", conversations: 892, trend: "up", platform: "telegram" },
    { name: "Order Tracker", conversations: 634, trend: "down", platform: "slack" },
    { name: "Help Desk", conversations: 445, trend: "up", platform: "discord" },
  ]);
  
  const [searchParams] = useSearchParams();
  const selectedBot = searchParams.get('bot');

  useEffect(() => {
    // Uncomment this when API is ready
    // fetch(`${import.meta.env.VITE_API_URL}/api/usage/stats`, { credentials: "include" })
    //   .then(res => res.json())
    //   .then(setUsageStats)
    //   .catch(err => console.error("Failed to fetch usage stats:", err));
  }, []);

  const getStatIcon = (icon: string) => {
    switch (icon) {
      case "messages": return <MessageSquare className="h-5 w-5" />;
      case "users": return <Users className="h-5 w-5" />;
      case "clock": return <Clock className="h-5 w-5" />;
      case "activity": return <Activity className="h-5 w-5" />;
      default: return <TrendingUp className="h-5 w-5" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      discord: "🎮",
      telegram: "📱", 
      slack: "💬",
      twitch: "🎥"
    };
    return icons[platform.toLowerCase()] || "🤖";
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
          
          {/* User Stats Section - Inspired by reference layout */}
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
                <p className="text-muted-foreground text-sm mb-1">This Month</p>
                <h1 className="text-4xl font-bold text-white mb-2">12,491.01</h1>
                <p className="text-muted-foreground text-sm">
                  10 Completed Bots • Averaging $8,122.21
                </p>
              </div>
            </div>
            
            {/* Performance Circle - Similar to reference */}
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-muted-foreground text-sm mb-1">Your 60 Second Challenge Stats</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Average</p>
                    <p className="text-white font-semibold">87:45</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Worst</p>
                    <p className="text-white font-semibold">94:23</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Purchases</p>
                    <p className="text-white font-semibold">23</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time Saved</p>
                    <p className="text-white font-semibold">148:2102</p>
                  </div>
                </div>
              </div>
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-8 border-primary/20"></div>
                <div className="absolute inset-0 rounded-full border-8 border-primary border-r-transparent border-b-transparent transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">52</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-900/50 border-slate-800 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-fade-in backdrop-blur-sm" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {getStatIcon(stat.icon)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground flex items-center">
                  {stat.trend.includes('-') ? (
                    <ArrowDownRight className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                  )}
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Analytics - Larger format like reference */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <Card className="lg:col-span-2 bg-slate-900/50 border-slate-800 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle className="text-xl text-white">Token & Message Usage</CardTitle>
              <CardDescription className="text-muted-foreground">
                Performance over the past 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={usageStats}>
                  <defs>
                    <linearGradient id="tokensGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="messagesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tokens" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    fill="url(#tokensGradient)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    fill="url(#messagesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="text-xl text-white">Top Performing Bots</CardTitle>
              <CardDescription className="text-muted-foreground">
                Most active this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topBots.map((bot, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-lg">
                        {getPlatformIcon(bot.platform)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{bot.name}</p>
                        <p className="text-sm text-muted-foreground">{bot.conversations} conversations</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {bot.trend === 'up' ? (
                        <ArrowUpRight className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics - Clean cards like reference */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "600ms" }}>
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Message Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-muted-foreground">Questions</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="font-semibold text-white text-sm">45%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-muted-foreground">Commands</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-cyan-400 rounded-full"></div>
                    </div>
                    <span className="font-semibold text-white text-sm">30%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-muted-foreground">Greetings</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-1/4 h-full bg-green-400 rounded-full"></div>
                    </div>
                    <span className="font-semibold text-white text-sm">25%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "700ms" }}>
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Peak Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-muted-foreground">9 AM - 12 PM</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Peak</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-muted-foreground">1 PM - 5 PM</span>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">High</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-muted-foreground">6 PM - 11 PM</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Medium</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm animate-fade-in md:col-span-2 lg:col-span-1" style={{ animationDelay: "800ms" }}>
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-muted-foreground">Uptime</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-green-400">99.9%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-muted-foreground">Avg Response</span>
                  <span className="font-semibold text-primary">0.8s</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-muted-foreground">Error Rate</span>
                  <span className="font-semibold text-orange-400">0.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
