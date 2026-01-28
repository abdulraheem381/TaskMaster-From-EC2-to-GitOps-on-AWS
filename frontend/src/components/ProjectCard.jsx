import React from 'react';
import { projectsAPI } from '../api/endpoints';

export const ProjectCard = ({
  project,
  onProjectDeleted,
  onProjectClick,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      setLoading(true);
      try {
        await projectsAPI.delete(project.id);
        onProjectDeleted(project.id);
      } catch (error) {
        alert('Failed to delete project');
      } finally {
        setLoading(false);
      }
    }
  };

  const taskCounts = {
    total: project.tasks?.length || 0,
    done: project.tasks?.filter((t) => t.status === 'DONE').length || 0,
  };

  return (
    <div
      onClick={onProjectClick}
      className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {project.title}
      </h3>
      {project.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {taskCounts.done} of {taskCounts.total} tasks done
        </div>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-red-600 hover:text-red-700 text-sm disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
