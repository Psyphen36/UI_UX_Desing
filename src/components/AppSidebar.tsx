
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  Bot, BarChart3, Settings, Users, MessageSquare, CreditCard, Shield,
  Sparkles, Activity, TrendingUp, ChevronLeft, ChevronRight, Zap, Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { BotinoLogo } from "./BotinoLogo";
import { cn } from "@/lib/utils";

const userMenuItems = [
  { 
    title: "Dashboard", 
    url: "/dashboard", 
    icon: BarChart3,
    gradient: "from-emerald-400 to-emerald-600",
    description: "Overview & stats"
  },
  { 
    title: "My Bots", 
    url: "/dashboard/bots", 
    icon: Bot,
    gradient: "from-cyan-400 to-cyan-600",
    description: "Manage AI assistants"
  },
  { 
    title: "Analytics", 
    url: "/dashboard/analytics", 
    icon: TrendingUp,
    gradient: "from-blue-400 to-blue-600",
    description: "Performance insights"
  },
  { 
    title: "Messages", 
    url: "/dashboard/messages", 
    icon: MessageSquare,
    gradient: "from-purple-400 to-purple-600",
    description: "Chat history"
  },
  { 
    title: "Settings", 
    url: "/dashboard/settings", 
    icon: Settings,
    gradient: "from-indigo-400 to-indigo-600",
    description: "Account preferences"
  },
  { 
    title: "Billing", 
    url: "/dashboard/billing", 
    icon: CreditCard,
    gradient: "from-orange-400 to-orange-600",
    description: "Plans & usage"
  },
];

const adminMenuItems = [
  { 
    title: "Admin Panel", 
    url: "/admin", 
    icon: Shield,
    gradient: "from-red-400 to-red-600",
    description: "System control"
  },
  { 
    title: "All Users", 
    url: "/admin/users", 
    icon: Users,
    gradient: "from-green-400 to-green-600",
    description: "User management"
  },
  { 
    title: "System Stats", 
    url: "/admin/stats", 
    icon: Activity,
    gradient: "from-yellow-400 to-yellow-600",
    description: "Performance metrics"
  },
  { 
    title: "Logs", 
    url: "/admin/logs", 
    icon: Database,
    gradient: "from-pink-400 to-pink-600",
    description: "System activity"
  },
];

export function AppSidebar() {
  const { state, setOpenMobile } = useSidebar();
  const location = useLocation();
  const { isAdmin } = useAuth();
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  
  const isAdminRoute = location.pathname.startsWith('/admin');
  const menuItems = isAdminRoute ? adminMenuItems : userMenuItems;
  const minWidth = 240;
  const maxWidth = 400;
  const collapsedWidth = 80;

  // Handle drag resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, minWidth, maxWidth]);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path: string) => location.pathname === path;
  
  const currentWidth = isCollapsed ? collapsedWidth : sidebarWidth;

  const MenuItem = ({ item }: { item: typeof userMenuItems[0] }) => {
    const active = isActive(item.url);
    const content = (
      <Link 
        to={item.url} 
        className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
          active 
            ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white shadow-lg shadow-emerald-500/10" 
            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
        )}
      >
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0",
          active 
            ? `bg-gradient-to-r ${item.gradient}` 
            : "bg-slate-800/50 group-hover:bg-slate-700"
        )}>
          <item.icon className="h-4 w-4 text-white" />
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{item.title}</div>
            <div className="text-xs text-slate-500 truncate">{item.description}</div>
          </div>
        )}
        {active && (
          <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-l-full" />
        )}
      </Link>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              {content}
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-slate-800 text-white border-slate-700">
              <div className="font-medium">{item.title}</div>
              <div className="text-xs text-slate-400">{item.description}</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return content;
  };

  return (
    <div 
      ref={sidebarRef}
      className="relative h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800/50 flex flex-col"
      style={{ width: currentWidth }}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800/50">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300 shrink-0">
            <BotinoLogo variant="compact" size="sm" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Botino
              </h2>
              <p className="text-xs text-slate-500">AI Command Center</p>
            </div>
          )}
        </Link>
      </div>

      {/* Toggle Button */}
      <div className="p-4 border-b border-slate-800/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className="w-full justify-center p-2 hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Main Menu */}
        <div>
          {!isCollapsed && (
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
              {isAdminRoute ? "Admin Zone" : "Main"}
            </div>
          )}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <MenuItem key={item.title} item={item} />
            ))}
          </div>
        </div>

        {/* Admin Access */}
        {!isAdminRoute && isAdmin() && (
          <div>
            {!isCollapsed && (
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
                Admin Access
              </div>
            )}
            <MenuItem item={{
              title: "Admin Panel",
              url: "/admin",
              icon: Shield,
              gradient: "from-red-400 to-red-600",
              description: "System control"
            }} />
          </div>
        )}

        {/* Pro Plan Card */}
        {!isCollapsed && (
          <div className="mt-auto">
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl p-4 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Pro Plan</h4>
                  <p className="text-slate-400 text-xs">Unlimited bots</p>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-medium text-xs h-8 rounded-lg shadow-lg transition-all duration-300">
                <Zap className="h-3 w-3 mr-1" />
                Upgrade
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Resize Handle */}
      {!isCollapsed && (
        <div
          ref={resizeRef}
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-emerald-500/50 transition-colors duration-200 group"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-slate-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="w-0.5 h-4 bg-slate-400 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
