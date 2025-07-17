
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  Settings, 
  User,
  ChevronDown
} from "lucide-react";
import { BotinoLogo } from "./BotinoLogo";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // If user is logged in, show dashboard navbar
  if (user) {
    return (
      <nav className="nav-blur border-b border-cyan-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <BotinoLogo variant="compact" size="sm" />
                <span className="text-xl font-bold text-white hidden sm:block">Botino</span>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search bots, analytics..."
                  className="block w-full pl-10 pr-3 py-2 border border-cyan-500/20 rounded-lg bg-slate-900/60 backdrop-blur-sm text-sm placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10">
                    Pages
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-900 border-cyan-500/20">
                  <DropdownMenuItem asChild>
                    <Link to="/features">Features</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/pricing">Pricing</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/blog">Blog</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/contact">Contact</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/dev-docs">Dev Docs</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex relative h-9 w-9 rounded-full hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 h-9 px-3 rounded-full hover:bg-cyan-500/10">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium text-slate-300">
                      {user?.email?.split('@')[0] || 'User'}
                    </span>
                    <ChevronDown className="h-3 w-3 text-slate-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-900/95 backdrop-blur-sm border-cyan-500/20">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings" className="flex items-center text-slate-300 hover:text-cyan-400">
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/billing" className="flex items-center text-slate-300 hover:text-cyan-400">
                      <Settings className="mr-2 h-4 w-4" />
                      Billing & Usage
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-cyan-500/20" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9 rounded-full hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"

          )}>
            <div className="py-4 space-y-4 border-t border-cyan-500/20">
              {/* Mobile Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search bots, analytics..."
                  className="block w-full pl-10 pr-3 py-2 border border-cyan-500/20 rounded-lg bg-slate-900/60 backdrop-blur-sm text-sm placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <Link
                to="/dev-docs"
                className="flex items-center px-3 py-2 text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dev Docs
            </Link>
              {/* Mobile Menu Items */}
              <div className="space-y-2">
                <Link
                  to="/dashboard/settings"
                  className="flex items-center px-3 py-2 text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="mr-3 h-4 w-4" />
                  Profile Settings
                </Link>
                <Link
                  to="/dashboard/billing"
                  className="flex items-center px-3 py-2 text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Billing & Usage
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-md transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Default navbar for non-authenticated users
  return (
    <nav className="nav-blur border-b border-cyan-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300" onClick={closeMobileMenu}>
            <BotinoLogo variant="compact" size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/features"
              className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/blog"
              className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
            >
              Blog
            </Link>
            <Link
              to="/demo"
              className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
            >
              Demo
            </Link>
            <Link
              to="/contact"
              className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="btn-gradient">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="py-4 space-y-4 border-t border-cyan-500/20">
            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <Link
                to="/features"
                className="block text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
                onClick={closeMobileMenu}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="block text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>
              <Link
                to="/blog"
                className="block text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
                onClick={closeMobileMenu}
              >
                Blog
              </Link>
              <Link
                to="/demo"
                className="block text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
                onClick={closeMobileMenu}
              >
                Demo
              </Link>
              <Link
                to="/contact"
                className="block text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="space-y-3">
                <Button variant="ghost" asChild className="w-full text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 justify-start">
                  <Link to="/login" onClick={closeMobileMenu}>Login</Link>
                </Button>
                <Button asChild className="w-full btn-gradient">
                  <Link to="/signup" onClick={closeMobileMenu}>Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
