
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  title: string;
  role: "doctor" | "nurse";
  username: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, role, username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // We would normally sign out using Firebase here
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm mb-6">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Menu className="h-6 w-6 text-healthcare-secondary md:hidden" />
          <h1 className="text-xl font-semibold text-healthcare-secondary">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-right mr-2 hidden sm:block">
            <p className="text-sm font-medium">{username}</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
          
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5 text-healthcare-secondary" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
