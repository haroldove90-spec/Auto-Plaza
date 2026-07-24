import React from 'react';
import { Vehicle } from '../types';
import { X, GitCompare, Check, Trash2, ArrowRight } from 'lucide-react';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  onRemoveFromCompare: (id: string) => void;
  onClearAll: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  isOpen,
  onClose,
  vehicles,
  onRemoveFromCompare,
  onClearAll,
  onSelectVehicle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-gray-100 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-base text-gray-900 dark:text-white">
              Comparador de Vehículos ({vehicles.length}/3)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {vehicles.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold mr-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vaciar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-gray-800 dark:text-gray-200">
          {vehicles.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <GitCompare className="w-12 h-12 text-gray-300 dark:text-slate-700 mx-auto" />
              <h3 className="font-bold text-base text-gray-800 dark:text-gray-200">
                No has agregado vehículos para comparar
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Haz clic en el botón "Comparar" en las tarjetas de los autos para ver sus especificaciones lado a lado.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 flex flex-col justify-between space-y-4 relative"
                >
                  <button
                    onClick={() => onRemoveFromCompare(v.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-100 hover:bg-red-200 text-red-600 text-xs transition"
                    title="Quitar"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-2">
                    <img
                      src={v.images[0]}
                      alt={v.title}
                      className="w-full h-36 object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2">
                      {v.title}
                    </h4>
                    <div className="text-xl font-black text-blue-600 dark:text-blue-400">
                      ${v.price.toLocaleString('es-MX')} MXN
                    </div>
                  </div>

                  {/* Specs comparison table */}
                  <div className="space-y-2 text-xs border-t pt-3 border-gray-200 dark:border-slate-700">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Año:</span>
                      <span className="font-bold">{v.year}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Kilometraje:</span>
                      <span className="font-bold">{v.mileage === 0 ? '0 km' : `${v.mileage.toLocaleString()} km`}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Motor:</span>
                      <span className="font-bold truncate max-w-[140px]">{v.techSpecs.engine}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Potencia:</span>
                      <span className="font-bold">{v.techSpecs.horsepower} HP</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Combustible:</span>
                      <span className="font-bold">{v.fuelType}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Transmisión:</span>
                      <span className="font-bold">{v.transmission}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Rendimiento:</span>
                      <span className="font-bold">{v.techSpecs.fuelEconomy}</span>
                    </div>

                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Mensualidad:</span>
                      <span>${v.monthlyEstimate.toLocaleString('es-MX')}/m</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectVehicle(v);
                      onClose();
                    }}
                    className="w-full py-2 bg-[#3483FA] hover:bg-blue-600 text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1"
                  >
                    <span>Ver Ficha Completa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
