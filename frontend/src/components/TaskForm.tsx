import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Task } from '../apis/apis';
import { createTask, updateTask, getAllTasks,} from '../apis/apis';
import { toast } from 'react-toastify';

interface TaskFormProps {
  update?: boolean;
  initialTask?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ update = false, initialTask = null }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (update && initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setIsCompleted(initialTask.status);
    }
  }, [update, initialTask]);

  useEffect(() => {
    if (update && !initialTask && id) {
      const fetchTask = async () => {
        try {
          const tasks = await getAllTasks();
          const task = tasks.find(t => t.id === Number(id));
          if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setIsCompleted(task.status);
          } else {
            toast.error('Task not found');
            navigate('/');
          }
        } catch (err) {
          toast.error('Failed to load task');
          navigate('/');
        }
      };
      fetchTask();
    }
  }, [update, id, initialTask, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    setLoading(true);

    try {
      if (update && id) {
        const updatedTask = await updateTask(Number(id), {
          title: title.trim(),
          description: description.trim() || undefined,
          status: isCompleted,
        });
        toast.success('Task updated successfully!');
        navigate('/'); 
      } else {
        const newTask = await createTask({
          title: title.trim(),
          description: description.trim() || undefined,
        });
        toast.success('Task created successfully!');
        setTitle('');
        setDescription('');
        setIsCompleted(false);
        navigate('/'); 
      }
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1F222E] font-poppins">
            {update ? 'Update Task' : 'Create New Task'}
          </h1>
        </div>

        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="my-6">
            <label className="block text-sm font-normal font-poppins text-[#3D445C] mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter task title"
              className="w-full border border-gray-300 rounded-lg px-4 py-4 bg-white text-[#2A2A2A] placeholder-[#A3AAC2] font-poppins text-base focus:ring-2 focus:ring-[#17428E] focus:border-[#17428E] transition-all duration-200"
            />
          </div>

          <div className="my-6">
            <label className="block text-sm font-normal font-poppins text-[#3D445C] mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the task (optional)"
              className="w-full border border-gray-300 rounded-lg px-4 py-4 bg-white text-[#2A2A2A] placeholder-[#A3AAC2] font-poppins text-base focus:ring-2 focus:ring-[#17428E] focus:border-[#17428E] transition-all duration-200 resize-none"
            />
          </div>

          <div className="my-6 flex items-center gap-4">
            <input
              type="checkbox"
              id="completed"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="w-6 h-6 text-[#17428E] rounded border-gray-300 focus:ring-[#17428E] cursor-pointer accent-[#17428E]"
            />
            <label
              htmlFor="completed"
              className="text-base font-medium font-poppins text-[#3D445C] cursor-pointer select-none"
            >
              Mark as <span className="text-[#10B981] font-semibold">Completed</span>
            </label>
            <span className="ml-auto text-sm font-poppins text-[#A3AAC2]">
              Current: <strong>{isCompleted ? 'Completed' : 'Pending'}</strong>
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-lg font-medium font-poppins text-base text-white focus:outline-none ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#17428E] hover:bg-[#123670]'}`}
          >
            {loading ? 'Saving...' : update ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;