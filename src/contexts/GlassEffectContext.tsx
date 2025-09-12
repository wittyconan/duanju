import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type GlassEffectType = 'blur' | 'liquid';

interface GlassEffectContextType {
  effectType: GlassEffectType;
  setEffectType: (type: GlassEffectType) => void;
  toggleEffect: () => void;
}

const GlassEffectContext = createContext<GlassEffectContextType | undefined>(undefined);

export function GlassEffectProvider({ children }: { children: ReactNode }) {
  const [effectType, setEffectType] = useState<GlassEffectType>('blur');

  useEffect(() => {
    const saved = localStorage.getItem('glass-effect-type');
    if (saved === 'blur' || saved === 'liquid') {
      setEffectType(saved);
    }
  }, []);

  const handleSetEffectType = (type: GlassEffectType) => {
    setEffectType(type);
    localStorage.setItem('glass-effect-type', type);
  };

  const toggleEffect = () => {
    const newType = effectType === 'blur' ? 'liquid' : 'blur';
    handleSetEffectType(newType);
  };

  return (
    <GlassEffectContext.Provider value={{
      effectType,
      setEffectType: handleSetEffectType,
      toggleEffect
    }}>
      {children}
    </GlassEffectContext.Provider>
  );
}

export function useGlassEffect() {
  const context = useContext(GlassEffectContext);
  if (context === undefined) {
    throw new Error('useGlassEffect must be used within a GlassEffectProvider');
  }
  return context;
}

export function getGlassClass(baseClass: string, effectType: GlassEffectType): string {
  switch (effectType) {
    case 'liquid':
      if (baseClass.includes('backdrop-blur-sm')) {
        return baseClass.replace('backdrop-blur-sm', 'liquid-glass');
      }
      if (baseClass.includes('backdrop-blur-md')) {
        return baseClass.replace('backdrop-blur-md', 'liquid-glass');
      }
      if (baseClass.includes('backdrop-blur')) {
        return baseClass.replace(/backdrop-blur[-\w]*/, 'liquid-glass');
      }
      return baseClass + ' liquid-glass';
    case 'blur':
    default:
      return baseClass;
  }
}

export function getGlassButtonClass(baseClass: string, effectType: GlassEffectType): string {
  if (effectType === 'liquid') {
    return baseClass.replace(/bg-white\/\d+|backdrop-blur[-\w]*/, '').trim() + ' liquid-glass-button';
  }
  return baseClass;
}

export function getGlassOverlayClass(baseClass: string, effectType: GlassEffectType): string {
  if (effectType === 'liquid') {
    return baseClass.replace(/bg-white\/\d+|backdrop-blur[-\w]*/, '').trim() + ' liquid-glass-overlay';
  }
  return baseClass;
}