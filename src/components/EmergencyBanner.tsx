
import React from 'react';
import { Bell } from 'lucide-react';

interface EmergencyBannerProps {
  count: number;
}

const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ count }) => {
  if (count === 0) return null;
  
  return (
    <div className="bg-healthcare-emergency text-white py-3 px-4 rounded-lg mb-6 animate-pulse-alert flex items-center gap-3">
      <Bell className="h-5 w-5" />
      <div>
        <span className="font-bold">{count} Emergency Case{count > 1 ? 's' : ''}</span>
        <span className="ml-2 text-sm">requiring immediate attention</span>
      </div>
    </div>
  );
};

export default EmergencyBanner;
