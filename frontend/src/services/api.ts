import axios from 'axios';
import { Task, CreateTaskDto, ApiResponse, SummaryResponse } from '../types/task';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get<ApiResponse<Task[]>>('/tasks');
    return response.data.data;
  },

  createTask: async (task: CreateTaskDto): Promise<Task> => {
    const response = await api.post<ApiResponse<Task>>('/tasks', task);
    return response.data.data;
  },

  updateTask: async (id: string, task: CreateTaskDto): Promise<Task> => {
    const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, task);
    return response.data.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  getSummary: async (): Promise<SummaryResponse> => {
    const response = await api.get<ApiResponse<SummaryResponse>>('/tasks/summary');
    return response.data.data;
  },
};


// /added