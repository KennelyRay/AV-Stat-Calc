import React, { useState, useRef } from 'react';
import { useUnits } from '../contexts/UnitsContext';

// Icons component
const Icons = {
  Plus: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Edit: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Delete: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="3,6 5,6 21,6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  ),
  Upload: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  X: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Save: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17,21 17,13 7,13 7,21"/>
      <polyline points="7,3 7,8 15,8"/>
    </svg>
  ),
  Settings: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m17-4a4 4 0 01-8 0m8 0a4 4 0 00-8 0m-4 8a4 4 0 108 0m-8 0a4 4 0 008 0"/>
    </svg>
  ),
  Image: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21,15 16,10 5,21"/>
    </svg>
  ),
  User: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  BarChart: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="12" y1="20" x2="12" y2="10"/>
      <line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
  Target: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Zap: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
    </svg>
  ),
  Star: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
    </svg>
  ),
  ChevronRight: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="9,18 15,12 9,6"/>
    </svg>
  )
};

// Image Upload Component
const ImageUpload = ({ label, currentImage, onImageSelect }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
        <Icons.Image className="w-4 h-4 text-anime-primary" />
        {label}
      </label>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="group relative w-full h-48 border-2 border-dashed border-slate-600/50 hover:border-anime-primary/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 bg-slate-700/20 hover:bg-slate-700/30"
      >
        {currentImage ? (
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            <img 
              src={currentImage} 
              alt="Preview" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-sm rounded-lg">
                <Icons.Upload className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Change Image</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-anime-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-anime-primary/20 transition-colors">
              <Icons.Upload className="w-8 h-8 text-anime-primary" />
            </div>
            <div className="text-slate-400 group-hover:text-slate-300 transition-colors">
              <div className="font-medium mb-1">Drop image here or click to browse</div>
              <div className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</div>
            </div>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

// Evolution Requirement Component
const EvolutionRequirement = ({ requirement, index, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/60">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-white">Requirement {index + 1}</h4>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-6 h-6 bg-anime-primary/20 hover:bg-anime-primary/30 rounded text-anime-primary transition-colors flex items-center justify-center"
          >
            <Icons.Edit className="w-3 h-3" />
          </button>
          <button
            onClick={() => onRemove(index)}
            className="w-6 h-6 bg-red-500/20 hover:bg-red-500/30 rounded text-red-400 transition-colors flex items-center justify-center"
          >
            <Icons.Delete className="w-3 h-3" />
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Requirement name"
            value={requirement.name}
            onChange={(e) => onUpdate(index, 'name', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700/60 border border-slate-600/60 rounded text-white placeholder-slate-400 text-sm focus:outline-none focus:border-anime-primary/60"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={requirement.quantity}
            onChange={(e) => onUpdate(index, 'quantity', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-slate-700/60 border border-slate-600/60 rounded text-white placeholder-slate-400 text-sm focus:outline-none focus:border-anime-primary/60"
          />
          <ImageUpload
            label="Requirement Icon"
            currentImage={requirement.icon}
            onImageSelect={(image) => onUpdate(index, 'icon', image)}
          />
          <button
            onClick={() => setIsEditing(false)}
            className="w-full px-3 py-1 bg-anime-primary/20 hover:bg-anime-primary/30 text-anime-primary rounded text-sm transition-colors"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            {requirement.icon && (
              <img src={requirement.icon} alt="Requirement" className="w-8 h-8 rounded" />
            )}
            <div>
              <div className="text-sm text-white">{requirement.name || 'Unnamed requirement'}</div>
              <div className="text-xs text-slate-400">Quantity: {requirement.quantity || 0}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Unit Form Component
const UnitForm = ({ unit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: unit?.name || '',
    description: unit?.description || '',
    rarity: unit?.rarity || 'Common',
    element: unit?.element || 'None',
    tier: unit?.tier || 'Support',
    image: unit?.image || '',
    baseStats: unit?.baseStats || {
      damage: 100,
      range: 5,
      sps: 1,
      placement: 1000
    },
    unitType: unit?.unitType || 'base', // base, evolution, non-evolvable
    maxUpgrades: unit?.maxUpgrades || 10,
    evolutionRequirements: unit?.evolutionRequirements || []
  });

  const rarities = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythical', 'Secret', 'Vanguard'];
  const elements = ['None', 'Holy', 'Water', 'Fire', 'Spark', 'Nature', 'Unbound', 'Curse', 'Passion', 'Blast', 'Cosmic', 'Unknown'];
  const tiers = ['Bad', 'Support', 'Good', 'SemiMeta', 'Meta', 'MetaSupport', 'Broken'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateStat = (stat, value) => {
    setFormData(prev => ({
      ...prev,
      baseStats: {
        ...prev.baseStats,
        [stat]: parseFloat(value) || 0
      }
    }));
  };

  const addEvolutionRequirement = () => {
    setFormData(prev => ({
      ...prev,
      evolutionRequirements: [
        ...prev.evolutionRequirements,
        { name: '', quantity: 1, icon: '' }
      ]
    }));
  };

  const updateEvolutionRequirement = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      evolutionRequirements: prev.evolutionRequirements.map((req, i) =>
        i === index ? { ...req, [field]: value } : req
      )
    }));
  };

  const removeEvolutionRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      evolutionRequirements: prev.evolutionRequirements.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center z-[999] p-6">
      <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 max-w-[1600px] w-full max-h-[80vh] overflow-y-auto shadow-2xl relative">
        {/* Header with gradient accent */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-anime-primary/10 via-anime-secondary/10 to-anime-accent/10 rounded-2xl blur-lg"></div>
          <div className="relative bg-slate-800/50 rounded-2xl p-6 border border-slate-700/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-2">
                  {unit ? 'Edit Unit' : 'Create New Unit'}
                </h2>
                <p className="text-slate-400">
                  {unit ? 'Modify unit properties and statistics' : 'Add a new unit to the collection with custom stats and abilities'}
                </p>
              </div>
              <button
                onClick={onCancel}
                className="w-10 h-10 bg-slate-700/50 hover:bg-red-500/20 border border-slate-600/50 hover:border-red-500/50 rounded-xl flex items-center justify-center transition-all duration-300 group"
              >
                <Icons.X className="w-5 h-5 text-slate-400 group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-anime-primary/20 rounded-lg flex items-center justify-center">
                <Icons.User className="w-4 h-4 text-anime-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-6">
                              <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Unit Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-anime-primary/60 focus:ring-2 focus:ring-anime-primary/20 transition-all"
                    placeholder="Enter unit name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-anime-primary/60 focus:ring-2 focus:ring-anime-primary/20 transition-all h-24 resize-none"
                    placeholder="Unit description and lore..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Rarity</label>
                    <div className="relative">
                      <select
                        value={formData.rarity}
                        onChange={(e) => setFormData(prev => ({ ...prev, rarity: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-anime-primary/60 focus:ring-2 focus:ring-anime-primary/20 transition-all appearance-none cursor-pointer"
                      >
                        {rarities.map(rarity => (
                          <option key={rarity} value={rarity}>{rarity}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <Icons.ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Element</label>
                    <div className="relative">
                      <select
                        value={formData.element}
                        onChange={(e) => setFormData(prev => ({ ...prev, element: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-anime-primary/60 focus:ring-2 focus:ring-anime-primary/20 transition-all appearance-none cursor-pointer"
                      >
                        {elements.map(element => (
                          <option key={element} value={element}>{element}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <Icons.ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Tier</label>
                    <div className="relative">
                      <select
                        value={formData.tier}
                        onChange={(e) => setFormData(prev => ({ ...prev, tier: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-anime-primary/60 focus:ring-2 focus:ring-anime-primary/20 transition-all appearance-none cursor-pointer"
                      >
                        {tiers.map(tier => (
                          <option key={tier} value={tier}>{tier}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <Icons.ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Max Upgrades</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.maxUpgrades}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxUpgrades: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-anime-primary/60 focus:ring-2 focus:ring-anime-primary/20 transition-all"
                      placeholder="10"
                    />
                  </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Unit Type</label>
                  <div className="relative">
                    <select
                      value={formData.unitType}
                      onChange={(e) => setFormData(prev => ({ ...prev, unitType: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-anime-primary/60 focus:ring-2 focus:ring-anime-primary/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="base">Base Form (Can Evolve)</option>
                      <option value="evolution">Evolution Form</option>
                      <option value="non-evolvable">Non-Evolvable</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Icons.ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <div>
                <ImageUpload
                  label="Unit Image"
                  currentImage={formData.image}
                  onImageSelect={(image) => setFormData(prev => ({ ...prev, image }))}
                />
              </div>
            </div>
          </div>

          {/* Base Statistics Section */}
          <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-anime-secondary/20 rounded-lg flex items-center justify-center">
                <Icons.BarChart className="w-4 h-4 text-anime-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-white">Base Statistics</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                  <Icons.Target className="w-4 h-4 text-red-400" />
                  Damage
                </label>
                <input
                  type="number"
                  value={formData.baseStats.damage}
                  onChange={(e) => updateStat('damage', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-lg text-white focus:outline-none focus:border-red-400/60 focus:ring-2 focus:ring-red-400/20 transition-all"
                  min="0"
                  step="0.1"
                  placeholder="100"
                />
              </div>
              
              <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                  <Icons.Target className="w-4 h-4 text-green-400" />
                  Range (m)
                </label>
                <input
                  type="number"
                  value={formData.baseStats.range}
                  onChange={(e) => updateStat('range', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-lg text-white focus:outline-none focus:border-green-400/60 focus:ring-2 focus:ring-green-400/20 transition-all"
                  min="0"
                  step="0.1"
                  placeholder="5.0"
                />
              </div>
              
              <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                  <Icons.Zap className="w-4 h-4 text-yellow-400" />
                  SPA (/s)
                </label>
                <input
                  type="number"
                  value={formData.baseStats.sps}
                  onChange={(e) => updateStat('sps', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-lg text-white focus:outline-none focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  min="0"
                  step="0.1"
                  placeholder="1.0"
                />
              </div>
              
              <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                  <Icons.Star className="w-4 h-4 text-blue-400" />
                  Placement Cost
                </label>
                <input
                  type="number"
                  value={formData.baseStats.placement}
                  onChange={(e) => updateStat('placement', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-lg text-white focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  min="0"
                  placeholder="1000"
                />
              </div>
            </div>
          </div>

          {/* Evolution Requirements Section (only for base forms) */}
          {formData.unitType === 'base' && (
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-anime-accent/20 rounded-lg flex items-center justify-center">
                    <Icons.Star className="w-4 h-4 text-anime-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Evolution Requirements</h3>
                </div>
                <button
                  type="button"
                  onClick={addEvolutionRequirement}
                  className="px-4 py-2 bg-anime-accent/20 hover:bg-anime-accent/30 border border-anime-accent/30 hover:border-anime-accent/50 text-anime-accent rounded-xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
                >
                  <Icons.Plus className="w-4 h-4" />
                  Add Requirement
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.evolutionRequirements.map((requirement, index) => (
                  <EvolutionRequirement
                    key={index}
                    requirement={requirement}
                    index={index}
                    onUpdate={updateEvolutionRequirement}
                    onRemove={removeEvolutionRequirement}
                  />
                ))}
                
                {formData.evolutionRequirements.length === 0 && (
                  <div className="text-center py-12 text-slate-400 bg-slate-700/20 rounded-xl border border-slate-600/30 border-dashed">
                    <div className="w-12 h-12 mx-auto mb-3 bg-slate-600/30 rounded-xl flex items-center justify-center">
                      <Icons.Star className="w-6 h-6 text-slate-500" />
                    </div>
                    <p className="text-sm">No evolution requirements set</p>
                    <p className="text-xs text-slate-500 mt-1">Click "Add Requirement" to define evolution materials</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-center gap-6 pt-8">
            <button
              type="submit"
              className="relative overflow-hidden px-12 py-4 bg-gradient-to-r from-anime-primary to-anime-secondary hover:from-anime-primary/90 hover:to-anime-secondary/90 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-xl hover:shadow-anime-primary/25 group min-w-[200px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Icons.Save className="w-5 h-5 relative z-10" />
              <span className="relative z-10">
                {unit ? 'Update Unit' : 'Create Unit'}
              </span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-12 py-4 bg-slate-700/50 hover:bg-slate-600/60 border border-slate-600/50 hover:border-slate-500/60 text-slate-300 hover:text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-[1.02] min-w-[150px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Admin Panel Component
const AdminPanel = () => {
  const { 
    units, 
    loading, 
    addUnit, 
    updateUnit, 
    deleteUnit, 
    searchUnits,
    clearAllUnits,
    importUnits,
    totalUnits,
    baseUnits,
    evolutionUnits,
    vanguardUnits
  } = useUnits();
  
  const [showUnitForm, setShowUnitForm] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUnits = searchUnits(searchTerm);

  const handleAddUnit = () => {
    setEditingUnit(null);
    setShowUnitForm(true);
  };

  const handleEditUnit = (unit) => {
    setEditingUnit(unit);
    setShowUnitForm(true);
  };

  const handleDeleteUnit = (unitId) => {
    if (window.confirm('Are you sure you want to delete this unit?')) {
      deleteUnit(unitId);
    }
  };

  const handleSaveUnit = (unitData) => {
    if (editingUnit) {
      // Update existing unit
      updateUnit(editingUnit.id, unitData);
    } else {
      // Add new unit
      addUnit(unitData);
    }
    setShowUnitForm(false);
    setEditingUnit(null);
  };

  const handleExportUnits = () => {
    const dataStr = JSON.stringify(units, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'anime-vanguards-units.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportUnits = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedUnits = JSON.parse(e.target.result);
          if (Array.isArray(importedUnits)) {
            const confirmed = window.confirm(
              `Import ${importedUnits.length} units? This will add to existing units.`
            );
            if (confirmed) {
              importUnits(importedUnits);
              alert('Units imported successfully!');
            }
          } else {
            alert('Invalid file format. Expected JSON array of units.');
          }
        } catch (error) {
          alert('Error parsing file. Please check the JSON format.');
        }
      };
      reader.readAsText(file);
    }
    // Reset file input
    event.target.value = '';
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Vanguard': return 'text-pink-400 bg-pink-500/10 border-pink-500/30';
      case 'Secret': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'Mythical': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'Legendary': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'Epic': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'Rare': return 'text-green-400 bg-green-500/10 border-green-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const getUnitTypeColor = (type) => {
    switch (type) {
      case 'base': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'evolution': return 'text-anime-accent bg-anime-accent/10 border-anime-accent/30';
      case 'non-evolvable': return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-anime-primary/20 rounded-2xl flex items-center justify-center animate-pulse">
            <Icons.Settings className="w-8 h-8 text-anime-primary" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Loading Units...</h3>
          <p className="text-slate-400">Setting up the admin panel</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Admin Panel</h1>
              <p className="text-slate-400 mt-2">Manage units, stats, and game content</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExportUnits}
                className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                disabled={units.length === 0}
              >
                <Icons.Save className="w-4 h-4" />
                Export
              </button>
              <label className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
                <Icons.Upload className="w-4 h-4" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportUnits}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleAddUnit}
                className="px-6 py-3 bg-anime-primary hover:bg-anime-primary/80 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Icons.Plus className="w-5 h-5" />
                Add Unit
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search units..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-slate-700/60 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-anime-primary/60"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Units Table */}
        <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/60 border-b border-slate-700/60">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Unit</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Stats</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Rarity</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Tier</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {filteredUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={unit.image} 
                          alt={unit.name} 
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/48/48';
                          }}
                        />
                        <div>
                          <div className="font-medium text-white">{unit.name}</div>
                          <div className="text-sm text-slate-400">{unit.element}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getUnitTypeColor(unit.unitType)}`}>
                        {unit.unitType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-300">
                        <div>DMG: {unit.baseStats.damage}</div>
                        <div>RNG: {unit.baseStats.range}m</div>
                        <div>SPA: {unit.baseStats.sps}/s</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getRarityColor(unit.rarity)}`}>
                        {unit.rarity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300">{unit.tier}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditUnit(unit)}
                          className="w-8 h-8 bg-anime-primary/20 hover:bg-anime-primary/30 rounded text-anime-primary transition-colors flex items-center justify-center"
                        >
                          <Icons.Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUnit(unit.id)}
                          className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded text-red-400 transition-colors flex items-center justify-center"
                        >
                          <Icons.Delete className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUnits.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-800/40 rounded-2xl flex items-center justify-center">
                <Icons.Settings className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-300 mb-2">No units found</h3>
              <p className="text-slate-400">
                {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first unit'}
              </p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
            <div className="text-2xl font-bold text-anime-primary">{totalUnits}</div>
            <div className="text-sm text-slate-400">Total Units</div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
            <div className="text-2xl font-bold text-cyan-400">{baseUnits}</div>
            <div className="text-sm text-slate-400">Base Forms</div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
            <div className="text-2xl font-bold text-anime-accent">{evolutionUnits}</div>
            <div className="text-sm text-slate-400">Evolutions</div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
            <div className="text-2xl font-bold text-pink-400">{vanguardUnits}</div>
            <div className="text-sm text-slate-400">Vanguard Units</div>
          </div>
        </div>
      </div>

      {/* Unit Form Modal */}
      {showUnitForm && (
        <UnitForm
          unit={editingUnit}
          onSave={handleSaveUnit}
          onCancel={() => {
            setShowUnitForm(false);
            setEditingUnit(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminPanel; 