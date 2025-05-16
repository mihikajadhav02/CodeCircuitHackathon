import React from 'react';
import { motion } from 'framer-motion';

interface TripDetails {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  currency: string;
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
    currency: '₹',
  });

  const [errors, setErrors] = React.useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  const validateDates = (newDetails: Partial<TripDetails> = {}) => {
    const currentDetails = { ...details, ...newDetails };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startDate = new Date(currentDetails.startDate);
    const endDate = new Date(currentDetails.endDate);
    const newErrors: { startDate?: string; endDate?: string } = {};

    if (startDate < today) {
      newErrors.startDate = "Start date cannot be before today";
    }

    if (currentDetails.endDate && startDate > endDate) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDates()) {
      onSubmit(details);
    }
  };

  const currencies = [
    { symbol: '₹', name: 'INR - Indian Rupee' },
    { symbol: '$', name: 'USD - US Dollar' },
    { symbol: '€', name: 'EUR - Euro' },
    { symbol: '£', name: 'GBP - British Pound' },
  ];

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
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                const newDetails = { ...details, startDate: e.target.value };
                setDetails(newDetails);
                validateDates(newDetails);
              }}
              className={`w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 
                ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={details.endDate}
              min={details.startDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                const newDetails = { ...details, endDate: e.target.value };
                setDetails(newDetails);
                validateDates(newDetails);
              }}
              className={`w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 
                ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
            )}
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              id="currency"
              value={details.currency}
              onChange={(e) => setDetails({ ...details, currency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            >
              {currencies.map((currency) => (
                <option key={currency.symbol} value={currency.symbol}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">
                {details.currency}
              </span>
              <input
                type="number"
                id="budget"
                min="0"
                value={details.budget}
                onChange={(e) => setDetails({ ...details, budget: parseInt(e.target.value) })}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your budget"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                     transition-colors duration-200"
          >
            Start Planning
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TripDetailsForm; 