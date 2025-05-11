
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { pythonBackendService } from '@/services/pythonBackendService';

/**
 * Hook to interact with Python backend services
 */
export function usePythonBackend() {
  const [inputData, setInputData] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  // Check connection to Python backend on mount
  useEffect(() => {
    const checkBackendConnection = async () => {
      setConnectionStatus('checking');
      try {
        const isConnected = await pythonBackendService.checkConnection();
        setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      } catch (error) {
        setConnectionStatus('disconnected');
      }
    };
    
    checkBackendConnection();
    
    // Set up periodic connection check
    const checkInterval = setInterval(checkBackendConnection, 30000); // Check every 30 seconds
    
    return () => clearInterval(checkInterval);
  }, []);

  // Query to get data from Python backend
  const { data: financialData, isLoading, error } = useQuery({
    queryKey: ['financialData'],
    queryFn: () => pythonBackendService.getFinancialData(),
    enabled: connectionStatus === 'connected',
  });

  // Mutation to send data to Python backend for chart generation
  const { mutate: processInput, isPending: isProcessing } = useMutation({
    mutationFn: (input: string) => pythonBackendService.getChartData(input),
    onSuccess: (data) => {
      console.log('Chart data generated:', data);
      // Handle successful processing here
    },
  });

  // Test connection to Python backend
  const testConnection = async () => {
    setConnectionStatus('checking');
    try {
      const isConnected = await pythonBackendService.checkConnection();
      setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      return isConnected;
    } catch (error) {
      setConnectionStatus('disconnected');
      return false;
    }
  };

  // Handle submitting data to Python backend
  const handleSubmit = () => {
    if (inputData.trim()) {
      processInput(inputData);
    }
  };

  return {
    financialData,
    isLoading,
    isProcessing,
    error,
    inputData,
    setInputData,
    handleSubmit,
    processInput,
    connectionStatus,
    testConnection
  };
}
