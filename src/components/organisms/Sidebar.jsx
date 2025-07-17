import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import NavItem from "@/components/molecules/NavItem";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onToggle }) => {
  const [quotesCount] = useState(12);

  const navItems = [
    { to: "/", icon: "LayoutDashboard", label: "Dashboard" },
    { to: "/quotes", icon: "FileText", label: "Quotes", badge: quotesCount },
    { to: "/property-analysis", icon: "MapPin", label: "Property Analysis" },
    { to: "/settings", icon: "Settings", label: "Settings" },
    { to: "/system-status", icon: "Activity", label: "System Status" }
  ];

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:block w-64 sidebar-gradient min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-white/20 p-2 rounded-lg">
            <ApperIcon name="Sparkles" className="h-6 w-6 text-accent-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">QuoteGenie Pro</h1>
            <p className="text-sm text-primary-100">Yule Love Lights</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
      </div>
    </div>
  );

  // Mobile sidebar
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="lg:hidden fixed left-0 top-0 w-64 sidebar-gradient h-full z-50"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <ApperIcon name="Sparkles" className="h-6 w-6 text-accent-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">QuoteGenie Pro</h1>
                <p className="text-sm text-primary-100">Yule Love Lights</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="text-white/80 hover:text-white p-2"
            >
              <ApperIcon name="X" className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;