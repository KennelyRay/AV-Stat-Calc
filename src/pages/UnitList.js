import React, { useState } from 'react';
import { useUnits } from '../contexts/UnitsContext';

const UnitList = () => {
  const { units, loading, searchUnits, getUnitsByRarity } = useUnits();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('All');

  const rarities = ['All', 'Vanguard', 'Secret', 'Mythical', 'Legendary', 'Epic', 'Rare', 'Common'];

  const filteredUnits = (() => {
    let filtered = searchTerm ? searchUnits(searchTerm) : units;
    if (selectedRarity !== 'All') {
      filtered = filtered.filter(unit => unit.rarity === selectedRarity);
    }
    return filtered;
  })();

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Vanguard': return 'text-pink-400 border-pink-400';
      case 'Secret': return 'text-red-400 border-red-400';
      case 'Mythical': return 'text-purple-400 border-purple-400';
      case 'Legendary': return 'text-yellow-400 border-yellow-400';
      case 'Epic': return 'text-blue-400 border-blue-400';
      case 'Rare': return 'text-green-400 border-green-400';
      case 'Common': return 'text-slate-400 border-slate-400';
      default: return 'text-anime-light border-anime-light';
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Broken': return 'bg-red-500 text-white';
      case 'Meta': return 'bg-yellow-500 text-white';
      case 'MetaSupport': return 'bg-orange-500 text-white';
      case 'SemiMeta': return 'bg-blue-500 text-white';
      case 'Good': return 'bg-green-500 text-white';
      case 'Support': return 'bg-cyan-500 text-white';
      case 'Bad': return 'bg-slate-500 text-white';
      default: return 'bg-anime-light text-anime-dark';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-anime-primary/20 rounded-2xl flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-anime-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Loading Units...</h3>
          <p className="text-slate-400">Fetching the unit database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Unit Database</h1>
          <p className="text-anime-light text-lg">
            Browse all available units and their stats
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="anime-card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search units..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-anime-gray/50 border border-anime-gray-light/30 rounded-lg text-anime-light placeholder-anime-light/50 focus:outline-none focus:border-anime-primary transition-colors"
              />
            </div>
            
            {/* Rarity Filter */}
            <div className="md:w-48">
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="w-full px-4 py-3 bg-anime-gray/50 border border-anime-gray-light/30 rounded-lg text-anime-light focus:outline-none focus:border-anime-primary transition-colors"
              >
                {rarities.map(rarity => (
                  <option key={rarity} value={rarity} className="bg-anime-gray">
                    {rarity} Rarity
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUnits.map((unit) => (
            <div key={unit.id} className="unit-card group">
              {/* Unit Image */}
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-anime-gray/30 to-anime-gray-light/20 flex items-center justify-center">
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
                  <div className="w-16 h-16 bg-anime-primary/30 rounded-xl flex items-center justify-center" style={{display: unit.image ? 'none' : 'flex'}}>
                    <div className="w-8 h-8 bg-anime-primary rounded"></div>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getTierColor(unit.tier)}`}>
                    {unit.tier}
                  </span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold bg-anime-darker/90 border ${getRarityColor(unit.rarity)}`}>
                    {unit.rarity}
                  </span>
                </div>
              </div>

              {/* Unit Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-anime-light group-hover:text-anime-primary transition-colors">
                  {unit.name}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-anime-secondary">
                    {unit.element}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getTierColor(unit.tier)}`}>
                    {unit.tier}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredUnits.length === 0 && (
          <div className="anime-card text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-anime-secondary/20 rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 bg-anime-secondary rounded-lg"></div>
            </div>
            <h3 className="text-xl font-semibold text-anime-light mb-2">No Units Found</h3>
            <p className="text-anime-secondary">
              Try adjusting the search terms or filters
            </p>
          </div>
        )}

        {/* Results Count */}
        <div className="text-center mt-8">
          <p className="text-anime-secondary">
            Showing {filteredUnits.length} of {units.length} units
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnitList; 