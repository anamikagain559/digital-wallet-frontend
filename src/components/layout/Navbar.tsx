import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggler";
import { Link, useLocation } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import React from "react";

const navigationLinks = [
  { href: "#", label: "Personal", role: "PUBLIC", hasDropdown: true },
  { href: "#", label: "Business", role: "PUBLIC" },
  { href: "#", label: "Developers", role: "PUBLIC" },
  { href: "#", label: "Help", role: "PUBLIC" },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  const activeLink = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4 pointer-events-none">
      <nav className="container mx-auto max-w-7xl pointer-events-auto">
        <div className="relative flex items-center justify-between h-16 px-8 bg-transparent dark:bg-transparent transition-all duration-300">
          
          {/* Logo Section */}
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigationLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.href}
                  className="flex items-center gap-1.5 text-[15px] font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg className="size-3 mt-0.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-8">
            <div className="hidden sm:block">
              <ModeToggle />
            </div>

            <div className="flex items-center gap-6">
              {!data?.data?.email ? (
                <>
                  <Link to="/login" className="text-[15px] font-bold text-zinc-800 dark:text-zinc-200 hover:text-blue-600 transition-colors">
                    Login
                  </Link>
                  <Button asChild className="h-11 px-8 bg-[#00aeef] hover:bg-[#009bd4] text-white rounded-[12px] shadow-[0_8px_16px_rgba(0,174,239,0.3)] transition-all font-bold text-[15px]">
                    <Link to="/login">Sign Up</Link>
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={handleLogout}
                    variant="ghost" 
                    className="h-10 text-zinc-600 dark:text-zinc-400 font-bold text-sm"
                  >
                    Logout
                  </Button>
                  <Button asChild className="h-11 px-8 bg-[#00aeef] text-white rounded-[12px] font-bold">
                    <Link to={data?.data?.role === role.admin ? "/admin" : data?.data?.role === role.agent ? "/agent" : "/user"}>
                      Dashboard
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden rounded-lg text-zinc-600 dark:text-zinc-400 size-9"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 left-4 right-4 lg:hidden p-4 rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-white/20 dark:border-zinc-800 shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navigationLinks.map((link, index) => {
                  const isPublic = link.role === "PUBLIC";
                  const isUserRole = link.role === data?.data?.role;
                  
                  if (!isPublic && !isUserRole) return null;

                  return (
                    <Link 
                      key={index}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                        activeLink(link.href)
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <span className="font-bold text-lg">{link.label}</span>
                      {activeLink(link.href) && <motion.div layoutId="mobile-indicator" className="w-1.5 h-1.5 bg-blue-600 rounded-full" />}
                    </Link>
                  );
                })}
                <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2" />
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm font-bold text-zinc-500 ml-2">App Theme</span>
                  <ModeToggle />
                </div>
                {data?.data?.email && (
                  <Button 
                    onClick={handleLogout}
                    variant="ghost" 
                    className="w-full justify-start gap-3 h-14 px-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl font-bold"
                  >
                    <LogOut className="size-5" />
                    Logout Account
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}