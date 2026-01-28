import React, { useState } from 'react';
import { tasksAPI } from '../api/endpoints';

export const TaskCard = ({ task, onTaskDeleted, onTaskUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);

  const statusOptions = ['TO_DO', 'IN_PROGRESS', 'DONE'];

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      const response = await tasksAPI.update(task.id, { status: newStatus });
      setStatus(newStatus);
      onTaskUpdated(response.data.task);
    } catch (error) {
      alert('Failed to update task status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.delete(task.id);
        onTaskDeleted(task.id);
      } catch (error) {
        alert('Failed to delete task');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{task.title}</h3>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          ✕
        </button>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="space-y-2">
        {task.dueDate && (
          <p className="text-xs text-gray-500">
            Due: {formatDate(task.dueDate)}
          </p>
        )}

        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={loading}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
