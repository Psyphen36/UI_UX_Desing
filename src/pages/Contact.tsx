
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "hello@chatbothub.com"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available 24/7"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "Speak with our experts",
      contact: "+1 (555) 123-4567"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      description: "Our headquarters",
      contact: "San Francisco, CA"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container py-16 space-y-16">
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="btn-gradient w-full">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
                <CardDescription>
                  Choose the best way to reach us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 glow-effect">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{info.title}</h3>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                      <p className="text-sm font-medium">{info.contact}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
                <CardDescription>
                  Looking for answers? Check out our resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  📚 Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  ❓ FAQ
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🎥 Video Tutorials
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💬 Community Forum
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
