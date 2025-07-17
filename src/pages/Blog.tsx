
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const posts = [
    {
      title: "How to Build Your First AI Chatbot in 5 Minutes",
      excerpt: "A step-by-step guide to creating your first chatbot without any coding experience.",
      author: "Sarah Johnson",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "Tutorial",
      featured: true
    },
    {
      title: "The Future of Customer Support: AI-Powered Chatbots",
      excerpt: "Discover how AI chatbots are revolutionizing customer service across industries.",
      author: "Mike Chen",
      date: "Dec 12, 2024",
      readTime: "8 min read",
      category: "Industry",
      featured: false
    },
    {
      title: "Best Practices for Multi-Platform Bot Deployment",
      excerpt: "Learn the strategies for successfully managing chatbots across multiple platforms.",
      author: "Emily Rodriguez",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      category: "Guide",
      featured: false
    },
    {
      title: "Security Best Practices for AI Chatbots",
      excerpt: "Essential security measures to protect your chatbots and user data.",
      author: "David Park",
      date: "Dec 8, 2024",
      readTime: "7 min read",
      category: "Security",
      featured: false
    }
  ];

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container py-16 space-y-16">
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient">
            ChatBot Hub Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Insights, tutorials, and updates from the world of AI chatbots
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="card-hover border-0 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-l-lg"></div>
              <CardContent className="p-8 space-y-4">
                <Badge className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
                  Featured
                </Badge>
                <CardTitle className="text-2xl">{featuredPost.title}</CardTitle>
                <CardDescription className="text-base">
                  {featuredPost.excerpt}
                </CardDescription>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <Button className="btn-gradient">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Regular Posts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post, index) => (
            <Card key={index} className="card-hover border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{post.category}</Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription>{post.excerpt}</CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-0">
          <CardContent className="p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">Stay Updated</h2>
            <p className="text-muted-foreground">
              Get the latest insights and tutorials delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
              />
              <Button className="btn-gradient">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
