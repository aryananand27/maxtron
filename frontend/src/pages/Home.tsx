import React, { useState, useEffect} from 'react';
import HomeLayout from '../layouts/HomeLayout';
import TasksTable from '../components/TasksTable';
import type { Task } from '../apis/apis';
import { getAllTasks} from '../apis/apis';
import { io} from 'socket.io-client';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:4000';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const tableData = {
    columns: ['Serial No.', 'Title', 'Description', 'Status'],
    rows: tasks.map((task) => [
      String(task.id),
      task.title,
      task.description || '—',
      task.status ? 'Completed' : 'Pending',
    ]),
    statusStyles: {
      PENDING: { backgroundColor: '#AC39E6', color: '#FFFFFF' },
      COMPLETED: { backgroundColor: '#10B981', color: '#FFFFFF' },
    },
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getAllTasks();
        console.log("Fecchted tass",fetchedTasks)
        setTasks(fetchedTasks);
      } catch (err: any) {
        toast.error(err.message || 'Failed to load tasks');
      }
    };

    fetchTasks();
  }, []);

useEffect(() => {
  const socket = io(API_URL, {
    transports: ['websocket'],
  });

  socket.on('taskCreated', (newTask: Task) => {
    setTasks((prev) => [...prev,newTask]);
  });

  socket.on('taskUpdated', (updatedTask: Task) => {
    console.log("Tas Updated event trggered",updatedTask)
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  });
  return () => {
    socket.disconnect();
  };
}, []);

  return (
    <HomeLayout>
      <div className="h-full w-full px-4 py-8 flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto rounded-xl shadow-2xl overflow-hidden">
          <TasksTable data={tableData} />
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;