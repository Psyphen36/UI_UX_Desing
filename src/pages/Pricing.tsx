
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Sparkles, Zap, Shield, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { BotinoLogo } from "@/components/BotinoLogo";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "1 AI Chatbot",
        "Up to 100 messages/month",
        "2 Platform integrations",
        "Basic analytics",
        "Community support"
      ],
      cta: "Get Started Free",
      popular: false,
      icon: <Sparkles className="h-6 w-6" />,
      gradient: "from-slate-400 to-slate-600"
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Best for growing businesses",
      features: [
        "5 AI Chatbots",
        "Up to 10,000 messages/month",
        "All platform integrations",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "API access"
      ],
      cta: "Start Pro Trial",
      popular: true,
      icon: <Zap className="h-6 w-6" />,
      gradient: "from-emerald-400 to-cyan-600"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations",
      features: [
        "Unlimited chatbots",
        "Unlimited messages",
        "White-label solution",
        "Advanced security",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false,
      icon: <Crown className="h-6 w-6" />,
      gradient: "from-purple-400 to-indigo-600"
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing adjustments."
    },
    {
      question: "What happens if I exceed my message limit?",
      answer: "Your bots will continue working, but you'll be prompted to upgrade to handle additional messages. We'll never shut down your service without notice."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees, ever. What you see is what you pay. Start building immediately after signup."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white particle-bg">
      <div className="absolute inset-0 bg-mesh-gradient opacity-20 pointer-events-none"></div>
      
      <div className="container py-20 space-y-20 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="animate-slide-up mb-8">
            <BotinoLogo size="lg" className="justify-center mb-8" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gradient animate-shimmer">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "200ms" }}>
            Choose the perfect plan for your chatbot needs. Start free, upgrade anytime. 
            <span className="text-emerald-400 font-semibold"> No hidden fees</span>, ever.
          </p>
        </div>

        {/* Enhanced Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`card-hover border-0 shadow-2xl relative backdrop-blur-sm animate-bounce-in group ${
              plan.popular ? 'ring-2 ring-primary glow-effect scale-105' : ''
            }`} style={{ animationDelay: `${index * 200}ms` }}>
              {plan.popular && (
                <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold px-6 py-2 text-sm animate-pulse">
                  Most Popular
                </Badge>
              )}
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl`}></div>
              </div>
              
              <CardHeader className="text-center relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-3xl font-bold group-hover:text-primary transition-colors duration-300">{plan.name}</CardTitle>
                <div className="space-y-3">
                  <div className="text-5xl font-bold text-gradient animate-shimmer">
                    {plan.price}
                  </div>
                  <p className="text-muted-foreground text-lg">{plan.period}</p>
                </div>
                <CardDescription className="text-lg text-slate-400 group-hover:text-slate-300 transition-colors">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 relative z-10">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center group-hover:text-white transition-colors duration-300">
                      <Check className="h-5 w-5 text-emerald-500 mr-4 flex-shrink-0 animate-pulse" />
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={plan.popular ? "btn-gradient w-full text-lg py-4 group" : "w-full text-lg py-4 group"} 
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link to="/signup">
                    {plan.cta}
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
              
              {/* Enhanced Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            </Card>
          ))}
        </div>

        {/* Enhanced FAQ Section */}
        <div className="text-center space-y-12 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gradient animate-shimmer">Frequently Asked Questions</h2>
          <div className="text-left space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-2xl backdrop-blur-sm animate-slide-up group hover:shadow-primary/10 transition-all duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-primary transition-colors duration-300 flex items-center gap-3">
                    <Shield className="h-6 w-6 text-emerald-400 animate-pulse" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-slate-300 transition-colors">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold text-gradient animate-shimmer">Ready to get started?</h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Join thousands of businesses already using Botino to power their AI chatbot infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in">
            <Button size="lg" className="btn-gradient text-xl px-12 py-6 shadow-2xl group" asChild>
              <Link to="/signup">
                <Sparkles className="mr-3 h-6 w-6 group-hover:animate-spin" />
                Start Free Trial
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-xl px-12 py-6 border-slate-700 hover:border-cyan-400 transition-colors group" asChild>
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
