import { Trash2, Clock, CheckCircle2, Circle, Edit } from 'lucide-react';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskList({ tasks, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <Circle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No tasks yet. Create your first task!</p>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="group relative bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/40 border-2 border-purple-200/50 rounded-2xl p-5 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-purple-400 backdrop-blur-sm animate-fadeIn"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {getStatusIcon(task.status)}
                </div>
                <h3 className="text-lg font-bold text-indigo-900 group-hover:text-purple-700 transition-colors duration-300">
                  {task.title}
                </h3>
              </div>
              
              {task.description && (
                <p className="text-gray-700 text-sm mb-4 ml-8 leading-relaxed">{task.description}</p>
              )}

              <div className="flex flex-wrap gap-2 ml-8">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 shadow-sm ${getStatusColor(task.status)} transform hover:scale-105 transition-transform duration-200`}>
                  {task.status.replace('-', ' ').toUpperCase()}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 shadow-sm ${getPriorityColor(task.priority)} transform hover:scale-105 transition-transform duration-200`}>
                  {task.priority.toUpperCase()} PRIORITY
                </span>
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-2 border-gray-300 shadow-sm">
                  📅 {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task)}
                className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-md group/edit"
                title="Edit task"
              >
                <Edit className="w-5 h-5 group-hover/edit:rotate-12 transition-transform duration-200" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2.5 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-md group/delete"
                title="Delete task"
              >
                <Trash2 className="w-5 h-5 group-hover/delete:rotate-12 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
