import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpLoginPage from './pages/signIn';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignUpLoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
