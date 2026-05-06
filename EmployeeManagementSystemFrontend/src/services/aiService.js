import apiClient from '../api/apiClient';

export const executeAICommand = async (prompt) => {
  const response = await apiClient.get('/ai/execute', {
    params: { prompt },
  });
  return response.data;
};
