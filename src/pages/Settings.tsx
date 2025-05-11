
import React from "react";
import { DashboardLayout } from "@/components/dashboard";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
        
        <div className="bg-[#151515]/80 border border-[#333333] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-[#8E9196]">Email</label>
              <input 
                type="email" 
                value="max.guenther@example.com" 
                readOnly
                className="w-full bg-[#1A1F2C] border border-[#2B2E3D] rounded-md px-4 py-2 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-[#8E9196]">Password</label>
              <input 
                type="password" 
                value="••••••••••" 
                readOnly
                className="w-full bg-[#1A1F2C] border border-[#2B2E3D] rounded-md px-4 py-2 text-white"
              />
              <button className="text-sm text-[#2751B9] hover:text-[#3962c8]">Change password</button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#8E9196]">Two-factor authentication</span>
              <div className="w-10 h-5 bg-[#3F51B5] rounded-full relative">
                <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-5 transform transition-transform"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#8E9196]">Email notifications</span>
              <div className="w-10 h-5 bg-[#3F51B5] rounded-full relative">
                <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-5 transform transition-transform"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-[#151515]/80 border border-[#333333] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">App Preferences</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#8E9196]">Dark Mode</span>
              <div className="w-10 h-5 bg-[#3F51B5] rounded-full relative">
                <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-5 transform transition-transform"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#8E9196]">Gen Z Mode</span>
              <div className="w-10 h-5 bg-[#222222] rounded-full relative">
                <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5 transform transition-transform"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-[#8E9196]">Language</label>
              <select className="w-full bg-[#1A1F2C] border border-[#2B2E3D] rounded-md px-4 py-2 text-white">
                <option>English (US)</option>
                <option>German</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
