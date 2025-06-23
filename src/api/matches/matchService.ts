import apiClient from '@/lib/apiClient';
import { CreateMatchDTO } from './matchTypes';


export const createMatch = async (matchData: CreateMatchDTO) => {
  const response = await apiClient.post('/matches', matchData);
  return response.data;
};

export const getMatches = async () => {
  const response = await apiClient.get("/matches");
  return response.data;
};