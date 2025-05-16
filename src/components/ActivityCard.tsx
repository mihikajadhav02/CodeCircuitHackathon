import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

export interface Activity {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  cost: number;
  location: string;
  description: string;
  category: 'attraction' | 'food' | 'transport' | 'accommodation' | 'other';
  currency?: string;
}

interface ActivityCardProps {
  activity: Activity;
  index: number;
  onEdit?: (activity: Activity) => void;
  onDelete?: (id: string) => void;
}

const categoryColors = {
  attraction: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-200',
    icon: 'bg-blue-200',
    gradient: 'from-blue-500 to-blue-600'
  },
  food: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    hover: 'hover:bg-green-200',
    icon: 'bg-green-200',
    gradient: 'from-green-500 to-green-600'
  },
  transport: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    hover: 'hover:bg-yellow-200',
    icon: 'bg-yellow-200',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  accommodation: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200',
    hover: 'hover:bg-purple-200',
    icon: 'bg-purple-200',
    gradient: 'from-purple-500 to-purple-600'
  },
  other: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-200',
    icon: 'bg-gray-200',
    gradient: 'from-gray-500 to-gray-600'
  },
};

const categoryIcons = {
  attraction: '🎯',
  food: '🍽️',
  transport: '🚗',
  accommodation: '🏨',
  other: '📌',
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index, onEdit, onDelete }) => {
  const colors = categoryColors[activity.category];
  
  return (
    <Draggable draggableId={activity.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            ${colors.bg} ${colors.hover} ${colors.border}
            border rounded-xl shadow-sm transition-all duration-200 ease-in-out
            ${snapshot.isDragging 
              ? `shadow-2xl ring-2 ring-${colors.text} scale-105 rotate-1 z-50` 
              : 'hover:shadow-md'
            }
            ${snapshot.draggingOver ? 'opacity-90' : 'opacity-100'}
            cursor-grab active:cursor-grabbing
            relative overflow-hidden
          `}
          style={{
            ...provided.draggableProps.style,
            transform: snapshot.isDragging
              ? provided.draggableProps.style?.transform
              : 'translate(0, 0)',
          }}
        >
          {/* Category indicator stripe */}
          <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${colors.gradient}`} />
          
          <div className="p-4 relative">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`${colors.icon} p-2 rounded-lg transform transition-transform ${snapshot.isDragging ? 'scale-110' : ''}`}>
                    <span className="text-xl" role="img" aria-label={activity.category}>
                      {categoryIcons[activity.category]}
                    </span>
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${colors.text}`}>
                      {activity.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className={`text-sm ${colors.text}`}>
                        {activity.currency || '₹'} {activity.cost}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">⏰</span>
                    <span className="font-medium">{activity.startTime} - {activity.endTime}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📍</span>
                    <span>{activity.location}</span>
                  </div>
                </div>
                
                {activity.description && (
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                    {activity.description}
                  </p>
                )}
              </div>

              <div className="flex space-x-1 ml-4">
                {onEdit && (
                  <button
                    onClick={() => onEdit(activity)}
                    className={`p-2 text-gray-400 hover:${colors.text} hover:${colors.bg} rounded-full transition-colors duration-200`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(activity.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ActivityCard; 