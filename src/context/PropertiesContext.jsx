import { createContext, useContext, useState, useEffect } from 'react';
import initialProperties from '../data/properties';

const PropertiesContext = createContext();

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState([]);

  // Cargar desde localStorage o datos por defecto
  useEffect(() => {
    const stored = localStorage.getItem('properties');
    if (stored) {
      setProperties(JSON.parse(stored));
    } else {
      setProperties(initialProperties);
      localStorage.setItem('properties', JSON.stringify(initialProperties));
    }
  }, []);

  // Guardar automáticamente cada vez que cambien
  useEffect(() => {
    if (properties.length > 0) {
      localStorage.setItem('properties', JSON.stringify(properties));
    }
  }, [properties]);

  const addProperty = (property) => {
    const newId = Date.now().toString();
    setProperties(prev => [...prev, { ...property, id: newId }]);
  };

  const updateProperty = (id, updated) => {
    setProperties(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const getProperty = (id) => properties.find(p => p.id === id);

  return (
    <PropertiesContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty, getProperty }}>
      {children}
    </PropertiesContext.Provider>
  );
}

export const useProperties = () => useContext(PropertiesContext);