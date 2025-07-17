
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import StudentSidebar from "./StudentSidebar";
import Header from "./Header";
import { useUser } from "@/contexts/UserContext";

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Default to closed on mobile, open on desktop
    return window.innerWidth >= 768;
  });
  const location = useLocation();
  const { userName } = useUser();
  
  useEffect(() => {
    // Close sidebar on mobile when route changes
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);
  
  useEffect(() => {
    // Update sidebar state when window is resized
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check for dark mode preference on component mount
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden dark:bg-slate-950">
      <StudentSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-grow overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow px-2 py-2 sm:p-4 md:p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
