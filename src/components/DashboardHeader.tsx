
import React, { ReactNode } from 'react';
import { Menu } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  username?: string;
  role?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle, children }) => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm mb-6">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Menu className="h-6 w-6 text-healthcare-secondary md:hidden" />
          <div>
            <h1 className="text-xl font-semibold text-healthcare-secondary">
              {title}
            </h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {children}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
