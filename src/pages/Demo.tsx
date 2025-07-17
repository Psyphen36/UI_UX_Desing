
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, MessageSquare, Bot, Zap, ArrowRight, Sparkles, Monitor, Smartphone, BarChart3, Code2, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { BotinoLogo } from "@/components/BotinoLogo";

const Demo = () => {
  const demoFeatures = [
    {
      title: "Live Chat Simulation",
      description: "See how your bot responds to real customer queries in real-time across all platforms",
      icon: <MessageSquare className="h-8 w-8" />,
      gradient: "from-emerald-400 to-emerald-600"
    },
    {
      title: "Multi-Platform Preview",
      description: "View how your bot looks and behaves across Discord, Telegram, WhatsApp, and Slack",
      icon: <Globe className="h-8 w-8" />,
      gradient: "from-blue-400 to-cyan-600"
    },
    {
      title: "Performance Metrics",
      description: "Watch live analytics, response times, and user engagement measurements",
      icon: <BarChart3 className="h-8 w-8" />,
      gradient: "from-purple-400 to-indigo-600"
    },
    {
      title: "Zero-Code Setup",
      description: "Experience the complete bot creation process without writing any code",
      icon: <Code2 className="h-8 w-8" />,
      gradient: "from-orange-400 to-red-600"
    }
  ];

  const platforms = [
    { name: "Discord", icon: "🎮" },
    { name: "Telegram", icon: "✈️" },
    { name: "WhatsApp", icon: "💬" },
    { name: "Slack", icon: "💼" }
  ];

  return (
    <div className="min-h-screen bg-black text-white particle-bg">
      <div className="absolute inset-0 bg-mesh-gradient opacity-20 pointer-events-none"></div>
      
      <div className="container py-20 space-y-20 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="animate-slide-up mb-8">
            <BotinoLogo variant="full" size="lg" className="justify-center mb-8" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gradient animate-shimmer">
            See Botino in Action
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "200ms" }}>
            Experience the power of no-code AI chatbot creation with our interactive demo. 
            <span className="text-emerald-400 font-semibold"> Watch real bots</span> being created and deployed in minutes.
          </p>
        </div>

        {/* Enhanced Demo Video Section */}
        <Card className="card-hover border-0 shadow-2xl max-w-5xl mx-auto backdrop-blur-sm animate-scale-in">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 rounded-t-3xl flex items-center justify-center group">
              <div className="absolute inset-0 bg-black/20 rounded-t-3xl"></div>
              <Button size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 text-xl px-12 py-6 rounded-2xl shadow-2xl group-hover:scale-110 transition-all duration-300 relative z-10">
                <Play className="h-10 w-10 mr-4 group-hover:scale-110 transition-transform" />
                Watch Demo (3:45)
                <Sparkles className="h-6 w-6 ml-3 group-hover:animate-spin" />
              </Button>
              
              {/* Floating Elements */}
              <div className="absolute top-8 left-8 flex gap-3">
                {platforms.map((platform, index) => (
                  <div key={platform.name} className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-lg animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                    {platform.icon}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-10 space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Interactive Product Demo</h2>
                  <p className="text-slate-400 text-lg">Complete walkthrough of bot creation process</p>
                </div>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Watch how easy it is to create, customize, and deploy AI chatbots across multiple platforms in just minutes. 
                See real-time analytics, user interactions, and platform integrations.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2">No-Code</Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">Multi-Platform</Badge>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">Real-Time</Badge>
                <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-4 py-2">AI-Powered</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Demo Features */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {demoFeatures.map((feature, index) => (
            <Card key={index} className="card-hover border-0 shadow-2xl backdrop-blur-sm group animate-bounce-in" style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader>
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl text-white group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Interactive Demo Section */}
        <Card className="border-0 shadow-2xl backdrop-blur-sm animate-scale-in">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl text-gradient">Try It Yourself</CardTitle>
                <CardDescription className="text-lg text-slate-400">
                  Interact with a live chatbot demo to see the capabilities in action
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl p-12 min-h-[500px] flex items-center justify-center border border-slate-700 backdrop-blur-sm">
              <div className="text-center space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary via-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-glow-pulse">
                    <Bot className="h-12 w-12 text-white animate-bounce-soft" />
                  </div>
                  {/* Floating particles */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold text-gradient">Live Demo Chat</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Click below to start chatting with our demo bot and experience the power of AI conversations
                </p>
                <Button className="btn-gradient text-xl px-12 py-6 shadow-2xl group">
                  <MessageSquare className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  Start Demo Chat
                  <Sparkles className="ml-3 h-6 w-6 group-hover:animate-spin" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced CTA Section */}
        <div className="text-center space-y-10">
          <h2 className="text-4xl font-bold text-gradient animate-shimmer">Ready to Build Your Own?</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-xl leading-relaxed">
            Start building your next generation AI-powered customer experience with Botino. 
            <span className="text-emerald-400 font-semibold"> Get started in under 2 minutes</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
            <Button className="btn-gradient text-xl px-12 py-6 shadow-2xl group" size="lg" asChild>
              <Link to="/signup">
                <Sparkles className="mr-3 h-6 w-6 group-hover:animate-spin" />
                Start Building Now
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-xl px-12 py-6 border-slate-700 hover:border-cyan-400 transition-colors group" asChild>
              <Link to="/pricing">
                View Pricing
                <Shield className="ml-3 h-6 w-6 group-hover:animate-pulse" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
