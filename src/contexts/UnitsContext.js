import React, { createContext, useContext, useState, useEffect } from 'react';

const UnitsContext = createContext();

export const useUnits = () => {
  const context = useContext(UnitsContext);
  if (!context) {
    throw new Error('useUnits must be used within a UnitsProvider');
  }
  return context;
};

export const UnitsProvider = ({ children }) => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load units from localStorage on component mount
  useEffect(() => {
    const loadUnits = () => {
      try {
        const savedUnits = localStorage.getItem('anime-vanguards-units');
        if (savedUnits) {
          const parsedUnits = JSON.parse(savedUnits);
          setUnits(parsedUnits);
        }
        // If no saved data exists, start with empty array
      } catch (error) {
        console.error('Error loading units from localStorage:', error);
        // Start with empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadUnits();
  }, []);

  // Save units to localStorage whenever units change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('anime-vanguards-units', JSON.stringify(units));
      } catch (error) {
        console.error('Error saving units to localStorage:', error);
      }
    }
  }, [units, loading]);

  // Add a new unit
  const addUnit = (unitData) => {
    const newUnit = {
      ...unitData,
      id: Math.max(...units.map(u => u.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setUnits(prev => [...prev, newUnit]);
    return newUnit;
  };

  // Update an existing unit
  const updateUnit = (unitId, unitData) => {
    const updatedUnit = {
      ...unitData,
      id: unitId,
      updatedAt: new Date().toISOString()
    };
    setUnits(prev => prev.map(unit => 
      unit.id === unitId ? updatedUnit : unit
    ));
    return updatedUnit;
  };

  // Delete a unit
  const deleteUnit = (unitId) => {
    setUnits(prev => prev.filter(unit => unit.id !== unitId));
  };

  // Get a unit by ID
  const getUnitById = (unitId) => {
    return units.find(unit => unit.id === unitId);
  };

  // Get units by type
  const getUnitsByType = (type) => {
    return units.filter(unit => unit.unitType === type);
  };

  // Get units by rarity
  const getUnitsByRarity = (rarity) => {
    return units.filter(unit => unit.rarity === rarity);
  };

  // Get units by element
  const getUnitsByElement = (element) => {
    return units.filter(unit => unit.element === element);
  };

  // Search units by name
  const searchUnits = (query) => {
    if (!query) return units;
    return units.filter(unit => 
      unit.name.toLowerCase().includes(query.toLowerCase()) ||
      unit.description.toLowerCase().includes(query.toLowerCase()) ||
      unit.element.toLowerCase().includes(query.toLowerCase()) ||
      unit.rarity.toLowerCase().includes(query.toLowerCase()) ||
      unit.tier.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Clear all units (for admin reset)
  const clearAllUnits = () => {
    setUnits([]);
  };

  // Bulk import units
  const importUnits = (unitsArray) => {
    const processedUnits = unitsArray.map((unit, index) => ({
      ...unit,
      id: Math.max(...units.map(u => u.id), 0) + index + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    setUnits(prev => [...prev, ...processedUnits]);
    return processedUnits;
  };

  const value = {
    units,
    loading,
    addUnit,
    updateUnit,
    deleteUnit,
    getUnitById,
    getUnitsByType,
    getUnitsByRarity,
    getUnitsByElement,
    searchUnits,
    clearAllUnits,
    importUnits,
    // Statistics
    totalUnits: units.length,
    baseUnits: units.filter(u => u.unitType === 'base').length,
    evolutionUnits: units.filter(u => u.unitType === 'evolution').length,
    nonEvolvableUnits: units.filter(u => u.unitType === 'non-evolvable').length,
    vanguardUnits: units.filter(u => u.rarity === 'Vanguard').length,
    secretUnits: units.filter(u => u.rarity === 'Secret').length,
    mythicalUnits: units.filter(u => u.rarity === 'Mythical').length
  };

  return (
    <UnitsContext.Provider value={value}>
      {children}
    </UnitsContext.Provider>
  );
}; 