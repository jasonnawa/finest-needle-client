import apiClient from '@/lib/apiClient';


export const registerUser = async (userData: any) => {
  const response = await apiClient.post('/users/register', userData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const getAllUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const getPendingUsers = async () => {
  const response = await apiClient.get("/users/pending");
  return response.data;
};

export const markAsPaid = async (id: string) => {
  const response = await apiClient.get(`/users/${id}/mark-paid`);
  return response.data;
};