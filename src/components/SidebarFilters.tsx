import React, { useState } from 'react';
import { FilterState, Condition, Transmission, FuelType } from '../types';
import { ShieldCheck, Building2, User, RotateCcw, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { BRANDS, LOCATIONS_MEXICO } from '../data/mockVehicles';

interface SidebarFiltersProps {
  filters: FilterState;
  onUpdateFilters: (updater: (prev: FilterState) => FilterState) => void;
  totalResultsCount: number;
  onResetFilters: () => void;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  filters,
  onUpdateFilters,
  totalResultsCount,
  onResetFilters,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleBrand = (brand: string) => {
    onUpdateFilters((prev) => {
      const exists = prev.brands.includes(brand);
      const newBrands = exists
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: newBrands };
    });
  };

  const toggleLocation = (loc: string) => {
    onUpdateFilters((prev) => {
      const exists = prev.locations.includes(loc);
      const newLocations = exists
        ? prev.locations.filter((l) => l !== loc)
        : [...prev.locations, loc];
      return { ...prev, locations: newLocations };
    });
  };

  const toggleTransmission = (trans: Transmission) => {
    onUpdateFilters((prev) => {
      const exists = prev.transmissions.includes(trans);
      const newTrans = exists
        ? prev.transmissions.filter((t) => t !== trans)
        : [...prev.transmissions, trans];
      return { ...prev, transmissions: newTrans };
    });
  };

  const toggleFuel = (fuel: FuelType) => {
    onUpdateFilters((prev) => {
      const exists = prev.fuels.includes(fuel);
      const newFuels = exists
        ? prev.fuels.filter((f) => f !== fuel)
        : [...prev.fuels, fuel];
      return { ...prev, fuels: newFuels };
    });
  };

  // Calculate active filter count
  const activeFiltersCount =
    (filters.condition !== 'Todas' ? 1 : 0) +
    filters.brands.length +
    filters.locations.length +
    filters.transmissions.length +
    filters.fuels.length +
    (filters.onlyOfficialStore ? 1 : 0) +
    (filters.onlyVerified ? 1 : 0) +
    (filters.onlyDirectDeal ? 1 : 0) +
    (filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0);

  return (
    <aside className="w-full lg:w-60 flex-shrink-0 bg-white p-3.5 sm:p-4 rounded shadow-xs border border-zinc-200 text-zinc-800">
      
      {/* Mobile Accordion Toggle Header */}
      <div className="flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex-1 flex items-center justify-between py-1 text-left font-bold text-sm text-zinc-900"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Filtros de Búsqueda</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          {isMobileOpen ? (
            <ChevronUp className="w-4 h-4 text-zinc-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          )}
        </button>

        {activeFiltersCount > 0 && (
          <button
            onClick={onResetFilters}
            className="ml-2 text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between pb-3 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <h2 className="font-bold text-sm uppercase tracking-tight text-zinc-900">Filtros</h2>
          {activeFiltersCount > 0 && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Limpiar</span>
        </button>
      </div>

      {/* Collapsible Content Container */}
      <div className={`${isMobileOpen ? 'block' : 'hidden'} lg:block space-y-6 pt-3 lg:pt-4`}>
        
        {/* Mercado Libre Quick Toggle Switches */}
        <div className="space-y-3 pb-4 border-b border-zinc-200">
          
          {/* Official Store 0km */}
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-800">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Tienda oficial 0 km</span>
            </div>
            <input
              type="checkbox"
              checked={filters.onlyOfficialStore}
              onChange={(e) =>
                onUpdateFilters((prev) => ({ ...prev, onlyOfficialStore: e.target.checked }))
              }
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
          </label>

          {/* Verified Vehicles */}
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Vehículos verificados</span>
            </div>
            <input
              type="checkbox"
              checked={filters.onlyVerified}
              onChange={(e) =>
                onUpdateFilters((prev) => ({ ...prev, onlyVerified: e.target.checked }))
              }
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </label>

          {/* Direct Deal */}
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-800">
              <User className="w-4 h-4 text-purple-600" />
              <span>Trato directo (Particular)</span>
            </div>
            <input
              type="checkbox"
              checked={filters.onlyDirectDeal}
              onChange={(e) =>
                onUpdateFilters((prev) => ({ ...prev, onlyDirectDeal: e.target.checked }))
              }
              className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
            />
          </label>
        </div>

        {/* Condición (0km / Seminuevo / Usado) */}
        <div className="space-y-2 pb-4 border-b border-zinc-200">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
            Condición
          </h3>
          <div className="space-y-1 text-xs text-zinc-700">
            {(['Todas', '0km', 'Seminuevo', 'Usado'] as (Condition | 'Todas')[]).map((cond) => (
              <button
                key={cond}
                onClick={() => onUpdateFilters((prev) => ({ ...prev, condition: cond }))}
                className={`w-full text-left py-1.5 px-2 rounded transition flex items-center justify-between ${
                  filters.condition === cond
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'hover:bg-zinc-100 text-zinc-700'
                }`}
              >
                <span>{cond === 'Todas' ? 'Todas las condiciones' : cond}</span>
                {filters.condition === cond && <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Marca Filter */}
        <div className="space-y-2 pb-4 border-b border-zinc-200">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
            Marca
          </h3>
          <div className="max-h-48 overflow-y-auto space-y-1 text-xs text-zinc-700 pr-1 no-scrollbar">
            {BRANDS.map((brand) => {
              const isChecked = filters.brands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center justify-between py-1 px-1 rounded hover:bg-zinc-100 cursor-pointer text-zinc-700"
                >
                  <span>{brand}</span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleBrand(brand)}
                    className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Price Range Filter (Light gray form inputs) */}
        <div className="space-y-2 pb-4 border-b border-zinc-200">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
            Precio ($ MXN)
          </h3>
          <div className="flex items-center gap-2 text-xs">
            <input
              type="number"
              placeholder="Mínimo"
              value={filters.minPrice ?? ''}
              onChange={(e) =>
                onUpdateFilters((prev) => ({
                  ...prev,
                  minPrice: e.target.value ? Number(e.target.value) : null,
                }))
              }
              className="w-full p-2 border border-zinc-300 rounded bg-zinc-100 text-zinc-900 placeholder-zinc-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            />
            <span className="text-zinc-400 font-bold">-</span>
            <input
              type="number"
              placeholder="Máximo"
              value={filters.maxPrice ?? ''}
              onChange={(e) =>
                onUpdateFilters((prev) => ({
                  ...prev,
                  maxPrice: e.target.value ? Number(e.target.value) : null,
                }))
              }
              className="w-full p-2 border border-zinc-300 rounded bg-zinc-100 text-zinc-900 placeholder-zinc-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            />
          </div>
          {/* Quick price presets */}
          <div className="flex flex-wrap gap-1 mt-2">
            <button
              onClick={() => onUpdateFilters((prev) => ({ ...prev, minPrice: null, maxPrice: 400000 }))}
              className="text-[10px] px-2 py-1 bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 rounded text-zinc-700 font-medium"
            >
              Hasta $400k
            </button>
            <button
              onClick={() => onUpdateFilters((prev) => ({ ...prev, minPrice: 400000, maxPrice: 800000 }))}
              className="text-[10px] px-2 py-1 bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 rounded text-zinc-700 font-medium"
            >
              $400k - $800k
            </button>
            <button
              onClick={() => onUpdateFilters((prev) => ({ ...prev, minPrice: 800000, maxPrice: null }))}
              className="text-[10px] px-2 py-1 bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 rounded text-zinc-700 font-medium"
            >
              +$800k
            </button>
          </div>
        </div>

        {/* Ubicación Filter */}
        <div className="space-y-2 pb-4 border-b border-zinc-200">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
            Ubicación
          </h3>
          <div className="space-y-1 text-xs text-zinc-700">
            {LOCATIONS_MEXICO.map((loc) => {
              const isChecked = filters.locations.includes(loc);
              return (
                <label
                  key={loc}
                  className="flex items-center justify-between py-1 px-1 rounded hover:bg-zinc-100 cursor-pointer text-zinc-700"
                >
                  <span>{loc}</span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleLocation(loc)}
                    className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Transmission */}
        <div className="space-y-2 pb-4 border-b border-zinc-200">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
            Transmisión
          </h3>
          <div className="space-y-1 text-xs text-zinc-700">
            {(['Automática', 'Manual', 'Dual-Clutch', 'CVT'] as Transmission[]).map((trans) => {
              const isChecked = filters.transmissions.includes(trans);
              return (
                <label
                  key={trans}
                  className="flex items-center justify-between py-1 px-1 rounded hover:bg-zinc-100 cursor-pointer text-zinc-700"
                >
                  <span>{trans}</span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleTransmission(trans)}
                    className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Fuel Type */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
            Combustible
          </h3>
          <div className="space-y-1 text-xs text-zinc-700">
            {(['Gasolina', 'Híbrido', 'Eléctrico', 'Diésel'] as FuelType[]).map((fuel) => {
              const isChecked = filters.fuels.includes(fuel);
              return (
                <label
                  key={fuel}
                  className="flex items-center justify-between py-1 px-1 rounded hover:bg-zinc-100 cursor-pointer text-zinc-700"
                >
                  <span>{fuel}</span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFuel(fuel)}
                    className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500"
                  />
                </label>
              );
            })}
          </div>
        </div>

      </div>

    </aside>
  );
};
