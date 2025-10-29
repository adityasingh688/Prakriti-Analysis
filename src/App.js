import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import PrakritiAnalysis from './components/PrakritiAnalysis';
import Results from './components/Results';
import Dashboard from './components/Dashboard';

function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [prakritiResults, setPrakritiResults] = useState(null);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/profile" 
            element={
              <UserProfile 
                userProfile={userProfile}
                setUserProfile={setUserProfile}
              />
            } 
          />
          <Route 
            path="/analysis" 
            element={
              <PrakritiAnalysis 
                userProfile={userProfile}
                setPrakritiResults={setPrakritiResults}
              />
            } 
          />
          <Route 
            path="/results" 
            element={
              <Results 
                prakritiResults={prakritiResults}
                userProfile={userProfile}
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                userProfile={userProfile}
                prakritiResults={prakritiResults}
              />
            } 
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
