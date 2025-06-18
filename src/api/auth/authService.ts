import apiClient from '@/lib/apiClient';
import { signInCredentials } from './authTypes';

export const signIn = async (credentials: signInCredentials) => {
  const response = await apiClient.post('/auth/signin', credentials);
  return response.data;
};
