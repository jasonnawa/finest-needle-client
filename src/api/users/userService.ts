import apiClient from '@/lib/apiClient';
import { RegisterUserDTO } from './userTypes';


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