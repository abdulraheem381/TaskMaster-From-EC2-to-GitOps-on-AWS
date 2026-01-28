import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsAPI, tasksAPI } from '../api/endpoints';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';

export const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProject();
    loadTasks();
  }, [projectId]);

  const loadProject = async () => {
    try {
      const response = await projectsAPI.getOne(projectId);
      setProject(response.data);
    } catch (error) {
      setError('Failed to load project');
    }
  };

  const loadTasks = async () => {
    try {
      const response = await tasksAPI.getByProject(projectId);
      setTasks(response.data.tasks);
    } catch (error) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = () => {
    setShowForm(false);
    loadTasks();
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-600 hover:underline mb-4"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-4xl font-bold text-gray-900">{project?.title}</h1>
        {project?.description && (
          <p className="text-gray-600 mt-2">{project.description}</p>
        )}
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {showForm ? 'Cancel' : 'New Task'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <TaskForm
            projectId={parseInt(projectId)}
            onTaskAdded={handleTaskAdded}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['TO_DO', 'IN_PROGRESS', 'DONE'].map((status) => (
          <div key={status}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {status.replace(/_/g, ' ')}
            </h2>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onTaskDeleted={handleTaskDeleted}
                    onTaskUpdated={handleTaskUpdated}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
