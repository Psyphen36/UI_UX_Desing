import { useState, useEffect } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Bot, BarChart3, Users, MessageSquare, Settings, Zap, TrendingUp,
  Activity, Sparkles, Rocket, Globe, Database, Shield, Terminal,
  Plus, MoreVertical, Play, Pause, Eye, Calendar, Clock, ArrowRight,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BotSkeletonLoader from "@/components/BotSkeletonLoader";
import { useBots } from "@/hooks/useBots";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  // const [bots, setBots] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  const { bots, loading, fetchBots } = useBots();
  const { toast } = useToast();
  useEffect(() => {
    fetchBots();
  }, []);
  
  // const fetchBots = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bots`, {
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     setBots(Array.isArray(data) ? data : []);
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Unable to load bots from the server.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const toggleBotStatus = async (botId: number) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/bots/${botId}/toggle`, {
        method: "POST",
        credentials: "include",
      });
      fetchBots();
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to toggle bot status.",
        variant: "destructive"
      });
    }
  };

  const activeBots = bots.filter(bot => bot.status === "active").length;
  const totalUsers = bots.reduce((sum, bot) => sum + (bot.users_count || 0), 0);

  const stats = [
    {
      title: "Total Bots",
      value: bots.length.toString(),
      change: "Your AI army grows",
      icon: <Bot className="h-6 w-6" />,
      gradient: "from-emerald-400 to-emerald-600",
      color: "emerald"
    },
    {
      title: "Active Bots",
      value: activeBots.toString(),
      change: `${activeBots}/${bots.length} online now`,
      icon: <Activity className="h-6 w-6" />,
      gradient: "from-cyan-400 to-cyan-600",
      color: "cyan"
    },
    {
      title: "Total Users",
      value: totalUsers.toString(),
      change: "Across all platforms",
      icon: <Users className="h-6 w-6" />,
      gradient: "from-blue-400 to-blue-600",
      color: "blue"
    },
    {
      title: "Avg Response Time",
      value: "0.8s",
      change: "Lightning fast AI",
      icon: <Zap className="h-6 w-6" />,
      gradient: "from-purple-400 to-indigo-600",
      color: "purple"
    },
  ];

  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      discord: "🎮",
      telegram: "✈️",
      slack: "💼",
      whatsapp: "💬",
      twitter: "🐦"
    };
    return icons[platform] || "🤖";
  };

  const getPlatformGradient = (platform: string) => {
    const gradients: { [key: string]: string } = {
      discord: "from-indigo-400 to-indigo-600",
      telegram: "from-blue-400 to-blue-600",
      slack: "from-purple-400 to-purple-600",
      whatsapp: "from-green-400 to-green-600",
      twitter: "from-cyan-400 to-cyan-600"
    };
    return gradients[platform] || "from-gray-400 to-gray-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4 animate-bounce-in">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-spin flex items-center justify-center">
              <Bot className="h-10 w-10 text-black" />
            </div>
            <p className="text-slate-400 text-lg animate-pulse">Loading your bot empire...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Section */}
        <div className="mb-12 animate-slide-up">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                <span className="text-white">Welcome back,</span>{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-shimmer">
                  Creator!
                </span>
              </h1>
              <p className="text-slate-400 text-lg lg:text-xl leading-relaxed">
                Command center for your AI-powered automation empire
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-cyan-400 px-6 py-3 rounded-xl transition-all duration-300 group">
                <Calendar className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Last 7 days
              </Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold px-8 py-3 rounded-xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 group">
                <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
                Create Bot
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-slide-up" style={{ animationDelay: "200ms" }}>
          {stats.map((stat, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all duration-500 group cursor-pointer backdrop-blur-sm hover:scale-105 hover:shadow-2xl">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors">
                  <TrendingUp className="h-4 w-4 mr-2 text-emerald-400 animate-pulse" />
                  <span className="text-sm">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: "400ms" }}>
          {/* Enhanced Bots List */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-800 rounded-3xl p-8 backdrop-blur-sm shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
              <CardHeader className="p-0 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Your Bot Army
                      </span>
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-lg">
                      Intelligent automation across platforms
                    </CardDescription>
                  </div>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-cyan-400 px-4 py-2 rounded-xl transition-all duration-300 group">
                    <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {bots.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce-in">
                      <Bot className="h-12 w-12 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Ready to Launch Your AI Empire?
                    </h3>
                    <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto text-center leading-relaxed">
                      Create your first intelligent bot and watch it automate conversations across multiple platforms.
                    </p>
                    <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 group">
                      <Sparkles className="mr-3 h-5 w-5 group-hover:animate-spin" />
                      Create Your First Bot
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bots.slice(0, 5).map((bot, index) => (
                      <div key={bot.id} className="flex items-center justify-between p-6 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-300 group animate-bounce-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="flex items-center space-x-6">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getPlatformGradient(bot.platform)} flex items-center justify-center text-xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                            {getPlatformIcon(bot.platform)}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                              {bot.name}
                            </h4>
                            <div className="flex items-center space-x-4">
                              <span className="text-slate-400 capitalize flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                {bot.platform}
                              </span>
                              <Badge 
                                className={cn(
                                  "capitalize px-4 py-1 text-sm font-semibold rounded-lg",
                                  bot.status === 'active' 
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 animate-pulse' 
                                    : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                                )}
                              >
                                {bot.status === 'active' ? 'Online' : 'Offline'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right hidden sm:block">
                            <p className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                              {bot.users_count || 0}
                            </p>
                            <p className="text-xs text-slate-400">active users</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Switch
                              checked={bot.status === 'active'}
                              onCheckedChange={() => toggleBotStatus(bot.id)}
                              className="data-[state=checked]:bg-emerald-500"
                            />
                            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-300 group-hover:scale-110">
                              <MoreVertical className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-8">
            {/* Enhanced Quick Actions */}
            <Card className="bg-slate-900/50 border-slate-800 rounded-3xl p-8 backdrop-blur-sm shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-2xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                    Quick Actions
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <Button variant="ghost" className="w-full justify-start text-left h-auto p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-white text-lg group-hover:text-emerald-400 transition-colors">Create New Bot</div>
                      <div className="text-slate-400 group-hover:text-slate-300 transition-colors">Launch another AI assistant</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start text-left h-auto p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors">View Analytics</div>
                      <div className="text-slate-400 group-hover:text-slate-300 transition-colors">Deep performance insights</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start text-left h-auto p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Settings className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-white text-lg group-hover:text-purple-400 transition-colors">Account Settings</div>
                      <div className="text-slate-400 group-hover:text-slate-300 transition-colors">Manage your account</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Recent Activity */}
            <Card className="bg-slate-900/50 border-slate-800 rounded-3xl p-8 backdrop-blur-sm shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-2xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Recent Activity
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 animate-slide-right" style={{ animationDelay: "100ms" }}>
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold">New bot deployed</p>
                      <p className="text-slate-400 flex items-center mt-1">
                        <CheckCircle className="h-3 w-3 mr-2 text-emerald-400 animate-pulse" />
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 animate-slide-right" style={{ animationDelay: "200ms" }}>
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold">Bot went online</p>
                      <p className="text-slate-400 flex items-center mt-1">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                        4 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 animate-slide-right" style={{ animationDelay: "300ms" }}>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold">50 new users engaged</p>
                      <p className="text-slate-400 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-2 text-blue-400 animate-pulse" />
                        6 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;