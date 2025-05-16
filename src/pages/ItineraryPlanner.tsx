import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import TripDetailsForm from '../components/TripDetailsForm';
import ActivityCard, { Activity } from '../components/ActivityCard';
import ActivityForm from '../components/ActivityForm';

interface DayPlan {
  date: string;
  activities: Activity[];
}

const ItineraryPlanner: React.FC = () => {
  const [tripDetailsSubmitted, setTripDetailsSubmitted] = useState(false);
  const [itinerary, setItinerary] = useState<DayPlan[]>([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [currentSpent, setCurrentSpent] = useState(0);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const handleTripDetailsSubmit = (details: any) => {
    setTripDetailsSubmitted(true);
    setTotalBudget(details.budget);
    
    // Create day plans based on start and end dates
    const start = new Date(details.startDate);
    const end = new Date(details.endDate);
    const days: DayPlan[] = [];
    
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      days.push({
        date: date.toISOString().split('T')[0],
        activities: [],
      });
    }
    
    setItinerary(days);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside any droppable
    if (!destination) return;

    const sourceDay = parseInt(source.droppableId);
    const destinationDay = parseInt(destination.droppableId);

    const newItinerary = [...itinerary];
    const sourceDayPlan = newItinerary[sourceDay];
    const [movedActivity] = sourceDayPlan.activities.splice(source.index, 1);
    
    const destinationDayPlan = newItinerary[destinationDay];
    destinationDayPlan.activities.splice(destination.index, 0, movedActivity);

    setItinerary(newItinerary);
  };

  const handleAddActivity = (dayIndex: number) => {
    setSelectedDayIndex(dayIndex);
    setEditingActivity(null);
    setShowActivityForm(true);
  };

  const handleEditActivity = (dayIndex: number, activity: Activity) => {
    setSelectedDayIndex(dayIndex);
    setEditingActivity(activity);
    setShowActivityForm(true);
  };

  const handleActivitySubmit = (activity: Activity) => {
    if (selectedDayIndex === null) return;

    const updatedItinerary = [...itinerary];
    const dayPlan = updatedItinerary[selectedDayIndex];

    if (editingActivity) {
      // Update existing activity
      const activityIndex = dayPlan.activities.findIndex(a => a.id === editingActivity.id);
      if (activityIndex !== -1) {
        setCurrentSpent(prev => prev - dayPlan.activities[activityIndex].cost + activity.cost);
        dayPlan.activities[activityIndex] = activity;
      }
    } else {
      // Add new activity
      setCurrentSpent(prev => prev + activity.cost);
      dayPlan.activities.push(activity);
    }

    setItinerary(updatedItinerary);
    setShowActivityForm(false);
    setSelectedDayIndex(null);
    setEditingActivity(null);
  };

  const handleDeleteActivity = (dayIndex: number, activityId: string) => {
    const updatedItinerary = [...itinerary];
    const dayPlan = updatedItinerary[dayIndex];
    const activityIndex = dayPlan.activities.findIndex(a => a.id === activityId);
    
    if (activityIndex !== -1) {
      const activity = dayPlan.activities[activityIndex];
      setCurrentSpent(prev => prev - activity.cost);
      dayPlan.activities.splice(activityIndex, 1);
      setItinerary(updatedItinerary);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white p-8"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-800 mb-8">Create Your Itinerary</h1>
        
        {!tripDetailsSubmitted ? (
          <TripDetailsForm onSubmit={handleTripDetailsSubmit} />
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="space-y-8">
              {/* Budget Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-purple-800 mb-4">Budget Overview</h2>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Total Budget</p>
                    <p className="text-2xl font-bold text-purple-600">${totalBudget}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Spent</p>
                    <p className="text-2xl font-bold text-pink-600">${currentSpent}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Remaining</p>
                    <p className="text-2xl font-bold text-green-600">${totalBudget - currentSpent}</p>
                  </div>
                </div>
              </div>

              {/* Day-by-day Itinerary */}
              <div className="space-y-6">
                {itinerary.map((day, dayIndex) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-purple-800">
                        Day {dayIndex + 1} - {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </h3>
                      <button
                        onClick={() => handleAddActivity(dayIndex)}
                        className="px-4 py-2 bg-purple-100 text-purple-600 rounded-md hover:bg-purple-200 transition-colors duration-200"
                      >
                        Add Activity
                      </button>
                    </div>

                    <Droppable droppableId={dayIndex.toString()}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="space-y-4"
                        >
                          <AnimatePresence>
                            {day.activities.map((activity, index) => (
                              <ActivityCard
                                key={activity.id}
                                activity={activity}
                                index={index}
                                onEdit={() => handleEditActivity(dayIndex, activity)}
                                onDelete={(id) => handleDeleteActivity(dayIndex, id)}
                              />
                            ))}
                          </AnimatePresence>
                          {provided.placeholder}
                          
                          {day.activities.length === 0 && (
                            <p className="text-center text-gray-500 py-8">
                              No activities planned for this day. Click "Add Activity" to get started!
                            </p>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </motion.div>
                ))}
              </div>
            </div>
          </DragDropContext>
        )}

        {/* Activity Form Modal */}
        <AnimatePresence>
          {showActivityForm && (
            <ActivityForm
              onSubmit={handleActivitySubmit}
              onCancel={() => {
                setShowActivityForm(false);
                setSelectedDayIndex(null);
                setEditingActivity(null);
              }}
              initialActivity={editingActivity || undefined}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ItineraryPlanner; 