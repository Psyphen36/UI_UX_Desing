
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Info, Bot, Zap, Shield, ExternalLink, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import api from "@/api/axios"

interface CreateBotModalProps {
  open: boolean;
  onClose: () => void;
  onBotCreated: () => void;
}

const platformFields: Record<string, { required: string[], optional: string[] }> = {
  Discord: {
    required: ["DISCORD_BOT_TOKEN"],
    optional: ["DISCORD_ALLOWED_GUILDS", "DISCORD_ALLOWED_CHANNELS"]
  },
  Telegram: {
    required: ["TELEGRAM_BOT_TOKEN"],
    optional: ["TELEGRAM_ALLOWED_GROUPS", "TELEGRAM_ALLOW_PRIVATE_MESSAGES"]
  },
  Slack: {
    required: ["SLACK_BOT_TOKEN", "SLACK_APP_TOKEN", "SLACK_SIGNING_SECRET"],
    optional: []
  },
  Twitch: {
    required: ["TWITCH_OAUTH", "TWITCH_CHANNEL"],
    optional: []
  }
};

const CreateBotModal: React.FC<CreateBotModalProps> = ({ open, onClose, onBotCreated }) => {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [aiCredentials, setAiCredentials] = useState<Record<string, string>>({
    SHAPESINC_API_KEY: "",
    SHAPESINC_SHAPE_USERNAME: "",
    SHAPESINC_APP_ID: ""
  });
  const trimmedName = name.trim();
  const cleanedCredentials = Object.fromEntries(
    Object.entries({ ...aiCredentials, ...credentials }).map(([key, val]) => [key, val.trim()])
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialChange = (key: string, value: string) => {
    setCredentials(prev => ({ ...prev, [key]: value }));
  };

  const handleAiCredentialChange = (key: string, value: string) => {
    setAiCredentials(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !platform) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    if (!aiCredentials.SHAPESINC_API_KEY || !aiCredentials.SHAPESINC_SHAPE_USERNAME) {
      toast({ title: "Missing AI credentials", description: "Shapes.inc API key and username are required.", variant: "destructive" });
      return;
    }

    // Check required platform fields
    const fields = platformFields[platform];
    if (fields) {
      for (const requiredField of fields.required) {
        if (!credentials[requiredField]) {
          toast({ title: "Missing credentials", description: `${requiredField} is required for ${platform}.`, variant: "destructive" });
          return;
        }
      }
    }

    setIsLoading(true);

    try {
      // Combine AI credentials with platform credentials
      await api.post("/api/bots", {
        name: trimmedName,
        platform: platform.toLowerCase(),
        credentials: cleanedCredentials,
      });
      toast({ title: "Bot created!", description: `Your ${platform} bot is ready.` });
      onBotCreated();
      resetForm();
      onClose();
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.detail || "Could not create bot.";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPlatform("");
    setCredentials({});
    setAiCredentials({
      SHAPESINC_API_KEY: "",
      SHAPESINC_SHAPE_USERNAME: "",
      SHAPESINC_APP_ID: ""
    });
  };

  const getPlatformTheme = (platform: string) => {
    const themes: Record<string, { 
      gradient: string, 
      icon: string, 
      accent: string,
      description: string,
      color: string 
    }> = {
      Discord: { 
        gradient: "from-indigo-500 via-purple-500 to-pink-500", 
        icon: "🎮", 
        accent: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
        description: "Perfect for gaming communities and server management",
        color: "indigo"
      },
      Telegram: { 
        gradient: "from-blue-400 via-cyan-500 to-teal-500", 
        icon: "📱", 
        accent: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
        description: "Ideal for messaging groups and channel automation",
        color: "cyan"
      },
      Slack: { 
        gradient: "from-green-400 via-emerald-500 to-teal-600", 
        icon: "💬", 
        accent: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        description: "Great for team collaboration and workspace automation",
        color: "emerald"
      },
      Twitch: { 
        gradient: "from-purple-500 via-violet-600 to-purple-700", 
        icon: "🎥", 
        accent: "border-purple-500/30 bg-purple-500/10 text-purple-300",
        description: "Stream management and viewer engagement",
        color: "purple"
      }
    };
    return themes[platform] || { 
      gradient: "from-slate-500 to-slate-600", 
      icon: "🤖", 
      accent: "border-slate-500/30 bg-slate-500/10 text-slate-300",
      description: "Universal bot configuration",
      color: "slate"
    };
  };

  const fields = platformFields[platform];
  const theme = getPlatformTheme(platform);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-slate-900/95 backdrop-blur-xl border border-slate-700/50">
        <div className="overflow-y-auto max-h-[85vh] pr-2">
          <DialogHeader className="pb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-3 rounded-2xl">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Create New Bot
                </DialogTitle>
                <p className="text-slate-400 text-sm mt-1">Deploy an AI-powered bot across your favorite platforms</p>
              </div>
            </div>
            
            {platform && (
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${theme.gradient} p-6 text-white`}>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-3xl">{theme.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold">{platform} Bot</h3>
                      <p className="text-white/80 text-sm">{theme.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {platform} Integration
                  </Badge>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              </div>
            )}
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Configuration */}
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-slate-700/50 p-2 rounded-xl">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Basic Configuration</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium">Bot Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Customer Support Bot"
                    required
                    className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium">Platform</Label>
                  <select
                    value={platform}
                    onChange={(e) => {
                      setPlatform(e.target.value);
                      setCredentials({});
                    }}
                    required
                    className="flex h-10 w-full rounded-xl border border-slate-600/50 bg-slate-800/50 px-3 py-2 text-white placeholder:text-slate-400 focus:border-emerald-500/50 focus:ring-emerald-500/20 focus:outline-none"
                  >
                    <option value="" className="bg-slate-800 text-slate-400">Select a platform</option>
                    {Object.keys(platformFields).map((plat) => (
                      <option key={plat} value={plat} className="bg-slate-800 text-white">
                        {plat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700/50">
                <TabsTrigger 
                  value="ai" 
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  AI Configuration
                </TabsTrigger>
                <TabsTrigger 
                  value="platform" 
                  disabled={!platform}
                  className={`data-[state=active]:bg-${theme.color}-600 data-[state=active]:text-white`}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {platform || "Platform"} Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai" className="mt-6">
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-500/20 p-2 rounded-xl">
                        <Zap className="h-5 w-5 text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">AI Intelligence</h3>
                    </div>
                    <a 
                      href="https://shapes.inc" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                    >
                      Get API Key <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  
                  <Alert className="mb-6 bg-emerald-500/10 border-emerald-500/30 text-emerald-100">
                    <Info className="h-4 w-4 text-emerald-400" />
                    <AlertDescription>
                      Connect your Shapes.inc account to power your bot with advanced AI capabilities. 
                      Create an account at shapes.inc to get your credentials.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium flex items-center gap-2">
                        API Key <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        type="password"
                        placeholder="sk-..."
                        value={aiCredentials.SHAPESINC_API_KEY}
                        onChange={(e) => handleAiCredentialChange("SHAPESINC_API_KEY", e.target.value)}
                        required
                        className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium flex items-center gap-2">
                        Shape Username <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        placeholder="your_bot_username"
                        value={aiCredentials.SHAPESINC_SHAPE_USERNAME}
                        onChange={(e) => handleAiCredentialChange("SHAPESINC_SHAPE_USERNAME", e.target.value)}
                        required
                        className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <Label className="text-slate-300 font-medium">App ID (Optional)</Label>
                      <Input
                        placeholder="your_app_id"
                        value={aiCredentials.SHAPESINC_APP_ID}
                        onChange={(e) => handleAiCredentialChange("SHAPESINC_APP_ID", e.target.value)}
                        className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="platform" className="mt-6">
                {platform && fields && (
                  <div className={`bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`bg-${theme.color}-500/20 p-2 rounded-xl`}>
                          <Shield className={`h-5 w-5 text-${theme.color}-400`} />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{platform} Integration</h3>
                      </div>
                    </div>
                    
                    <Alert className={`mb-6 bg-${theme.color}-500/10 border-${theme.color}-500/30 text-${theme.color}-100`}>
                      <Info className={`h-4 w-4 text-${theme.color}-400`} />
                      <AlertDescription>
                        {platform === "Discord" && "Get your bot token from Discord Developer Portal. Create a new application and bot."}
                        {platform === "Telegram" && "Get your bot token from @BotFather on Telegram."}
                        {platform === "Slack" && "Get your tokens from Slack API portal when creating a new app."}
                        {platform === "Twitch" && "Get OAuth token from Twitch Developer Console."}
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                          Required Credentials
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {fields.required.map((field) => (
                            <div key={field} className="space-y-3">
                              <Label className="text-slate-300 font-medium flex items-center gap-2">
                                {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                                <span className="text-red-400">*</span>
                              </Label>
                              <Input
                                type={field.includes('TOKEN') || field.includes('SECRET') ? 'password' : 'text'}
                                placeholder={`Enter ${field}`}
                                value={credentials[field] || ""}
                                onChange={(e) => handleCredentialChange(field, e.target.value)}
                                required
                                className={`bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-${theme.color}-500/50 focus:ring-${theme.color}-500/20`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {fields.optional.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <Info className="h-4 w-4 text-slate-400" />
                            Optional Settings
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fields.optional.map((field) => (
                              <div key={field} className="space-y-3">
                                <Label className="text-slate-300 font-medium">
                                  {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Label>
                                <Input
                                  placeholder={`Enter ${field} (optional)`}
                                  value={credentials[field] || ""}
                                  onChange={(e) => handleCredentialChange(field, e.target.value)}
                                  className={`bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-${theme.color}-500/50 focus:ring-${theme.color}-500/20`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex gap-4 pt-6 border-t border-slate-700/50">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className={platform ? 
                  `bg-gradient-to-r ${theme.gradient} hover:opacity-90 text-white font-semibold px-8 shadow-lg` :
                  "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold px-8 shadow-lg"
                }
              >
                {isLoading ? (
                  <>Creating Bot...</>
                ) : (
                  <>
                    <Bot className="h-4 w-4 mr-2" />
                    Create {platform} Bot
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBotModal;
