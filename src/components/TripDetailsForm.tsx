import React from 'react';
import { motion } from 'framer-motion';

interface TripDetails {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
}

interface TripDetailsFormProps {
  onSubmit: (details: TripDetails) => void;
}

const TripDetailsForm: React.FC<TripDetailsFormProps> = ({ onSubmit }) => {
  const [details, setDetails] = React.useState<TripDetails>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-semibold text-purple-800 mb-6">Trip Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={details.destination}
              onChange={(e) => setDetails({ ...details, destination: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="Where are you going?"
              required
            />
          </div>
          
          <div>
            <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Travelers
            </label>
            <input
              type="number"
              id="travelers"
              min="1"
              value={details.travelers}
              onChange={(e) => setDetails({ ...details, travelers: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={details.startDate}
              onChange={(e) => setDetails({ ...details, startDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={details.endDate}
              onChange={(e) => setDetails({ ...details, endDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget (USD)
            </label>
            <input
              type="number"
              id="budget"
              min="0"
              value={details.budget}
              onChange={(e) => setDetails({ ...details, budget: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your budget"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md
                     hover:shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            Continue to Planning
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TripDetailsForm; 