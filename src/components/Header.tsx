import React, { useState } from 'react';
import { Logo } from './Logo';
import {
  Search,
  MapPin,
  Heart,
  GitCompare,
  PlusCircle,
  ChevronDown,
  User,
  ShieldCheck,
  Calculator,
  Car,
  Bell,
  Sparkles,
  Building2,
  Tag
} from 'lucide-react';
import { BodyStyle, FilterState } from '../types';

interface HeaderProps {
  filters: FilterState;
  onUpdateFilters: (updater: (prev: FilterState) => FilterState) => void;
  favoritesCount: number;
  compareCount: number;
  onOpenFavoritesModal: () => void;
  onOpenCompareModal: () => void;
  onOpenPublishModal: () => void;
  onOpenFinancingModal: () => void;
  onOpenLocationModal: () => void;
  selectedLocation: string;
  themeMode: 'mercado_libre_yellow' | 'autoplaza_dark_luxury' | 'autoplaza_clean_white';
}

export const Header: React.FC<HeaderProps> = ({
  filters,
  onUpdateFilters,
  favoritesCount,
  compareCount,
  onOpenFavoritesModal,
  onOpenCompareModal,
  onOpenPublishModal,
  onOpenFinancingModal,
  onOpenLocationModal,
  selectedLocation,
  themeMode,
}) => {
  const [searchVal, setSearchVal] = useState(filters.searchQuery);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFilters((prev) => ({ ...prev, searchQuery: searchVal }));
  };

  const isYellowTheme = themeMode === 'mercado_libre_yellow';

  const bodyStylesList: BodyStyle[] = [
    'SUV',
    'Sedán',
    'Hatchback',
    'Pick-Up',
    'Van',
    'Deportivo',
    'Eléctrico/Híbrido'
  ];

  return (
    <header className={`w-full transition-colors border-b ${isYellowTheme ? 'bg-[#FFF159] text-zinc-900 border-yellow-300 shadow-sm' : 'bg-zinc-900 text-white border-zinc-800'}`}>
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-3 pb-2.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          
          {/* Logo & Location */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <button
              onClick={() => onUpdateFilters((prev) => ({ ...prev, searchQuery: '', category: 'Todos', brands: [], locations: [] }))}
              className="text-left focus:outline-none"
            >
              <Logo variant={isYellowTheme ? 'header_yellow' : 'dark'} />
            </button>

            {/* Location Badge */}
            <button
              onClick={onOpenLocationModal}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                isYellowTheme
                  ? 'hover:bg-yellow-400/80 text-zinc-800 bg-yellow-300/40 border border-yellow-400/50'
                  : 'hover:bg-zinc-800 text-zinc-200 bg-zinc-800/60 border border-zinc-700/50'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] text-zinc-600 dark:text-zinc-400">Ubicación:</span>
                <span className="font-bold text-xs truncate max-w-[120px]">{selectedLocation || 'México'}</span>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="w-full md:flex-1 max-w-2xl relative">
            <div className="flex items-center bg-white rounded-sm shadow-sm overflow-hidden border border-zinc-300 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="text"
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  onUpdateFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
                }}
                placeholder="Busca marcas, modelos y más (ej. Honda Civic, Audi Q5)..."
                className="w-full py-2 px-4 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none"
              />
              {searchVal && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchVal('');
                    onUpdateFilters((prev) => ({ ...prev, searchQuery: '' }));
                  }}
                  className="text-zinc-400 hover:text-zinc-600 px-2 text-xs font-semibold"
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 px-4 py-2 border-l border-zinc-200 transition flex items-center justify-center"
                title="Buscar"
              >
                <Search className="w-4 h-4 text-zinc-600" />
              </button>
            </div>
          </form>

          {/* Promo Tagline / Quick Callouts */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-sm bg-zinc-900/5 dark:bg-white/10 text-zinc-900 dark:text-zinc-100 border border-zinc-900/10 dark:border-white/10">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="tracking-tight">Revisión 240 Pts • Garantía Incluida</span>
          </div>
        </div>

        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 pt-2 border-t border-zinc-900/10 dark:border-zinc-800 text-sm">
          
          {/* Left Nav links */}
          <nav className="flex items-center gap-1 sm:gap-5 overflow-x-auto py-0.5 no-scrollbar text-sm font-medium">
            
            {/* Categorías Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded hover:text-blue-600 transition ${
                  filters.category !== 'Todos' ? 'text-blue-600 font-bold' : ''
                }`}
              >
                <span>Categorías</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white text-zinc-800 rounded shadow-lg border border-zinc-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      onUpdateFilters((prev) => ({ ...prev, category: 'Todos' }));
                      setIsCategoryMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-zinc-50 text-xs font-semibold ${
                      filters.category === 'Todos' ? 'text-blue-600 bg-blue-50' : 'text-zinc-700'
                    }`}
                  >
                    Todos los tipos
                  </button>
                  <hr className="my-1 border-zinc-100" />
                  {bodyStylesList.map((style) => (
                    <button
                      key={style}
                      onClick={() => {
                        onUpdateFilters((prev) => ({ ...prev, category: style }));
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-1.5 hover:bg-blue-50 text-xs transition flex items-center justify-between ${
                        filters.category === style ? 'text-blue-600 font-bold bg-blue-50/80' : 'text-zinc-700'
                      }`}
                    >
                      <span>{style}</span>
                      {filters.category === style && <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded">Activo</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onUpdateFilters((prev) => ({ ...prev, condition: '0km', category: 'Todos' }))}
              className={`px-2 py-1 rounded hover:text-blue-600 transition flex items-center gap-1 ${
                filters.condition === '0km' ? 'font-bold text-blue-600' : ''
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Autos 0 km</span>
            </button>

            <button
              onClick={() => onUpdateFilters((prev) => ({ ...prev, onlyVerified: true }))}
              className={`px-2 py-1 rounded hover:text-blue-600 transition flex items-center gap-1 ${
                filters.onlyVerified ? 'font-bold text-emerald-600' : ''
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verificados</span>
            </button>

            <button
              onClick={() => onUpdateFilters((prev) => ({ ...prev, onlyOfficialStore: true }))}
              className="px-2 py-1 rounded hover:text-blue-600 transition flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Agencias Oficiales</span>
            </button>

            <button
              onClick={onOpenFinancingModal}
              className="px-2 py-1 rounded hover:text-blue-600 transition flex items-center gap-1 text-blue-700 dark:text-blue-400 font-semibold"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Simulador Crédito</span>
            </button>
          </nav>

          {/* Right User & Utility Links */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-medium ml-auto">
            
            {/* Publish listing button */}
            <button
              onClick={onOpenPublishModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded shadow-sm transition flex items-center gap-1.5 text-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Vender mi Auto</span>
            </button>

            {/* Favorites Counter */}
            <button
              onClick={onOpenFavoritesModal}
              className="relative p-1.5 rounded hover:bg-black/5 dark:hover:bg-zinc-800 transition flex items-center gap-1"
              title="Mis Favoritos"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-red-500 text-red-500' : 'text-zinc-700 dark:text-zinc-200'}`} />
              <span className="hidden sm:inline">Favoritos</span>
              {favoritesCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Compare Vehicles Counter */}
            <button
              onClick={onOpenCompareModal}
              className="relative p-1.5 rounded hover:bg-black/5 dark:hover:bg-zinc-800 transition flex items-center gap-1"
              title="Comparar Vehículos"
            >
              <GitCompare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Comparar</span>
              {compareCount > 0 && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {compareCount}
                </span>
              )}
            </button>

            {/* User Profile Pill matching Sleek Interface design HTML */}
            <div className="flex items-center gap-2 border-l border-zinc-900/10 dark:border-zinc-800 pl-2">
              <div className="flex items-center gap-2 bg-white/50 dark:bg-zinc-800/80 px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-zinc-800 dark:bg-zinc-300 flex items-center justify-center text-white dark:text-zinc-900 font-bold text-[10px]">
                  J
                </div>
                <span className="hidden md:inline font-medium text-xs text-zinc-900 dark:text-zinc-100">Juan Pérez</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
