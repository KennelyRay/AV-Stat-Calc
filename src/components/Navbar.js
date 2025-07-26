import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Admin Login Dialog Component
const AdminLoginDialog = ({ isOpen, onClose, onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'Admin' && credentials.password === '000000') {
      onLogin();
      onClose();
      setCredentials({ username: '', password: '' });
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Admin Access</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-slate-800/60 hover:bg-slate-700/80 rounded-lg flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700/60 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-anime-primary/40 focus:border-anime-primary/60"
              placeholder="Enter username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700/60 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-anime-primary/40 focus:border-anime-primary/60"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-anime-primary hover:bg-anime-primary/80 text-white font-medium rounded-lg transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-anime-darker/95 backdrop-blur-xl border-b border-anime-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                {/* Main Logo Container */}
                <div className="w-14 h-14 relative overflow-hidden rounded-2xl bg-gradient-to-br from-anime-primary via-anime-secondary to-anime-accent p-[2px] transition-all duration-300 group-hover:scale-110 group-hover:rotate-2">
                  <div className="w-full h-full bg-anime-darker rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Geometric Icon */}
                    <div className="relative">
                      <div className="w-6 h-6 bg-anime-primary transform rotate-45 rounded-sm"></div>
                      <div className="absolute top-1 left-1 w-4 h-4 bg-anime-secondary transform rotate-45 rounded-sm"></div>
                      <div className="absolute top-2 left-2 w-2 h-2 bg-anime-accent transform rotate-45 rounded-sm"></div>
                    </div>
                    
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-anime-primary animate-pulse"></div>
                      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-anime-secondary animate-pulse" style={{animationDelay: '1s'}}></div>
                      <div className="absolute top-0 left-0 w-[1px] h-full bg-anime-accent animate-pulse" style={{animationDelay: '2s'}}></div>
                      <div className="absolute top-0 right-0 w-[1px] h-full bg-anime-primary animate-pulse" style={{animationDelay: '3s'}}></div>
                    </div>
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-anime-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </div>
              
              {/* Brand Text */}
              <div className="hidden sm:block">
                <div className="gradient-text text-2xl font-black tracking-tight leading-none">
                  ANIME
                </div>
                <div className="text-anime-light text-sm font-medium tracking-wider uppercase opacity-80">
                  VANGUARDS
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              <Link
                to="/"
                className={`relative px-2 py-3 font-medium text-sm uppercase tracking-wider transition-all duration-300 group ${
                  isActive('/') 
                    ? 'text-anime-primary' 
                    : 'text-anime-light hover:text-anime-primary'
                }`}
              >
                Home
                <div className={`absolute bottom-0 left-0 h-0.5 bg-anime-primary transition-all duration-300 ${
                  isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
              <Link
                to="/calculator"
                className={`relative px-2 py-3 font-medium text-sm uppercase tracking-wider transition-all duration-300 group ${
                  isActive('/calculator') 
                    ? 'text-anime-primary' 
                    : 'text-anime-light hover:text-anime-primary'
                }`}
              >
                Calculator
                <div className={`absolute bottom-0 left-0 h-0.5 bg-anime-primary transition-all duration-300 ${
                  isActive('/calculator') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
              <Link
                to="/units"
                className={`relative px-2 py-3 font-medium text-sm uppercase tracking-wider transition-all duration-300 group ${
                  isActive('/units') 
                    ? 'text-anime-primary' 
                    : 'text-anime-light hover:text-anime-primary'
                }`}
              >
                Unit List
                <div className={`absolute bottom-0 left-0 h-0.5 bg-anime-primary transition-all duration-300 ${
                  isActive('/units') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`relative px-2 py-3 font-medium text-sm uppercase tracking-wider transition-all duration-300 group ${
                    isActive('/admin') 
                      ? 'text-anime-accent' 
                      : 'text-anime-accent/70 hover:text-anime-accent'
                  }`}
                >
                  Admin Panel
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-anime-accent transition-all duration-300 ${
                    isActive('/admin') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></div>
                </Link>
              )}
            </div>

            {/* Admin Controls & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Admin Login/Logout Button */}
              <div className="relative">
                {!isAdmin ? (
                  <button
                    onClick={() => setAdminLoginOpen(true)}
                    className="w-8 h-8 bg-slate-800/40 hover:bg-slate-700/60 rounded-lg flex items-center justify-center transition-all duration-300 group"
                    title="Admin Login"
                  >
                    <svg className="w-4 h-4 text-slate-500 group-hover:text-anime-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <circle cx="12" cy="16" r="1"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-anime-accent font-medium">Admin</span>
                    <button
                      onClick={handleAdminLogout}
                      className="w-8 h-8 bg-anime-accent/20 hover:bg-anime-accent/30 rounded-lg flex items-center justify-center transition-all duration-300"
                      title="Admin Logout"
                    >
                      <svg className="w-4 h-4 text-anime-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16,17 21,12 16,7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative p-2 rounded-lg bg-anime-primary/10 text-anime-light hover:text-anime-primary hover:bg-anime-primary/20 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  >
                    {isOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-6 border-t border-anime-primary/20 bg-anime-darker/95 backdrop-blur-xl">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className={`relative px-4 py-3 font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
                    isActive('/') ? 'text-anime-primary' : 'text-anime-light hover:text-anime-primary'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                  {isActive('/') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-anime-primary"></div>}
                </Link>
                <Link
                  to="/calculator"
                  className={`relative px-4 py-3 font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
                    isActive('/calculator') ? 'text-anime-primary' : 'text-anime-light hover:text-anime-primary'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Calculator
                  {isActive('/calculator') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-anime-primary"></div>}
                </Link>
                <Link
                  to="/units"
                  className={`relative px-4 py-3 font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
                    isActive('/units') ? 'text-anime-primary' : 'text-anime-light hover:text-anime-primary'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Unit List
                  {isActive('/units') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-anime-primary"></div>}
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`relative px-4 py-3 font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
                      isActive('/admin') ? 'text-anime-accent' : 'text-anime-accent/70 hover:text-anime-accent'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                    {isActive('/admin') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-anime-accent"></div>}
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Admin Login Dialog */}
      <AdminLoginDialog 
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLogin={handleAdminLogin}
      />
    </>
  );
};

export default Navbar; 