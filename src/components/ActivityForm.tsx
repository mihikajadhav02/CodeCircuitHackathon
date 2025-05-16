import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from './ActivityCard';

interface ActivityFormProps {
  onSubmit: (activity: Activity) => void;
  onCancel: () => void;
  initialActivity?: Activity;
  currency?: string;
  existingActivities?: Activity[];
}

const defaultActivity: Activity = {
  id: Math.random().toString(36).substr(2, 9),
  title: '',
  startTime: '09:00',
  endTime: '10:00',
  cost: 0,
  location: '',
  description: '',
  category: 'other',
  currency: '₹',
};

const ActivityForm: React.FC<ActivityFormProps> = ({
  onSubmit,
  onCancel,
  initialActivity,
  currency = '₹',
  existingActivities = [],
}) => {
  const [activity, setActivity] = useState<Activity>(() => {
    if (initialActivity) return initialActivity;

    // Find the latest end time from existing activities
    if (existingActivities.length > 0) {
      const sortedActivities = [...existingActivities].sort((a, b) => {
        const timeA = new Date(`2000/01/01 ${a.endTime}`);
        const timeB = new Date(`2000/01/01 ${b.endTime}`);
        return timeB.getTime() - timeA.getTime();
      });

      const latestEndTime = sortedActivities[0].endTime;
      return {
        ...defaultActivity,
        currency,
        startTime: latestEndTime,
        endTime: addMinutesToTime(latestEndTime, 60), // Default 1 hour duration
      };
    }

    return { ...defaultActivity, currency };
  });

  const [timeError, setTimeError] = useState<string>('');

  const addMinutesToTime = (time: string, minutes: number): string => {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${String(newHours % 24).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  };

  const checkTimeOverlap = (newStartTime: string, newEndTime: string): boolean => {
    const start = new Date(`2000/01/01 ${newStartTime}`);
    const end = new Date(`2000/01/01 ${newEndTime}`);

    if (end <= start) {
      setTimeError('End time must be after start time');
      return true;
    }

    const hasOverlap = existingActivities.some(existingActivity => {
      if (initialActivity && existingActivity.id === initialActivity.id) return false;
      
      const existingStart = new Date(`2000/01/01 ${existingActivity.startTime}`);
      const existingEnd = new Date(`2000/01/01 ${existingActivity.endTime}`);

      return (
        (start >= existingStart && start < existingEnd) ||
        (end > existingStart && end <= existingEnd) ||
        (start <= existingStart && end >= existingEnd)
      );
    });

    if (hasOverlap) {
      setTimeError('This time slot overlaps with another activity');
      return true;
    }

    setTimeError('');
    return false;
  };

  useEffect(() => {
    if (activity.startTime && activity.endTime) {
      checkTimeOverlap(activity.startTime, activity.endTime);
    }
  }, [activity.startTime, activity.endTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!timeError) {
      onSubmit(activity);
    }
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

        <form onSubmit={handleSubmit} className="space-y-6">
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
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                value={activity.startTime}
                onChange={(e) => setActivity({ ...activity, startTime: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 
                  ${timeError ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                value={activity.endTime}
                onChange={(e) => setActivity({ ...activity, endTime: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 
                  ${timeError ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
            </div>
          </div>

          {timeError && (
            <p className="text-sm text-red-600">{timeError}</p>
          )}

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
              Cost
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">
                {activity.currency}
              </span>
              <input
                type="number"
                id="cost"
                min="0"
                value={activity.cost}
                onChange={(e) => setActivity({ ...activity, cost: Number(e.target.value) })}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
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
              disabled={!!timeError}
              className={`px-6 py-2 text-white rounded-md transition-all duration-200
                ${timeError 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:scale-105'
                }`}
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