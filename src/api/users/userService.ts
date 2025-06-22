import apiClient from '@/lib/apiClient';
import { RegisterUserDTO } from './userTypes';


export const registerUser = async (userData: RegisterUserDTO) => {
  const response = await apiClient.post('/users/register', userData);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};