
import React from 'react';
import { toast } from "@/components/ui/sonner";
import { LogOut, User, Settings, ShieldAlert, HelpCircle } from 'lucide-react';

interface SidebarActionProps {
  icon: React.ReactElement;
  label: string;
  action: () => void;
}

export const SidebarAction: React.FC<SidebarActionProps> = ({ icon, label, action }) => {
  return (
    <button 
      onClick={action}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
};

export const handleSettingsClick = () => {
  toast.success("Settings opened");
};

export const handleSecurityClick = () => {
  toast.success("Security settings accessed");
};

export const handleHelpClick = () => {
  toast.success("Help center opened");
};

export const handleProfileClick = () => {
  toast.success("Profile settings accessed");
};

export const handleLogout = () => {
  toast.success("You've been logged out");
};

export const SidebarActions = () => {
  return (
    <div className="space-y-1 mt-2">
      <SidebarAction
        icon={<Settings className="w-4 h-4" />}
        label="Settings"
        action={handleSettingsClick}
      />
      <SidebarAction
        icon={<ShieldAlert className="w-4 h-4" />}
        label="Security"
        action={handleSecurityClick}
      />
      <SidebarAction
        icon={<HelpCircle className="w-4 h-4" />}
        label="Help Centre"
        action={handleHelpClick}
      />
      <SidebarAction
        icon={<User className="w-4 h-4" />}
        label="Profile"
        action={handleProfileClick}
      />
      <SidebarAction
        icon={<LogOut className="w-4 h-4" />}
        label="Log Out"
        action={handleLogout}
      />
    </div>
  );
};
