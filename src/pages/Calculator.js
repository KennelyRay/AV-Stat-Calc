import React, { useState, useEffect } from 'react';
import { useUnits } from '../contexts/UnitsContext';

// Professional SVG Icons
const Icons = {
  Target: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Zap: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
    </svg>
  ),
  Star: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polygon points="12,2 15.09,8.26 22,9 17,14.74 18.18,21.02 12,17.77 5.82,21.02 7,14.74 2,9 8.91,8.26"/>
    </svg>
  ),
  BarChart: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="12" y1="20" x2="12" y2="10"/>
      <line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
  Settings: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m17-4a4 4 0 01-8 0m8 0a4 4 0 00-8 0m-4 8a4 4 0 108 0m-8 0a4 4 0 008 0"/>
    </svg>
  ),
  Search: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  X: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ChevronRight: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="9,18 15,12 9,6"/>
    </svg>
  ),
  User: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  TrendingUp: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
      <polyline points="17,6 23,6 23,12"/>
    </svg>
  ),
  Calculator: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="8" y1="10" x2="16" y2="10"/>
      <line x1="8" y1="14" x2="16" y2="14"/>
      <line x1="8" y1="18" x2="12" y2="18"/>
    </svg>
  ),
  Menu: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
};

// Enhanced animated background component
const CalculatorBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute w-0.5 h-0.5 bg-anime-primary/15 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animation: `float ${Math.random() * 4 + 8}s ease-in-out infinite`
        }}
      />
    ))}
    <div className="absolute inset-0 bg-gradient-to-br from-anime-primary/1 via-transparent to-anime-secondary/1 opacity-30" />
  </div>
);

const Calculator = () => {
  const { units, loading, searchUnits } = useUnits();

  // Available traits with their effects - Updated hierarchy and tiered traits
  const availableTraits = [
    {
      id: 'monarch',
      name: 'Monarch',
      description: '+300% Damage, -10% SPA, +5% Range, ONE PLACEMENT only',
      icon: '/images/Traits/Monarch.webp',
      effects: {
        damage: 4.0,  // +300% = 4x multiplier
        sps: 0.9,     // -10% SPA
        range: 1.05   // +5% Range
      },
      hierarchy: 1
    },
    {
      id: 'ethereal',
      name: 'Ethereal',
      description: '+20% Damage, -20% SPA, +5% Range',
      icon: '/images/Traits/Ethereal.webp',
      effects: {
        damage: 1.2,  // +20% Damage
        sps: 0.8,     // -20% SPA
        range: 1.05   // +5% Range
      },
      hierarchy: 2
    },
    {
      id: 'deadeye',
      name: 'Deadeye',
      description: '45% Critical Chance, 50% Critical Damage',
      icon: '/images/Traits/Deadeye.webp',
      effects: {
        // Critical effects would be handled separately in actual game mechanics
        damage: 1.0   // Base damage (critical calculations handled elsewhere)
      },
      hierarchy: 3
    },
    {
      id: 'solar',
      name: 'Solar',
      description: '+10% Damage, -5% SPA, +25% Range',
      icon: '/images/Traits/Solar.webp',
      effects: {
        damage: 1.1,   // +10% Damage
        sps: 0.95,     // -5% SPA
        range: 1.25    // +25% Range
      },
      hierarchy: 4
    },
    {
      id: 'blitz',
      name: 'Blitz',
      description: '-20% SPA reduction',
      icon: '/images/Traits/Blitz.webp',
      effects: {
        sps: 0.8  // -20% SPA
      },
      hierarchy: 5
    },
    {
      id: 'fortune',
      name: 'Fortune',
      description: '+20% Cash income (Farm) / -10% upgrade cost (Non-farm)',
      icon: '/images/Traits/Fortune.webp',
      effects: {
        // Special economic effects handled separately
        damage: 1.0
      },
      hierarchy: 6
    },
    {
      id: 'marksman',
      name: 'Marksman',
      description: '+30% Range boost',
      icon: '/images/Traits/Marksman.webp',
      effects: {
        range: 1.3  // +30% Range
      },
      hierarchy: 7
    },
    {
      id: 'scholar',
      name: 'Scholar',
      description: '+50% Experience boost',
      icon: '/images/Traits/Scholar.webp',
      effects: {
        // Experience boost handled separately
        damage: 1.0
      },
      hierarchy: 8
    },
    {
      id: 'vigor',
      name: 'Vigor',
      description: 'Select tier for damage boost',
      icon: '/images/Traits/Vigor.webp',
      tiered: true,
      tiers: [
        { level: 1, description: 'Vigor 1 - Increases Damage by +5%', effects: { damage: 1.05 } },
        { level: 2, description: 'Vigor 2 - Increases Damage by +10%', effects: { damage: 1.10 } },
        { level: 3, description: 'Vigor 3 - Increases Damage by +15%', effects: { damage: 1.15 } }
      ],
      hierarchy: 9
    },
    {
      id: 'swift',
      name: 'Swift',
      description: 'Select tier for SPA reduction',
      icon: '/images/Traits/Swift.webp',
      tiered: true,
      tiers: [
        { level: 1, description: 'Swift 1 - Decreases SPA by -5%', effects: { sps: 0.95 } },
        { level: 2, description: 'Swift 2 - Decreases SPA by -7.5%', effects: { sps: 0.925 } },
        { level: 3, description: 'Swift 3 - Decreases SPA by -12.5%', effects: { sps: 0.875 } }
      ],
      hierarchy: 10
    },
    {
      id: 'range',
      name: 'Range',
      description: 'Select tier for range boost',
      icon: '/images/Traits/Range.webp',
      tiered: true,
      tiers: [
        { level: 1, description: 'Range 1 - Increases Range by +5%', effects: { range: 1.05 } },
        { level: 2, description: 'Range 2 - Increases Range by +10%', effects: { range: 1.10 } },
        { level: 3, description: 'Range 3 - Increases Range by +15%', effects: { range: 1.15 } }
      ],
      hierarchy: 11
    }
  ];

  // Stat grades configuration - Updated with correct percentages
  const statGrades = {
    'GODLY': {
      damageRange: [23, 25],
      rangeRange: [11.5, 12.5],
      spaRange: [11.5, 12.5],
      color: 'from-cyan-400 to-cyan-600',
      textColor: 'text-cyan-400'
    },
    'Z+': {
      damageRange: [20, 22.99],
      rangeRange: [10, 11.49],
      spaRange: [10, 11.49],
      color: 'from-pink-400 to-pink-600',
      textColor: 'text-pink-400'
    },
    'Z': {
      damageRange: [17, 19.99],
      rangeRange: [8.5, 9.99],
      spaRange: [8.5, 9.99],
      color: 'from-yellow-400 to-yellow-600',
      textColor: 'text-yellow-400'
    },
    'S': {
      damageRange: [14, 16.99],
      rangeRange: [7, 8.49],
      spaRange: [7, 8.49],
      color: 'from-purple-400 to-purple-600',
      textColor: 'text-purple-400'
    },
    'A': {
      damageRange: [11, 13.99],
      rangeRange: [5.5, 6.99],
      spaRange: [5.5, 6.99],
      color: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-400'
    },
    'B': {
      damageRange: [8, 10.99],
      rangeRange: [4, 5.49],
      spaRange: [4, 5.49],
      color: 'from-green-400 to-green-600',
      textColor: 'text-green-400'
    },
    'C': {
      damageRange: [5, 7.99],
      rangeRange: [2.5, 3.99],
      spaRange: [2.5, 3.99],
      color: 'from-gray-400 to-gray-600',
      textColor: 'text-gray-400'
    },
    'D': {
      damageRange: [0, 4.99],
      rangeRange: [0, 2.49],
      spaRange: [0, 2.49],
      color: 'from-red-400 to-red-600',
      textColor: 'text-red-400'
    }
  };

  // State management
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitSearch, setUnitSearch] = useState('');
  const [level, setLevel] = useState(1);
  const [upgrade, setUpgrade] = useState(1);
  const [statGradeSelection, setStatGradeSelection] = useState({
    damage: 'B',
    range: 'B',
    sps: 'B'
  });
  const [statPercentages, setStatPercentages] = useState({
    damage: 9,
    range: 4.75,
    sps: 4.75
  });
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [selectedTraitTier, setSelectedTraitTier] = useState(null);
  const [traitDialogOpen, setTraitDialogOpen] = useState(false);
  const [dialogTrait, setDialogTrait] = useState(null);
  const [calculatedStats, setCalculatedStats] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Filter units based on search
  const filteredUnits = searchUnits(unitSearch);

  // Helper function to get stat range key
  const getStatRangeKey = (stat) => {
    if (stat === 'damage') return 'damageRange';
    if (stat === 'sps') return 'spaRange';
    if (stat === 'range') return 'rangeRange';
    if (stat === 'placement') return 'damageRange';
    return 'damageRange';
  };

  // Calculate final stats
  const calculateStats = () => {
    if (!selectedUnit) return null;

    const baseStats = selectedUnit.baseStats;
    const levelMultiplier = 1 + (level - 1) * 0.1;
    const upgradeMultiplier = 1 + (upgrade - 1) * 0.05;

    let finalStats = {};

    Object.keys(baseStats).forEach(stat => {
      if (stat === 'placement') {
        finalStats[stat] = baseStats[stat];
        return;
      }

      const percentageBonus = statPercentages[stat] / 100;
      const statMultiplier = 1 + percentageBonus;
      let statValue = baseStats[stat] * levelMultiplier * upgradeMultiplier * statMultiplier;

      if (selectedTrait) {
        const trait = availableTraits.find(t => t.id === selectedTrait);
        if (trait) {
          let traitEffects = {};
          
          if (trait.tiered && selectedTraitTier) {
            // Use tiered effects
            const tier = trait.tiers.find(t => t.level === selectedTraitTier);
            if (tier) {
              traitEffects = tier.effects;
            }
          } else if (!trait.tiered) {
            // Use regular effects
            traitEffects = trait.effects;
          }
          
          if (traitEffects[stat]) {
            statValue *= traitEffects[stat];
          }
        }
      }

      finalStats[stat] = Math.round(statValue * 100) / 100;
    });

    return finalStats;
  };

  // Update calculated stats when dependencies change
  useEffect(() => {
    setCalculatedStats(calculateStats());
  }, [selectedUnit, level, upgrade, statPercentages, selectedTrait, selectedTraitTier]);

  // Handle stat percentage changes
  const handleStatPercentageChange = (statType, value) => {
    const percentage = parseFloat(value);
    setStatPercentages(prev => ({
      ...prev,
      [statType]: percentage
    }));

    const rangeKey = getStatRangeKey(statType);
    let newGrade = 'D';
    
    for (const [grade, data] of Object.entries(statGrades)) {
      const [min, max] = data[rangeKey];
      if (percentage >= min && percentage <= max) {
        newGrade = grade;
        break;
      }
    }
    
    setStatGradeSelection(prev => ({
      ...prev,
      [statType]: newGrade
    }));
  };

  // Handle trait selection
  const handleTraitSelect = (trait) => {
    if (trait.tiered) {
      // Open dialog for tiered traits
      setDialogTrait(trait);
      setTraitDialogOpen(true);
    } else {
      // Regular trait selection
      if (selectedTrait === trait.id) {
        setSelectedTrait(null);
        setSelectedTraitTier(null);
      } else {
        setSelectedTrait(trait.id);
        setSelectedTraitTier(null);
      }
    }
  };

  // Handle tier selection from dialog
  const handleTierSelect = (tierLevel) => {
    setSelectedTrait(dialogTrait.id);
    setSelectedTraitTier(tierLevel);
    setTraitDialogOpen(false);
    setDialogTrait(null);
  };

  // Close trait dialog
  const closeTraitDialog = () => {
    setTraitDialogOpen(false);
    setDialogTrait(null);
  };

  // Handle unit selection
  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedUnit(null);
    setSelectedTrait(null);
    setSelectedTraitTier(null);
    setTraitDialogOpen(false);
    setDialogTrait(null);
    setLevel(1);
    setUpgrade(1);
    setStatPercentages({
      damage: 9,
      range: 4.75,
      sps: 4.75
    });
    setStatGradeSelection({
      damage: 'B',
      range: 'B',
      sps: 'B'
    });
  };

  // Get element image
  const getElementImage = (element) => {
    const elementMap = {
      'Holy': '/images/Elements/Holy (1).webp',
      'Water': '/images/Elements/Water.webp',
      'Fire': '/images/Elements/Fire.webp',
      'Spark': '/images/Elements/Spark.webp',
      'Nature': '/images/Elements/Nature.webp',
      'Unbound': '/images/Elements/Unbound.webp',
      'Curse': '/images/Elements/Curse.webp',
      'Passion': '/images/Elements/Passion.webp',
      'Blast': '/images/Elements/Blast.webp',
      'Cosmic': '/images/Elements/Cosmic.webp'
    };
    return elementMap[element] || '/images/Elements/UnknownElement.webp';
  };

  // Get tier image
  const getTierImage = (tier) => {
    const tierMap = {
      'Meta': '/images/UnitTiers/Meta.webp',
      'SemiMeta': '/images/UnitTiers/SemiMeta.webp',
      'Good': '/images/UnitTiers/Good.webp',
      'Support': '/images/UnitTiers/Support.webp',
      'MetaSupport': '/images/UnitTiers/MetaSupport.webp',
      'Bad': '/images/UnitTiers/Bad.webp',
      'Broken': '/images/UnitTiers/Broken.webp'
    };
    return tierMap[tier] || '/images/UnitTiers/Support.webp';
  };

  // Get rarity styling
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Secret': return 'border-red-400/60 bg-red-500/10';
      case 'Mythical': return 'border-purple-400/60 bg-purple-500/10';
      case 'Legendary': return 'border-yellow-400/60 bg-yellow-500/10';
      case 'Epic': return 'border-blue-400/60 bg-blue-500/10';
      case 'Rare': return 'border-green-400/60 bg-green-500/10';
      default: return 'border-slate-400/40 bg-slate-500/5';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <CalculatorBackground />
        <div className="text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 bg-anime-primary/20 rounded-2xl flex items-center justify-center animate-pulse">
            <Icons.Calculator className="w-8 h-8 text-anime-primary" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Loading Calculator...</h3>
          <p className="text-slate-400">Preparing units database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <CalculatorBackground />
      
      {/* Left Sidebar */}
      <div className={`relative z-10 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/60 transition-all duration-300 ${
        sidebarOpen ? 'w-96' : 'w-16'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-800/60">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-anime-primary/20 rounded-lg flex items-center justify-center">
                    <Icons.Calculator className="w-4 h-4 text-anime-primary" />
                  </div>
                  <div>
                    <h1 className="text-sm font-semibold text-white">Unit Calculator</h1>
                    <p className="text-xs text-slate-400">Build optimizer</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-8 h-8 bg-slate-800/60 hover:bg-slate-700/80 rounded-lg flex items-center justify-center transition-colors"
              >
                <Icons.Menu className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {sidebarOpen && (
            <>
              {/* Unit Search */}
              <div className="p-4 border-b border-slate-800/60">
                <div className="relative">
                  <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search units..."
                    value={unitSearch}
                    onChange={(e) => setUnitSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-800/60 border border-slate-700/60 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-anime-primary/40 focus:border-anime-primary/60"
                  />
                </div>
              </div>

              {/* Units List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Select Unit</h3>
                {filteredUnits.length > 0 ? (
                  filteredUnits.map((unit) => (
                    <button
                      key={unit.id}
                      onClick={() => handleUnitSelect(unit)}
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        selectedUnit?.id === unit.id 
                          ? 'border-anime-primary bg-anime-primary/10' 
                          : 'border-slate-700/60 bg-slate-800/30 hover:border-slate-600/80 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={unit.image || '/api/placeholder/40/40'} 
                            alt={unit.name} 
                            className="w-10 h-10 rounded-lg object-cover"
                            onError={(e) => {
                              e.target.src = '/api/placeholder/40/40';
                            }}
                          />
                          <div className="absolute -top-1 -right-1 flex gap-0.5">
                            <img src={getElementImage(unit.element)} alt={unit.element} className="w-3 h-3 rounded" />
                            <img src={getTierImage(unit.tier)} alt={unit.tier} className="w-3 h-3 rounded" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-medium text-white truncate">{unit.name}</h4>
                          <p className="text-xs text-slate-400">{unit.rarity}</p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-3 bg-slate-800/40 rounded-xl flex items-center justify-center">
                      <Icons.Search className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-400 mb-1">No units found</p>
                    <p className="text-xs text-slate-500">
                      {unitSearch ? 'Try a different search term' : 'Add units via Admin Panel'}
                    </p>
                  </div>
                )}
              </div>

              {/* Clear Button */}
              {selectedUnit && (
                <div className="p-4 border-t border-slate-800/60">
                  <button
                    onClick={clearSelection}
                    className="w-full px-3 py-2 text-sm text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 max-w-[1440px]">
        {!selectedUnit ? (
          /* Welcome State */
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-anime-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Icons.Target className="w-10 h-10 text-anime-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">Select a Unit</h2>
              <p className="text-slate-400 leading-relaxed">
                Choose a unit from the sidebar to start calculating optimized stat builds and configurations.
              </p>
            </div>
          </div>
        ) : (
          /* Calculator Interface */
          <div className="h-full overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/60 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={selectedUnit.image} alt={selectedUnit.name} className="w-12 h-12 rounded-xl" />
                  <div>
                    <h2 className="text-lg font-semibold text-white">{selectedUnit.name}</h2>
                    <p className="text-sm text-slate-400">{selectedUnit.rarity} • {selectedUnit.tier}</p>
                  </div>
                </div>
                {calculatedStats && (
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-xs text-slate-500">DAMAGE</div>
                      <div className="font-semibold text-white">{calculatedStats.damage}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500">RANGE</div>
                      <div className="font-semibold text-white">{calculatedStats.range}m</div>
                    </div>
                    <div className="text-center">
                                        <div className="text-xs text-slate-500">SPA</div>
                  <div className="font-semibold text-white">{calculatedStats.sps}/s</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Configuration Content */}
            <div className="p-6 space-y-8">
              {/* Level & Upgrade Section */}
              <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Icons.Zap className="w-5 h-5 text-anime-primary" />
                  <h3 className="text-lg font-semibold text-white">Level & Upgrade</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Level */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-medium text-slate-300">Level</label>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-anime-primary">{level}</span>
                        <span className="text-sm text-slate-500">/ 60</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="60"
                      value={level}
                      onChange={(e) => setLevel(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>1</span>
                      <span>60</span>
                    </div>
                  </div>
                  
                  {/* Upgrade */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-medium text-slate-300">Upgrade</label>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-orange-400">{upgrade}</span>
                        <span className="text-sm text-slate-500">/ 10</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={upgrade}
                      onChange={(e) => setUpgrade(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>1</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Configuration */}
              <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Icons.TrendingUp className="w-5 h-5 text-anime-primary" />
                  <h3 className="text-lg font-semibold text-white">Stat Configuration</h3>
                </div>
                
                <div className="space-y-8">
                  {['damage', 'range', 'sps'].map((statType) => {
                    const rangeKey = getStatRangeKey(statType);
                    const currentGrade = statGradeSelection[statType];
                    const gradeData = statGrades[currentGrade];
                    const maxRange = gradeData[rangeKey][1];

                    return (
                      <div key={statType} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-lg font-semibold text-white capitalize">
                            {statType === 'sps' ? 'SPA' : statType}
                          </label>
                          <div className="flex items-center gap-3">
                            <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${gradeData.textColor} bg-current/15 border border-current/30`}>
                              {currentGrade}
                            </span>
                            <span className="text-xl font-bold text-white">
                              {statPercentages[statType]}%
                            </span>
                          </div>
                        </div>

                        {/* Grade Selection */}
                        <div className="grid grid-cols-8 gap-2">
                          {Object.keys(statGrades).map(grade => {
                            const gradeInfo = statGrades[grade];
                            const [min, max] = gradeInfo[rangeKey];
                            const gradeImageName = grade === 'Z+' ? 'ZPLUS' : grade;
                            
                            return (
                              <button
                                key={grade}
                                onClick={() => {
                                  setStatGradeSelection(prev => ({
                                    ...prev,
                                    [statType]: grade
                                  }));
                                  // Set percentage to middle of grade range
                                  const middleValue = (min + max) / 2;
                                  setStatPercentages(prev => ({
                                    ...prev,
                                    [statType]: Number(middleValue.toFixed(2))
                                  }));
                                }}
                                className={`p-3 rounded-lg border transition-all text-center hover:scale-105 ${
                                  statGradeSelection[statType] === grade
                                    ? 'border-anime-primary bg-anime-primary/15 shadow-lg shadow-anime-primary/25'
                                    : 'border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 hover:border-slate-600/70'
                                }`}
                              >
                                <div className="flex flex-col items-center">
                                  <img 
                                    src={`/images/Stats/Stat${gradeImageName}.webp`} 
                                    alt={grade}
                                    className="w-8 h-8 mb-1"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'block';
                                    }}
                                  />
                                  <div className="w-8 h-8 bg-slate-600/30 rounded hidden items-center justify-center mb-1">
                                    <span className="text-xs font-bold text-slate-400">{grade}</span>
                                  </div>
                                  <div className="text-xs font-bold text-white">{grade}</div>
                                  <div className="text-xs mt-0.5 text-slate-400">{min}-{max}%</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Manual Percentage Slider */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Fine-tune percentage:</span>
                            <span className="text-slate-300">
                              Base: {selectedUnit.baseStats[statType]} {statType === 'range' ? 'm' : statType === 'sps' ? '/s' : ''}
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max={maxRange}
                            step="0.01"
                            value={statPercentages[statType]}
                            onChange={(e) => handleStatPercentageChange(statType, e.target.value)}
                            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>0%</span>
                            <span>{maxRange}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Traits Section */}
              <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Icons.Star className="w-5 h-5 text-anime-primary" />
                  <h3 className="text-lg font-semibold text-white">Trait Selection</h3>
                  <span className="text-sm text-slate-400">Optional</span>
                  {selectedTrait && (
                    <div className="ml-auto flex items-center gap-2">
                      <span className="text-sm text-anime-primary font-medium">
                        {availableTraits.find(t => t.id === selectedTrait)?.name}
                        {selectedTraitTier && ` ${selectedTraitTier}`}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedTrait(null);
                          setSelectedTraitTier(null);
                        }}
                        className="w-5 h-5 bg-slate-700/60 hover:bg-slate-600/80 rounded text-slate-400 hover:text-white transition-colors"
                      >
                        <Icons.X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {availableTraits
                    .sort((a, b) => a.hierarchy - b.hierarchy)
                    .map((trait) => {
                      const isSelected = selectedTrait === trait.id;
                      return (
                        <button
                          key={trait.id}
                          onClick={() => handleTraitSelect(trait)}
                          className={`p-4 rounded-xl border transition-all relative ${
                            isSelected
                              ? 'border-anime-primary bg-anime-primary/10' 
                              : 'border-slate-700/60 bg-slate-800/30 hover:border-slate-600/80 hover:bg-slate-800/50'
                          }`}
                        >
                          {trait.tiered && (
                            <div className="absolute top-2 right-2">
                              <span className="text-xs bg-anime-accent text-anime-darker px-1.5 py-0.5 rounded font-bold">
                                1-3
                              </span>
                            </div>
                          )}
                          <div className="text-center">
                            <img src={trait.icon} alt={trait.name} className="w-10 h-10 mx-auto rounded-lg mb-3" />
                            <h4 className="text-sm font-medium text-white mb-1">{trait.name}</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">{trait.description}</p>
                            {isSelected && selectedTraitTier && (
                              <div className="mt-2 text-xs text-anime-primary font-medium">
                                Tier {selectedTraitTier} Active
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Final Results */}
              {calculatedStats && (
                <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Icons.BarChart className="w-5 h-5 text-anime-primary" />
                    <h3 className="text-lg font-semibold text-white">Final Statistics</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {Object.entries(calculatedStats).map(([stat, value]) => (
                      <div key={stat} className="text-center p-4 bg-slate-800/30 rounded-xl">
                        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                          {stat === 'sps' ? 'SPA' : stat}
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                          {stat === 'placement' ? value.toLocaleString() : value}
                        </div>
                        <div className="text-xs text-slate-500">
                          {stat === 'range' ? 'meters' : stat === 'sps' ? 'per second' : stat === 'placement' ? 'cost' : 'points'}
                        </div>
                        {stat !== 'placement' && (
                          <div className="text-xs text-anime-primary mt-1">
                            +{(((value / selectedUnit.baseStats[stat]) - 1) * 100).toFixed(1)}%
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Trait Tier Selection Dialog */}
      {traitDialogOpen && dialogTrait && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img src={dialogTrait.icon} alt={dialogTrait.name} className="w-8 h-8 rounded-lg" />
                <h3 className="text-xl font-semibold text-white">{dialogTrait.name}</h3>
              </div>
              <button
                onClick={closeTraitDialog}
                className="w-8 h-8 bg-slate-800/60 hover:bg-slate-700/80 rounded-lg flex items-center justify-center transition-colors"
              >
                <Icons.X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <p className="text-slate-300 mb-6">Select the tier level for this trait:</p>

            <div className="space-y-3">
              {dialogTrait.tiers?.map((tier) => (
                <button
                  key={tier.level}
                  onClick={() => handleTierSelect(tier.level)}
                  className="w-full p-4 text-left bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/60 hover:border-slate-600/80 rounded-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">Tier {tier.level}</span>
                    <div className="flex gap-1">
                      {[...Array(tier.level)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-anime-primary rounded-full"></div>
                      ))}
                      {[...Array(3 - tier.level)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-slate-600 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">{tier.description}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/60">
              <button
                onClick={closeTraitDialog}
                className="w-full px-4 py-2 text-sm text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator; 