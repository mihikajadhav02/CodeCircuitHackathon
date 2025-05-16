import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import ItineraryPlanner from './pages/ItineraryPlanner';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/planner" element={<ItineraryPlanner />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App; 