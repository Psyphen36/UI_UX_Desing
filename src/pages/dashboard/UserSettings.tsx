
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, Bell, Shield, CreditCard, Globe, Eye, Moon, Sun, Smartphone, Mail, Key, Trash2, Save, Upload, Camera, Edit3, Sparkles, Zap, Lock, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BotinoLogo } from "@/components/BotinoLogo";

const UserSettings = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg"
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    showActivity: true,
    dataCollection: false
  });
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleProfileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/upload-profile-picture", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Upload failed");
      }

      const data = await response.json();
      setUser((prev) => ({ ...prev, avatar: data.url }));

      toast({
        title: "Profile picture updated",
        description: "Your profile image has been uploaded.",
      });
    } catch (error: any) {
      // fallback mode: fake upload for devs
      console.warn("Upload failed — fallback dummy image used");
      const fakeURL = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, avatar: fakeURL }));

      toast({
        title: "⚠️ Upload Error (Using Fallback)",
        description: "This is a local preview only. Real upload failed.",
        variant: "default",
      });
    }
  };


  return (
    <div className="min-h-screen bg-black">
      {/* Header Section - Similar to reference */}
      <div className="bg-gradient-to-br from-black via-slate-900/50 to-black border-b border-primary/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <BotinoLogo variant="compact" size="sm" />
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Avatar className="h-10 w-10 border-2 border-primary/30">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          {/* User Profile Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-primary/30 shadow-xl">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-2xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-green-500 h-6 w-6 rounded-full border-4 border-black"></div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Account Settings</p>
                <h1 className="text-4xl font-bold text-white mb-2">{user.name}</h1>
                <p className="text-muted-foreground text-sm">
                  {user.email} • Premium Member • Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">

        <div className="space-y-6 sm:space-y-8">
          {/* Profile Section */}
          <Card className="border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl">
                <div className="p-2 rounded-lg sm:rounded-xl bg-primary">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                Profile Information
              </CardTitle>
              <CardDescription className="text-sm sm:text-base lg:text-lg">
                Update your personal information and profile settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="relative group self-center sm:self-start">
                  <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-primary/20 shadow-lg group-hover:border-primary/40 transition-all duration-300">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-lg sm:text-2xl font-bold bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 rounded-full h-6 w-6 sm:h-8 sm:w-8 p-0 bg-primary hover:bg-primary/90 hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleProfileUpload}
                  />
                </div>
                <div className="flex-1 space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs sm:text-sm font-semibold">Full Name</Label>
                      <Input
                        id="name"
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                        className="bg-muted/50 border-border focus:border-primary transition-colors duration-300 text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs sm:text-sm font-semibold">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        className="bg-muted/50 border-border focus:border-primary transition-colors duration-300 text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl">
                <div className="p-2 rounded-lg sm:rounded-xl bg-primary">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                Notifications
              </CardTitle>
              <CardDescription className="text-sm sm:text-base lg:text-lg">
                Configure how you want to receive updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base">Email Notifications</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    className="scale-90 sm:scale-100"
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base">Push Notifications</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Receive push notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    className="scale-90 sm:scale-100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl">
                <div className="p-2 rounded-lg sm:rounded-xl bg-primary">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                Privacy & Security
              </CardTitle>
              <CardDescription className="text-sm sm:text-base lg:text-lg">
                Manage your privacy and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base">Public Profile</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Make your profile visible to others</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacy.profilePublic}
                    onCheckedChange={(checked) => setPrivacy({...privacy, profilePublic: checked})}
                    className="scale-90 sm:scale-100"
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base">Two-Factor Authentication</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:border-primary text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                    Enable
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-center sm:justify-end animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground group px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Save className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
