
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, Shield, BarChart3, Users, MessageSquare, Star, ArrowRight, Rocket, CreditCard, Clock, Sparkles, Code2, Brain, Globe, Settings, Layers, Wifi, Play, CheckCircle, Monitor, Smartphone, Hash, Terminal, Database, Cpu } from "lucide-react";
import { BotinoLogo } from "@/components/BotinoLogo";
import { cn } from "@/lib/utils";

const Index = () => {
  const platforms = [
    { name: "Discord", icon: "🎮", color: "bg-indigo-500", gradient: "from-indigo-400 to-indigo-600" },
    { name: "Telegram", icon: "✈️", color: "bg-blue-500", gradient: "from-blue-400 to-blue-600" },
    { name: "WhatsApp", icon: "💬", color: "bg-green-500", gradient: "from-green-400 to-green-600" },
    { name: "Slack", icon: "💼", color: "bg-purple-500", gradient: "from-purple-400 to-purple-600" },
    { name: "Twitter", icon: "🐦", color: "bg-cyan-500", gradient: "from-cyan-400 to-cyan-600" }
  ];

  const codeExample = `// Simple bot setup
const bot = new BotinoBot({
  platform: 'discord',
  token: process.env.DISCORD_TOKEN,
  aiProvider: {
    name: 'shapes',
    apiKey: process.env.SHAPES_API_KEY
  }
});

bot.start();
// Your bot is now live!`;

  const features = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Zero Coding Required",
      description: "Build powerful AI bots without writing a single line of code",
      gradient: "from-emerald-400 to-emerald-600"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Deployment",
      description: "Deploy your bots globally in under 2 minutes",
      gradient: "from-yellow-400 to-orange-600"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Multi-Platform Support",
      description: "Connect to Discord, Telegram, WhatsApp, and more",
      gradient: "from-blue-400 to-cyan-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols",
      gradient: "from-purple-400 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden particle-bg">
      {/* Enhanced Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-slide-up mb-8">
              <BotinoLogo variant="full" size="xl" className="justify-center mb-8" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 animate-slide-up leading-tight" style={{ animationDelay: "200ms" }}>
              <span className="text-white">Multi-Platform</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-shimmer">
                AI Bot Creator
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-8 sm:mb-12 animate-slide-up leading-relaxed px-4" style={{ animationDelay: "400ms" }}>
              The ultimate platform for creating AI-powered chatbots across multiple platforms. 
              <span className="text-emerald-400 font-semibold"> Zero coding required</span> - just add your credentials and launch instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-scale-in px-4" style={{ animationDelay: "600ms" }}>
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 group" asChild>
                <Link to="/signup">
                  <Sparkles className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-spin" />
                  Get Started Free
                  <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-cyan-400 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-xl transition-all duration-300 group" asChild>
                <Link to="/demo">
                  <Play className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Platform Integration Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Supported Platforms
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Connect your bots to the platforms your users love
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 px-4">
              {platforms.map((platform, index) => (
                <div 
                  key={platform.name}
                  className={cn(
                    "flex items-center gap-3 sm:gap-4 bg-slate-900/50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-800 hover:border-slate-600 transition-all duration-500 cursor-pointer group animate-bounce-in backdrop-blur-sm",
                    "hover:scale-105 hover:shadow-2xl"
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center text-base sm:text-lg font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {platform.icon}
                  </div>
                  <span className="text-slate-300 font-semibold text-base sm:text-lg group-hover:text-white transition-colors">{platform.name}</span>
                </div>
              ))}
            </div>
            
            <Card className="bg-slate-900/50 rounded-3xl border border-slate-800 p-8 animate-scale-in backdrop-blur-sm shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Enterprise-Grade Bot Infrastructure</h3>
                <div className="flex gap-3">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2 text-sm font-semibold animate-pulse">Deploy in 2min</Badge>
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-4 py-2 text-sm font-semibold animate-pulse" style={{ animationDelay: "0.5s" }}>Zero Coding</Badge>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4">
                <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-emerald-400 animate-pulse" />
                    <h4 className="font-semibold text-white text-lg">Highly Available, Infinitely Scalable</h4>
                  </div>
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                      Multi-region bot deployment
                    </li>
                    <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                      Auto-scaling based on usage
                    </li>
                    <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
                      99.99% uptime guarantee
                    </li>
                    <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></span>
                      Real-time performance monitoring
                    </li>
                  </ul>
                </div>
                
                <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-6 w-6 text-cyan-400 animate-spin" style={{ animationDuration: "3s" }} />
                    <h4 className="font-semibold text-white text-lg">Global Low Latency</h4>
                  </div>
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                      &lt; 50ms response time globally
                    </li>
                    <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                      Edge computing optimization
                    </li>
                    <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
                      Smart routing algorithms
                    </li>
                    <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></span>
                      CDN-powered message delivery
                    </li>
                  </ul>
                </div>
                
                <div className="animate-slide-up" style={{ animationDelay: "600ms" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-blue-400 animate-glow-pulse" />
                    <h4 className="font-semibold text-white text-lg">Durable, Persistent Storage</h4>
                  </div>
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                      Encrypted credential storage
                    </li>
                    <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                      Message history persistence
                    </li>
                    <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
                      Automatic backups
                    </li>
                    <li className="flex items-center gap-3 hover:text-slate-200 transition-colors">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></span>
                      GDPR compliant data handling
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-shimmer">
                  Why Choose Botino?
                </span>
              </h2>
              <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
                The most advanced no-code platform for creating AI-powered chatbots
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 px-4">
              {features.map((feature, index) => (
                <Card key={index} className="bg-slate-900/50 border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-slate-600 transition-all duration-500 animate-bounce-in group cursor-pointer backdrop-blur-sm" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 sm:mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-emerald-400 transition-colors">{feature.title}</h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors text-sm sm:text-base">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Code Example Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center px-4">
              <div className="animate-slide-up order-2 lg:order-1">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-center lg:text-left">
                  <span className="text-white">Deploy</span>{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-shimmer">
                    Anywhere
                  </span>
                </h2>
                <p className="text-slate-400 text-lg sm:text-xl mb-8 sm:mb-10 leading-relaxed text-center lg:text-left">
                  From a simple Discord bot to complex multi-platform AI assistants. 
                  Deploy globally with zero configuration in just 3 simple steps.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-colors duration-300 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-black font-bold text-lg">1</span>
                    </div>
                    <div>
                      <span className="text-white font-semibold text-lg">Choose Platform</span>
                      <p className="text-slate-400">Select Discord, Telegram, WhatsApp, or Slack</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-colors duration-300 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-black font-bold text-lg">2</span>
                    </div>
                    <div>
                      <span className="text-white font-semibold text-lg">Add Credentials</span>
                      <p className="text-slate-400">Paste your platform token & Shapes.inc API key</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-colors duration-300 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <div>
                      <span className="text-white font-semibold text-lg">Launch Bot</span>
                      <p className="text-slate-400">Click create and your bot goes live instantly</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="animate-scale-in order-1 lg:order-2">
                <div className="bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-800 overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500">
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800 bg-slate-800/50">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                    <span className="text-slate-400 text-sm ml-4 flex items-center gap-2">
                      <Terminal className="h-4 w-4" />
                      bot-setup.js
                    </span>
                  </div>
                  <div className="p-8">
                    <pre className="text-sm text-slate-300 font-mono leading-relaxed">
                      <code className="animate-fade-in">{codeExample}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-glow-pulse"></div>
              <div className="relative">
                <h2 className="text-6xl font-bold mb-8 animate-slide-up">
                  <span className="text-white">Ready to launch your</span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-shimmer">
                    AI-powered bot?
                  </span>
                </h2>
                <p className="text-slate-400 text-xl mb-12 animate-slide-up max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: "200ms" }}>
                  Start building your next generation AI-powered customer experience with Botino.
                  <span className="text-emerald-400 font-semibold"> Get started in under 2 minutes</span>.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in" style={{ animationDelay: "400ms" }}>
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold px-12 py-6 text-xl rounded-xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 group" asChild>
                    <Link to="/signup">
                      <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                      Start Building Now
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-cyan-400 px-12 py-6 text-xl rounded-xl transition-all duration-300 group" asChild>
                    <Link to="/demo">
                      <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
