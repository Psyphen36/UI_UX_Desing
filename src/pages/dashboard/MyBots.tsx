
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bot, Plus, Settings, BarChart3, Activity, Users, MessageSquare, Zap, TrendingUp, Globe, Sparkles, Star, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import CreateBotModal from "@/components/createBotModal";
import BotSkeletonLoader from "@/components/BotSkeletonLoader";
import api from "@/api/axios";

interface BotData {
  id: number;
  name: string;
  platform: string;
  status: string;
  users_count: number;
  created_at?: string;
  updated_at?: string;
}

export default function MyBots() {
  const [bots, setBots] = useState<BotData[]>([]);
  const [loading, setLoading] = useState(true); // 👈 new
  const [showModal, setShowModal] = useState(false);
  const [loadingBots, setLoadingBots] = useState<Record<number, boolean>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const dummyBots: BotData[] = [
    {
      id: 1,
      name: "Support Bot",
      platform: "discord",
      status: "active",
      users_count: 120,
      created_at: "2024-01-12T10:30:00Z",
    },
    {
      id: 2,
      name: "FAQ Assistant",
      platform: "telegram",
      status: "inactive",
      users_count: 45,
      created_at: "2024-02-02T14:00:00Z",
    },
    {
      id: 3,
      name: "Order Tracker",
      platform: "slack",
      status: "active",
      users_count: 76,
      created_at: "2024-03-05T08:20:00Z",
    },
  ];

  const fetchBots = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/bots");
      setBots(Array.isArray(res.data) ? res.data : []);
    } catch (error: any) {
      toast({
        title: "⚠️ Failed to load bots",
        description: "Using dummy bots instead for local testing.",
        variant: "default",
      });
      setBots(dummyBots);
    } finally {
      setLoading(false);
    }
  };


  const toggleBot = async (botId: number) => {
    setLoadingBots(prev => ({ ...prev, [botId]: true }));

    try {
      const csrfToken = localStorage.getItem("csrf_token"); // or from cookies if you store it there
      const response = await api.post(
        `/api/bots/${botId}/toggle`,
        null,
        {
          withCredentials: true, // 👈 REQUIRED
          headers: {
            "X-CSRF-Token": csrfToken || "",
          },
        }
      );

      if (response.data.success) {
        toast({ 
          title: "Bot status updated!", 
          description: response.data.message 
        });
        fetchBots();
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Could not toggle bot status.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || "Could not toggle bot status.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoadingBots(prev => ({ ...prev, [botId]: false }));
    }
  };

  const deleteBot = async (botId: number, botName: string) => {
    try {
      await api.delete(`/api/bots/${botId}`);
      toast({
        title: "Bot deleted",
        description: `${botName} has been permanently deleted.`,
      });
      fetchBots();
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Could not delete bot.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const navigateToAnalytics = (botId: number) => {
    navigate(`/dashboard/analytics?bot=${botId}`);
  };

  const navigateToConfig = (botId: number) => {
    navigate(`/dashboard/bot-config/${botId}`);
  };

  const getPlatformTheme = (platform: string) => {
    const themes: Record<string, { 
      gradient: string, 
      icon: string, 
      accent: string,
      shadow: string 
    }> = {
      discord: { 
        gradient: "from-indigo-500 via-purple-500 to-pink-500", 
        icon: "🎮", 
        accent: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
        shadow: "shadow-indigo-500/20"
      },
      telegram: { 
        gradient: "from-blue-400 via-cyan-500 to-teal-500", 
        icon: "📱", 
        accent: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
        shadow: "shadow-cyan-500/20"
      },
      slack: { 
        gradient: "from-green-400 via-emerald-500 to-teal-600", 
        icon: "💬", 
        accent: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        shadow: "shadow-emerald-500/20"
      },
      twitch: { 
        gradient: "from-purple-500 via-violet-600 to-purple-700", 
        icon: "🎥", 
        accent: "border-purple-500/30 bg-purple-500/10 text-purple-300",
        shadow: "shadow-purple-500/20"
      }
    };
    return themes[platform.toLowerCase()] || { 
      gradient: "from-slate-500 to-slate-600", 
      icon: "🤖", 
      accent: "border-slate-500/30 bg-slate-500/10 text-slate-300",
      shadow: "shadow-slate-500/20"
    };
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    fetchBots();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <CreateBotModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onBotCreated={fetchBots}
      />
      
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-cyan-600/20 to-blue-600/20 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">AI-Powered Bot Management</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent mb-6">
              Your Bot Fleet
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Manage, monitor, and deploy intelligent bots across multiple platforms with real-time analytics
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4">
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-emerald-500/20 p-2 rounded-xl">
                    <Bot className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{bots.length}</div>
                <div className="text-sm text-slate-400">Total Bots</div>
              </div>
              
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4">
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-cyan-500/20 p-2 rounded-xl">
                    <Activity className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{bots.filter(b => b.status === 'active').length}</div>
                <div className="text-sm text-slate-400">Active</div>
              </div>
              
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4">
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-blue-500/20 p-2 rounded-xl">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{bots.reduce((acc, bot) => acc + (bot.users_count || 0), 0)}</div>
                <div className="text-sm text-slate-400">Total Users</div>
              </div>
              
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4">
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-purple-500/20 p-2 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">99.2%</div>
                <div className="text-sm text-slate-400">Uptime</div>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Bot
              <Zap className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bots Grid */}
      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <BotSkeletonLoader />
        ) : bots.length === 0 ? (
          <div className="text-center py-24">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
              <div className="relative bg-slate-800/50 p-8 rounded-full border border-slate-700/50">
                <Bot className="h-16 w-16 text-slate-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Ready to launch your first bot?</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              Get started by creating your first AI-powered bot and connect it to your favorite platforms.
            </p>
            <Button 
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Bot
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {bots.map((bot, index) => {
              const theme = getPlatformTheme(bot.platform);
              return (
                <Card 
                  key={bot.id} 
                  className={`group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 rounded-2xl overflow-hidden transition-all duration-500 hover:transform hover:scale-[1.02] hover:${theme.shadow} animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Platform accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient}`}></div>
                  
                  <CardHeader className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${theme.gradient} text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {theme.icon}
                        {bot.status === 'active' && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={`${theme.accent} border font-medium capitalize`}>
                          {bot.platform}
                        </Badge>
                        <Switch
                          checked={bot.status === 'active'}
                          disabled={loadingBots[bot.id]}
                          onCheckedChange={() => toggleBot(bot.id)}
                          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-500 data-[state=checked]:to-green-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <CardTitle className="text-xl font-bold text-white mb-2 group-hover:text-emerald-200 transition-colors">
                        {bot.name}
                      </CardTitle>
                      <CardDescription className="text-slate-400 flex items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {bot.users_count || 0} users
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          {formatDate(bot.created_at)}
                        </span>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-6 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${bot.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
                        <span className={`text-sm font-medium ${bot.status === 'active' ? 'text-green-400' : 'text-slate-400'}`}>
                          {bot.status === 'active' ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigateToConfig(bot.id)}
                          className="hover:bg-slate-700/50 hover:text-emerald-400 transition-all duration-300"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigateToAnalytics(bot.id)}
                          className="hover:bg-slate-700/50 hover:text-cyan-400 transition-all duration-300"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
