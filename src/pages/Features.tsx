
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, Shield, BarChart3, Users, MessageSquare, CheckCircle2, Star, ArrowRight, Rocket, CreditCard, Clock, Sparkles, Code2, Brain, Globe } from "lucide-react";
import { BotinoLogo } from "@/components/BotinoLogo";

const Index = () => {
  const features = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "No-Code Setup",
      description: "Launch AI chatbots without writing a single line of code. Our intuitive interface makes it simple for everyone.",
      delay: "0ms"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Multi-Platform Support",
      description: "Connect to Discord, Slack, Telegram, WhatsApp, and more. Manage all your bots from one central dashboard.",
      delay: "100ms"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Credentials",
      description: "Your API keys and credentials are encrypted and stored securely. We never access your private data.",
      delay: "200ms"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Real-time Analytics",
      description: "Track bot performance, user interactions, and engagement metrics with detailed analytics dashboards.",
      delay: "300ms"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Deployment",
      description: "Go from setup to live bot in minutes. Toggle bots on/off instantly across all connected platforms.",
      delay: "400ms"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Invite team members, assign roles, and collaborate on bot management with enterprise-grade controls.",
      delay: "500ms"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Community Manager",
      company: "TechCorp",
      content: "Botino transformed our community engagement. We launched bots across 5 platforms in under 30 minutes!",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Director",
      company: "GrowthCo",
      content: "The analytics are incredible. We can see exactly how our bots are performing and optimize in real-time.",
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Small Business Owner",
      company: "Boutique Plus",
      content: "Finally, a solution that doesn't require a tech team. Our customer service bot is handling 80% of inquiries.",
      avatar: "EW"
    }
  ];

  return (
    <div className="min-h-screen particle-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-blue-900/10 to-indigo-900/10"></div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            <div className="animate-slide-up mb-8">
              <BotinoLogo size="xl" className="justify-center mb-6" />
            </div>
            
            <Badge className="mb-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30 animate-glow-pulse animate-slide-up" variant="outline" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 animate-bounce" />
                Now supporting 10+ platforms and growing
              </div>
            </Badge>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl animate-slide-up" style={{ animationDelay: "400ms" }}>
              No-Code AI Chatbots for 
              <span className="block text-gradient animate-float mt-4">
                Multiple Social Platforms
              </span>
            </h1>
            
            <p className="mb-8 text-xl text-slate-300 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "600ms" }}>
              Launch intelligent chatbots across Discord, Slack, Telegram, WhatsApp and more. 
              No coding required. Setup in minutes, not days.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" style={{ animationDelay: "800ms" }}>
              <Button size="lg" className="btn-gradient text-lg font-semibold px-8 py-4" asChild>
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 px-8 py-4 text-lg backdrop-blur-sm" asChild>
                <Link to="/demo">
                  <Brain className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-slate-400 animate-fade-in-delayed">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-green-400 animate-bounce" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300" variant="outline">
              <Globe className="mr-2 h-4 w-4" />
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-gradient">
              Everything you need to launch and manage AI chatbots
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Powerful features designed for non-technical users, with enterprise-grade security and reliability.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group card-glow card-hover animate-slide-up" 
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader>
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white mb-4 group-hover:scale-110 transition-transform duration-500 glow-effect">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-slate-100">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-slate-100">
              Trusted by teams worldwide
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-cyan-400 text-cyan-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <span className="text-lg font-semibold text-slate-100">4.9/5</span>
              <span className="text-slate-400">from 1,200+ reviews</span>
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-glow card-hover animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold glow-effect">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100">{testimonial.name}</p>
                      <p className="text-sm text-slate-400">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-gradient text-shimmer">
              Ready to launch your first AI chatbot?
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using Botino to automate customer support, 
              engage communities, and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="btn-gradient px-8 py-4 text-lg shadow-2xl" asChild>
                <Link to="/signup">
                  Start Building For Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 backdrop-blur-sm" asChild>
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group animate-float" style={{ animationDelay: "0s" }}>
                <div className="text-3xl font-bold text-gradient group-hover:scale-110 transition-transform duration-300">10+</div>
                <div className="text-sm text-slate-400">Platforms Supported</div>
              </div>
              <div className="group animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-3xl font-bold text-gradient-gold group-hover:scale-110 transition-transform duration-300">50K+</div>
                <div className="text-sm text-slate-400">Bots Deployed</div>
              </div>
              <div className="group animate-float" style={{ animationDelay: "2s" }}>
                <div className="text-3xl font-bold text-gradient group-hover:scale-110 transition-transform duration-300">99.9%</div>
                <div className="text-sm text-slate-400">Uptime</div>
              </div>
              <div className="group animate-float" style={{ animationDelay: "3s" }}>
                <div className="text-3xl font-bold text-gradient-gold group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-sm text-slate-400">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
