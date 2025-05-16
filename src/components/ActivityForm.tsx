import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from './ActivityCard';

interface ActivityFormProps {
  onSubmit: (activity: Activity) => void;
  onCancel: () => void;
  initialActivity?: Activity;
}

const defaultActivity: Activity = {
  id: Math.random().toString(36).substr(2, 9),
  title: '',
  time: '09:00',
  duration: '1 hour',
  cost: 0,
  location: '',
  description: '',
  category: 'other',
};

const ActivityForm: React.FC<ActivityFormProps> = ({
  onSubmit,
  onCancel,
  initialActivity,
}) => {
  const [activity, setActivity] = useState<Activity>(initialActivity || defaultActivity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(activity);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-purple-800 mb-6">
          {initialActivity ? 'Edit Activity' : 'Add New Activity'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Activity Title
            </label>
            <input
              type="text"
              id="title"
              value={activity.title}
              onChange={(e) => setActivity({ ...activity, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                id="time"
                value={activity.time}
                onChange={(e) => setActivity({ ...activity, time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select
                id="duration"
                value={activity.duration}
                onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="30 mins">30 mins</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="3 hours">3 hours</option>
                <option value="4 hours">4 hours</option>
                <option value="Full day">Full day</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={activity.location}
              onChange={(e) => setActivity({ ...activity, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
              Cost (USD)
            </label>
            <input
              type="number"
              id="cost"
              min="0"
              value={activity.cost}
              onChange={(e) => setActivity({ ...activity, cost: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={activity.category}
              onChange={(e) => setActivity({ ...activity, category: e.target.value as Activity['category'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="attraction">Attraction</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="accommodation">Accommodation</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={activity.description}
              onChange={(e) => setActivity({ ...activity, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md
                       hover:shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              {initialActivity ? 'Save Changes' : 'Add Activity'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ActivityForm; 