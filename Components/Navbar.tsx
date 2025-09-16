"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, User, LogIn, LogOut, UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../lib/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Chat", href: "/chat" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between py-4">
        <div>
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Lexpertease Logo"
              width={140}
              height={47}
              priority
              className="h-12 w-auto"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 text-gray-700 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className="hover:text-[#0F8BDB] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Auth Section */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-gray-700 hover:text-[#0F8BDB] transition-colors duration-200 px-4 py-2 rounded-lg"
              >
                <UserCircle className="w-5 h-5" />
                <span className="font-medium">{user.firstName}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button asChild variant="ghost" className="flex items-center gap-2 text-gray-700 hover:text-[#0F8BDB] transition-colors duration-200 px-4 py-2 rounded-lg">
                <Link href="/login">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              </Button>
              <Button asChild className="flex items-center gap-2 bg-[#0F8BDB] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                <Link href="/signup">
                  <User className="w-4 h-4" />
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-[#0F8BDB] transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="py-4 px-6 space-y-3">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block text-gray-700 hover:text-[#0F8BDB] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              {isAuthenticated && user ? (
                <>
                  <div className="py-2">
                    <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors py-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" className="flex items-center gap-2 text-gray-700 hover:text-[#0F8BDB] transition-colors py-2">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <LogIn className="w-4 h-4" />
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="flex items-center gap-2 bg-[#0F8BDB] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-fit">
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <User className="w-4 h-4" />
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
