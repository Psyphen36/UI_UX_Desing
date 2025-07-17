import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Bot, Clock, Eye, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { toast } from "@/hooks/use-toast";

const dummyConversations = [
  { 
    id: 1, 
    user: "john@example.com", 
    bot: "Support Bot", 
    messages: 12, 
    lastMessage: "2 minutes ago", 
    status: "active",
    platform: "discord",
    lastMsg: "How can I reset my password?"
  },
  { 
    id: 2, 
    user: "sarah@example.com", 
    bot: "FAQ Assistant", 
    messages: 5, 
    lastMessage: "15 minutes ago", 
    status: "resolved",
    platform: "telegram", 
    lastMsg: "Thank you for the help!"
  },
  { 
    id: 3, 
    user: "mike@example.com", 
    bot: "Order Tracker", 
    messages: 8, 
    lastMessage: "1 hour ago", 
    status: "pending",
    platform: "slack",
    lastMsg: "Where is my order #12345?"
  },
  { 
    id: 4, 
    user: "anna@example.com", 
    bot: "Support Bot", 
    messages: 15, 
    lastMessage: "3 hours ago", 
    status: "resolved",
    platform: "discord",
    lastMsg: "Issue has been resolved, thanks!"
  },
];

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState(dummyConversations);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await api.get("/api/messages");
        if (Array.isArray(res.data)) {
          setConversations(res.data);
        } else {
          throw new Error("Invalid format");
        }
      } catch (error) {
        console.warn("Using dummy conversations due to fetch error:", error);
        toast({ title: "⚠️ Failed to load conversations, using fallback", variant: "default" });
        setConversations(dummyConversations);
      }
    };
    fetchConversations();
  }, []);

  const filteredConversations = conversations.filter(conv =>
    conv.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.bot.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMsg.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      discord: "🎮",
      telegram: "📱",
      slack: "💬",
      twitch: "🎥"
    };
    return icons[platform.toLowerCase()] || "🤖";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800';
      case 'resolved': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-800';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent mb-2">
            Messages
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            View and manage bot conversations across all platforms
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-border focus:border-primary text-sm sm:text-base"
            />
          </div>
          <Button variant="outline" className="hover:bg-muted/50 text-sm sm:text-base px-3 sm:px-4 py-2">
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Conversations List */}
        <div className="grid gap-3 sm:gap-4">
          {filteredConversations.map((conv, index) => (
            <Card key={conv.id} className="border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${(index + 2) * 100}ms` }}>
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg text-foreground truncate">{conv.user}</CardTitle>
                      <CardDescription className="flex items-center text-muted-foreground text-sm sm:text-base mt-1">
                        <span className="mr-2 text-base sm:text-lg">{getPlatformIcon(conv.platform)}</span>
                        <Bot className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="truncate">{conv.bot}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end">
                    <Badge 
                      variant="outline"
                      className={`${getStatusColor(conv.status)} border font-medium capitalize text-xs sm:text-sm px-2 sm:px-3 py-1`}
                    >
                      {conv.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-3 sm:mb-4">
                  <p className="text-foreground/80 italic text-sm sm:text-base line-clamp-2">
                    "{conv.lastMsg}"
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                      {conv.messages} messages
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      {conv.lastMessage}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-primary/5 hover:text-primary hover:border-primary/30 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 self-end sm:self-auto">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">View Conversation</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredConversations.length === 0 && searchTerm && (
          <Card className="border bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "300ms" }}>
            <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6">
              <Search className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No conversations found</h3>
              <p className="text-muted-foreground text-center max-w-md text-sm sm:text-base">
                No conversations match your search criteria. Try adjusting your search terms.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Messages;
