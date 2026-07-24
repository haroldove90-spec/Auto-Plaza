import React from 'react';
import { BodyStyle, FilterState } from '../types';
import { Car, Truck, ShieldAlert, Zap, Layers } from 'lucide-react';

interface SubHeaderCategoryBarProps {
  currentCategory: BodyStyle | 'Todos';
  onSelectCategory: (category: BodyStyle | 'Todos') => void;
  vehiclesCount: number;
}

export const SubHeaderCategoryBar: React.FC<SubHeaderCategoryBarProps> = ({
  currentCategory,
  onSelectCategory,
  vehiclesCount,
}) => {
  const categoryItems: { style: BodyStyle; label: string; icon: React.ReactNode; imgUrl?: string }[] = [
    {
      style: 'SUV',
      label: 'SUV',
      imgUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80',
      icon: <Car className="w-5 h-5" />
    },
    {
      style: 'Sedán',
      label: 'Sedán',
      imgUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=300&q=80',
      icon: <Car className="w-5 h-5" />
    },
    {
      style: 'Hatchback',
      label: 'Hatchback',
      imgUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=300&q=80',
      icon: <Car className="w-5 h-5" />
    },
    {
      style: 'Pick-Up',
      label: 'Pick-Up',
      imgUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80',
      icon: <Truck className="w-5 h-5" />
    },
    {
      style: 'Van',
      label: 'Van',
      imgUrl: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=300&q=80',
      icon: <Truck className="w-5 h-5" />
    },
    {
      style: 'Deportivo',
      label: 'Deportivo',
      imgUrl: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=300&q=80',
      icon: <Car className="w-5 h-5" />
    },
    {
      style: 'Eléctrico/Híbrido',
      label: 'Eléctrico / Híbrido',
      imgUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80',
      icon: <Zap className="w-5 h-5" />
    }
  ];

  return (
    <div className="bg-gray-100 dark:bg-slate-900 py-6 border-b border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Title and Result Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>Autos, Camionetas y Suvs</span>
              {currentCategory !== 'Todos' && (
                <span className="text-sm bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-semibold">
                  {currentCategory}
                </span>
              )}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {vehiclesCount.toLocaleString()} vehículos seminuevos y 0 km disponibles en México
            </p>
          </div>

          {currentCategory !== 'Todos' && (
            <button
              onClick={() => onSelectCategory('Todos')}
              className="text-xs text-[#3483FA] hover:underline font-semibold self-start sm:self-auto"
            >
              Ver todas las categorías
            </button>
          )}
        </div>

        {/* Circular Body Category Filters (Mercado Libre signature layout) */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 pt-1 no-scrollbar justify-start md:justify-center">
          
          {/* All Button Bubble */}
          <button
            onClick={() => onSelectCategory('Todos')}
            className={`flex flex-col items-center gap-2 group focus:outline-none flex-shrink-0`}
          >
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 border-2 shadow-sm ${
                currentCategory === 'Todos'
                  ? 'border-[#3483FA] bg-blue-50 dark:bg-blue-950/60 ring-2 ring-blue-400/40 scale-105'
                  : 'border-white dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-gray-300'
              }`}
            >
              <Layers className={`w-8 h-8 ${currentCategory === 'Todos' ? 'text-[#3483FA]' : 'text-gray-500 dark:text-gray-400'}`} />
            </div>
            <span className={`text-xs font-semibold ${currentCategory === 'Todos' ? 'text-[#3483FA]' : 'text-gray-700 dark:text-gray-300'}`}>
              Todos
            </span>
          </button>

          {categoryItems.map((item) => {
            const isSelected = currentCategory === item.style;
            return (
              <button
                key={item.style}
                onClick={() => onSelectCategory(isSelected ? 'Todos' : item.style)}
                className="flex flex-col items-center gap-2 group focus:outline-none flex-shrink-0"
              >
                <div
                  className={`w-20 h-20 rounded-full overflow-hidden relative border-2 transition-all duration-200 shadow-sm ${
                    isSelected
                      ? 'border-[#3483FA] ring-4 ring-blue-500/20 scale-105'
                      : 'border-white dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={item.imgUrl}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
                <span className={`text-xs font-semibold ${isSelected ? 'text-[#3483FA] font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
