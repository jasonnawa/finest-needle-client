import apiClient from '@/lib/apiClient';
import { CourseDTO } from './courseTypes';


// Get all courses
export const getAllCourses = async () => {
  const response = await apiClient.get('/courses');
  return response.data;
};

// Get a single course by ID
export const getCourseById = async (id: string) => {
  const response = await apiClient.get(`/courses/${id}`);
  return response.data;
};

//send a course to an email
export const sendCourseToEmail = async (courseId: string, email: string) => {
  const data = { courseId, email }
  const response = await apiClient.post('/courses/send-email', data);
  return response.data
}