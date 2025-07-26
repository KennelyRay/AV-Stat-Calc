import React from 'react';
import { Link } from 'react-router-dom';
import { useUnits } from '../contexts/UnitsContext';

const Home = () => {
  const { units, loading } = useUnits();
  
  // Get latest 4 units (most recently added)
  const latestUnits = units
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 4);

  // Get meta tier units
  const metaUnits = units
    .filter(unit => ['Meta', 'Broken', 'MetaSupport'].includes(unit.tier))
    .slice(0, 3);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Vanguard': return 'text-pink-400';
      case 'Secret': return 'text-red-400';
      case 'Mythical': return 'text-purple-400';
      case 'Legendary': return 'text-yellow-400';
      case 'Epic': return 'text-blue-400';
      case 'Rare': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Broken': return 'text-red-400';
      case 'Meta': return 'text-yellow-400';
      case 'MetaSupport': return 'text-orange-400';
      case 'SemiMeta': return 'text-blue-400';
      case 'Good': return 'text-green-400';
      case 'Support': return 'text-cyan-400';
      case 'Bad': return 'text-slate-400';
      default: return 'text-anime-light';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center px-4 text-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="animated-particles">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Twinkling Stars */}
        <div className="stars">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Floating Orbs */}
        <div className="floating-orb w-64 h-64 top-20 left-10" style={{animationDelay: '0s'}}></div>
        <div className="floating-orb w-48 h-48 top-40 right-20" style={{animationDelay: '2s'}}></div>
        <div className="floating-orb w-32 h-32 bottom-40 left-1/4" style={{animationDelay: '4s'}}></div>
        <div className="floating-orb w-40 h-40 bottom-20 right-1/3" style={{animationDelay: '6s'}}></div>
        
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-12 leading-none">
              <span className="gradient-text block gaming-text-shadow">ANIME</span>
              <span className="neon-text block gaming-glow">VANGUARDS</span>
            </h1>
            <div className="text-xl md:text-3xl mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
              <div className="mb-4">
                <span className="text-anime-light">Master the </span>
                <span className="gaming-highlight">ULTIMATE STAT CALCULATOR</span>
                <span className="text-anime-light"> for Anime Vanguards.</span>
              </div>
              <div className="gaming-subtitle">
                <span className="gaming-accent-1">OPTIMIZE UNIT BUILDS</span>
                <span className="text-anime-light mx-3">•</span>
                <span className="gaming-accent-2">DEFEND WITH STRATEGY</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
              <Link 
                to="/calculator" 
                className="anime-button text-xl px-12 py-5 animate-pulse-neon group"
              >
                <span className="relative z-10 gaming-button-text">START CALCULATING</span>
              </Link>
              <Link 
                to="/units" 
                className="glass-effect border-2 border-anime-secondary text-anime-secondary hover:bg-anime-secondary hover:text-white font-bold py-5 px-12 rounded-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group"
              >
                <span className="gaming-button-secondary">BROWSE UNITS</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="scroll-indicator"
          onClick={() => {
            document.querySelector('#latest-units').scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
        >
          <span className="scroll-text">Scroll</span>
          <svg 
            className="scroll-arrow" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </section>

      {/* Latest Units Section */}
      <section id="latest-units" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-anime-gray/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block mb-4">
              <span className="text-anime-accent text-sm font-bold uppercase tracking-wider">Featured Collection</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black gradient-text mb-8">Latest Units</h2>
            <p className="text-xl md:text-2xl text-anime-light-gray max-w-3xl mx-auto">
              Discover the <span className="text-anime-primary">newest additions</span> to the roster with enhanced abilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestUnits.length > 0 ? (
              latestUnits.map((unit, index) => (
                <div key={unit.id} className="unit-card gaming-border group" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <div className="w-full h-64 bg-gradient-to-br from-anime-gray/40 to-anime-gray-lighter/30 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-anime-primary/10 via-transparent to-anime-secondary/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      {unit.image ? (
                        <img 
                          src={unit.image} 
                          alt={unit.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-16 h-16 bg-anime-primary/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10" style={{display: unit.image ? 'none' : 'flex'}}>
                        <div className="w-8 h-8 bg-anime-primary rounded"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-anime-darker/80 to-transparent"></div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-2 rounded-xl text-sm font-bold ${getRarityColor(unit.rarity)} bg-anime-darker/95 backdrop-blur-sm shadow-lg`}>
                        {unit.rarity}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="w-3 h-3 rounded-full bg-anime-neon animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-anime-light mb-2 group-hover:text-anime-primary transition-colors duration-300">
                      {unit.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-anime-light-gray font-medium">
                        Element: <span className="text-anime-accent">{unit.element}</span>
                      </span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-2 h-2 rounded-full bg-anime-primary/30"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-800/40 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No Units Yet</h3>
                <p className="text-slate-400 mb-4">Add units via the Admin Panel to see them here</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Meta Units Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-anime-darker via-anime-gray/20 to-anime-darker"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block mb-4">
              <span className="text-anime-gold text-sm font-bold uppercase tracking-wider">Elite Tier</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black gradient-text mb-8">Meta Units</h2>
            <p className="text-xl md:text-2xl text-anime-light-gray max-w-3xl mx-auto">
              <span className="text-anime-gold">Top performing units</span> dominating the current meta battlefield
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {metaUnits.length > 0 ? (
              metaUnits.map((unit, index) => (
                <div key={unit.id} className="unit-card gaming-border group relative overflow-hidden" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-anime-gold/20 to-transparent"></div>
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-anime-gold/30 to-anime-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                        {unit.image ? (
                          <img 
                            src={unit.image} 
                            alt={unit.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-12 h-12 bg-anime-gold/50 rounded-xl flex items-center justify-center" style={{display: unit.image ? 'none' : 'flex'}}>
                          <div className="w-6 h-6 bg-anime-gold rounded"></div>
                        </div>
                      </div>
                      <div className="absolute -top-3 -right-3 bg-anime-gold text-anime-darker text-sm font-black rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                        #{index + 1}
                      </div>
                      <div className="absolute inset-0 rounded-2xl bg-anime-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-2xl font-bold text-anime-light group-hover:text-anime-primary transition-colors duration-300">
                        {unit.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className={`font-bold text-lg ${getTierColor(unit.tier)} px-3 py-1 rounded-lg`}>
                          {unit.tier}
                        </span>
                        <span className="text-anime-light-gray font-medium">
                          {unit.rarity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-anime-light-gray">
                          Element: <span className="text-anime-secondary font-semibold">{unit.element}</span>
                        </span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-anime-gold' : 'bg-anime-gold/30'}`}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-800/40 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No Meta Units</h3>
                <p className="text-slate-400">Add Meta tier units to see the top performers</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/units" 
              className="anime-button text-lg px-10 py-4 inline-block"
            >
              <span className="relative z-10">View All Units</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-anime-darker via-anime-gray/10 to-anime-darker"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-16 animate-slide-up">
            <div className="inline-block mb-4">
              <span className="text-anime-secondary text-sm font-bold uppercase tracking-wider">Premium Features</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black gradient-text mb-8">Why Choose Our Calculator?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="anime-card text-center gaming-border group">
              <div className="w-16 h-16 mx-auto mb-6 bg-anime-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 bg-anime-primary rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-anime-light mb-4 group-hover:text-anime-primary transition-colors">Lightning Fast</h3>
              <p className="text-anime-light-gray text-lg leading-relaxed">
                Get <span className="text-anime-accent">instant calculations</span> with our optimized algorithms and real-time processing
              </p>
              <div className="mt-6 flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-anime-primary"></div>
                ))}
              </div>
            </div>
            
            <div className="anime-card text-center gaming-border group">
              <div className="w-16 h-16 mx-auto mb-6 bg-anime-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 bg-anime-secondary rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-anime-light mb-4 group-hover:text-anime-primary transition-colors">Accurate Results</h3>
              <p className="text-anime-light-gray text-lg leading-relaxed">
                <span className="text-anime-secondary">Precise stat calculations</span> based on official game mechanics and data mining
              </p>
              <div className="mt-6 flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-anime-secondary"></div>
                ))}
              </div>
            </div>
            
            <div className="anime-card text-center gaming-border group">
              <div className="w-16 h-16 mx-auto mb-6 bg-anime-accent/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 bg-anime-accent rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-anime-light mb-4 group-hover:text-anime-primary transition-colors">Cross Platform</h3>
              <p className="text-anime-light-gray text-lg leading-relaxed">
                Optimized for <span className="text-anime-accent">all devices</span> with responsive design and mobile-first approach
              </p>
              <div className="mt-6 flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-anime-accent"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 