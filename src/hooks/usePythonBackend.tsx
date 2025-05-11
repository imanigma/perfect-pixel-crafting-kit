
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { pythonBackendService } from '@/services/pythonBackendService';

/**
 * Hook to interact with Python backend services
 */
export function usePythonBackend() {
  const [inputData, setInputData] = useState('');

  // Example query to get data from Python backend
  const { data: financialData, isLoading, error } = useQuery({
    queryKey: ['financialData'],
    queryFn: () => pythonBackendService.getFinancialData(),
    // Don't auto-fetch on mount - uncomment if you want to fetch on component mount
    // enabled: false,
  });

  // Example mutation to send data to Python backend
  const { mutate: processInput, isLoading: isProcessing } = useMutation({
    mutationFn: (input: string) => pythonBackendService.processUserInput(input),
    onSuccess: (data) => {
      console.log('Processed data:', data);
      // Handle successful processing here
    },
  });

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
    processInput
  };
}
