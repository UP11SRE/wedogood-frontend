import apiClient from './client';

export const submitReport = async (data) => {
  const response = await apiClient.post('/report', data);
  // Return the full response which includes status and message
  return response.data;
};

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/reports/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  // Backend wraps data in a "data" property
  return response.data.data || response.data;
};

export const getJobStatus = async (jobId) => {
  const response = await apiClient.get(`/job-status/${jobId}`);
  return response.data;
};

export const getDashboardData = async (month) => {
  const response = await apiClient.get('/dashboard', {
    params: { month },
  });
  // Backend wraps data in a "data" property
  return response.data.data || response.data;
};
