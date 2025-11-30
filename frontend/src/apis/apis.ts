import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://maxtron-q3wg.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: boolean;
}

export const createTask = async (taskData: CreateTaskData): Promise<Task> => {
  try {
    const response = await api.post<{ task: Task }>('/tasks', taskData);
    console.log("Response form db",response)
    return response.data.task;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to create task';
    throw new Error(message);
  }
};

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get<{ tasks: Task[] }>('/tasks');
    console.log("Response form db",response)
    return response.data.tasks;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to fetch tasks';
    throw new Error(message);
  }
};

export const updateTask = async (id: number, taskData: UpdateTaskData): Promise<Task> => {
  try {
    const response = await api.patch<{ task: Task }>(`/tasks/${id}`, taskData);
    console.log("Response form db",response)
    return response.data.task;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to update task';
    throw new Error(message);
  }
};