import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { taskApi } from '../services/api';
import { Task, CreateTaskDto } from '../types/task';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import AiBriefing from '../components/AiBriefing';
import ErrorMessage from '../components/ErrorMessage';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskApi.getTasks();
      setTasks(data);
    } catch (err: any) {
      setError('Failed to fetch tasks. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskDto) => {
    try {
      setError(null);
      if (editingTask) {
        await taskApi.updateTask(editingTask.id, taskData);
        setEditingTask(null);
      } else {
        await taskApi.createTask(taskData);
      }
      await fetchTasks();
      setShowForm(false);
    } catch (err) {
      setError(editingTask ? 'Failed to update task. Please try again.' : 'Failed to create task. Please try again.');
      console.error(err);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      setError(null);
      await taskApi.deleteTask(id);
      await fetchTasks();
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-900">Your Tasks</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            </div>

            {showForm && (
              <TaskForm
                onSubmit={handleCreateTask}
                onCancel={() => {
                  setShowForm(false);
                  setEditingTask(null);
                }}
                editTask={editingTask}
              />
            )}

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
                <p className="mt-4 text-gray-600">Loading tasks...</p>
              </div>
            ) : (
              <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <AiBriefing />
        </div>
      </div>
    </div>
  );
}
