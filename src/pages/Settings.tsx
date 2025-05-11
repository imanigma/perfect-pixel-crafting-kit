import React from "react";
import { DashboardLayout } from "@/components/dashboard";
import { usePythonBackend } from "@/hooks/usePythonBackend";
import { toast } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

const Settings = () => {
  const {
    inputData,
    setInputData,
    handleSubmit,
    isProcessing,
    connectionStatus,
    testConnection
  } = usePythonBackend();

  const handleTestConnection = async () => {
    toast.info("Testing connection to Python backend...");
    const isConnected = await testConnection();
    
    if (isConnected) {
      toast.success("Connection to Python backend successful!");
    } else {
      toast.error("Failed to connect to Python backend! Make sure your Python server is running on port 8078.");
    }
  };

  // Helper function to get status indicator color
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-500';
      case 'disconnected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500 animate-pulse';
    }
  };

  // Helper function to get status text
  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Checking connection...';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
        
        <div className="bg-[#151515]/80 border border-[#333333] rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Python Backend Connection</h2>
          <div className="flex items-center space-x-4 mb-6">
            <div className={`h-3 w-3 rounded-full ${getStatusColor()}`}></div>
            <span className="text-white">Backend Status: {getStatusText()}</span>
            {connectionStatus === 'checking' && <Loader2 className="h-4 w-4 animate-spin text-white" />}
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-sm text-[#8E9196]">
              Make sure your Python Flask server is running at <span className="font-mono bg-black/30 px-2 py-1 rounded">localhost:8078</span>. 
              The voice assistant requires this backend to be active.
            </p>
            
            <p className="text-sm text-[#8E9196]">
              Set the environment variable <span className="font-mono bg-black/30 px-2 py-1 rounded">VITE_PYTHON_BACKEND_URL</span> to
              your Python server URL (default: http://localhost:8078).
            </p>
          </div>
          
          <button 
            onClick={handleTestConnection}
            className="px-4 py-2 bg-[#2751B9] text-white rounded hover:bg-[#3962c8] transition-colors"
          >
            Test Connection
          </button>
        </div>
        
        {/* Voice Assistant settings */}
        <div className="bg-[#151515]/80 border border-[#333333] rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Voice Assistant Settings</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#8E9196]">Gen Z Mode</span>
              <div className="w-10 h-5 bg-[#222222] rounded-full relative">
                <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5 transform transition-transform"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-[#8E9196]">Voice Speed</label>
              <input 
                type="range" 
                min="0.5" 
                max="2" 
                step="0.1" 
                defaultValue="1" 
                className="w-full bg-[#1A1F2C] rounded-md" 
              />
            </div>
          </div>
        </div>
        
        {/* Example of sending data to Python backend */}
        <div className="bg-[#151515]/80 border border-[#333333] rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Python Backend Example</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-[#8E9196]">Generate chart with Python</label>
              <input 
                type="text" 
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Enter chart description"
                className="w-full bg-[#1A1F2C] border border-[#2B2E3D] rounded-md px-4 py-2 text-white"
              />
            </div>
            
            <button 
              onClick={handleSubmit}
              disabled={isProcessing || !inputData.trim() || connectionStatus !== 'connected'}
              className={`px-4 py-2 bg-[#2751B9] text-white rounded transition-colors ${
                isProcessing || !inputData.trim() || connectionStatus !== 'connected' 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-[#3962c8]'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Generate Chart'}
            </button>
          </div>
        </div>
        
        {/* Keep the rest of the settings page */}
        <div className="mt-8 bg-[#151515]/80 border border-[#333333] rounded-xl p-6 shadow-lg">
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
