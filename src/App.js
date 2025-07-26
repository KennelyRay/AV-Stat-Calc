import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UnitsProvider } from './contexts/UnitsContext';
import Navbar from './components/Navbar';
import GlobalBackground from './components/GlobalBackground';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import UnitList from './pages/UnitList';
import AdminPanel from './pages/AdminPanel';
import './index.css';

function App() {
  return (
    <UnitsProvider>
      <Router>
        <div className="min-h-screen font-anime relative" style={{ backgroundColor: '#0F0F1A' }}>
          <GlobalBackground />
          <Navbar />
          <main className="pt-20 relative z-[50]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/units" element={<UnitList />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UnitsProvider>
  );
}

export default App; 