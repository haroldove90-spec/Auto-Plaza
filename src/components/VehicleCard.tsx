import React, { useState } from 'react';
import { Vehicle } from '../types';
import {
  Heart,
  GitCompare,
  ShieldCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MapPin,
  Calendar,
  Gauge,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  isFavorite: boolean;
  isCompared: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenWhatsApp: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  isFavorite,
  isCompared,
  onToggleFavorite,
  onToggleCompare,
  onSelectVehicle,
  onOpenWhatsApp,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  return (
    <div
      onClick={() => onSelectVehicle(vehicle)}
      className={`group bg-zinc-100 rounded overflow-hidden border ${
        vehicle.condition === '0km' ? 'border-blue-300 ring-1 ring-blue-200' : 'border-zinc-200'
      } shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300 flex flex-col md:flex-row cursor-pointer relative`}
    >
      {/* Left / Top Image Container with Gallery Carousel */}
      <div className="relative w-full md:w-72 h-52 md:h-auto flex-shrink-0 bg-zinc-200 overflow-hidden">
        <img
          src={vehicle.images[activeImageIndex] || vehicle.images[0]}
          alt={vehicle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Carousel Image Controls */}
        {vehicle.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
              title="Imagen anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
              title="Siguiente imagen"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
              {vehicle.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Top Floating Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {vehicle.condition === '0km' && (
            <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
              OFERTA 0 KM
            </span>
          )}
          {vehicle.isVerified && (
            <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>VERIFICADO</span>
            </span>
          )}
          {vehicle.seller.isOfficialStore && (
            <span className="bg-zinc-900/90 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              <span>AGENCIA</span>
            </span>
          )}
        </div>

        {/* Favorite Heart Trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(vehicle.id);
          }}
          className="absolute top-2 right-2 p-1.5 rounded bg-white/90 hover:scale-110 transition-transform shadow z-10 text-zinc-700"
          title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'hover:text-red-500'
            }`}
          />
        </button>
      </div>

      {/* Right Details Section */}
      <div className="p-3.5 flex-1 flex flex-col justify-between bg-zinc-100">
        <div>
          {/* Price */}
          <div className="text-xl font-bold text-zinc-900 tracking-tight mb-0.5">
            ${vehicle.price.toLocaleString('es-MX')} <span className="text-xs font-semibold text-zinc-500">MXN</span>
          </div>

          {/* Title */}
          <h3 className="text-sm text-zinc-800 font-semibold group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
            {vehicle.title}
          </h3>

          {/* Specs Subtitle in Sleek Interface uppercase style */}
          <div className="text-[10px] uppercase text-zinc-500 font-bold tracking-tight flex items-center gap-2 flex-wrap">
            <span>{vehicle.mileage === 0 ? '0 km' : `${vehicle.mileage.toLocaleString()} km`}</span>
            <span>•</span>
            <span>{vehicle.year}</span>
            <span>•</span>
            <span>{vehicle.location.city}, {vehicle.location.state}</span>
          </div>

          {/* Highlights Chips */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {vehicle.highlights.slice(0, 3).map((hl, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded bg-white text-zinc-700 border border-zinc-200"
              >
                {hl}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Price & Actions */}
        <div className="mt-3 pt-2.5 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          
          <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Desde ${vehicle.monthlyEstimate.toLocaleString('es-MX')}/mes</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            {/* Compare Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(vehicle.id);
              }}
              className={`px-2 py-1 rounded border text-xs font-medium transition flex items-center gap-1 ${
                isCompared
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white border-zinc-300 hover:bg-zinc-200 text-zinc-700'
              }`}
              title={isCompared ? 'Quitar de comparación' : 'Comparar vehículo'}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{isCompared ? 'Comparando' : 'Comparar'}</span>
            </button>

            {/* WhatsApp Contact */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenWhatsApp(vehicle);
              }}
              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1 text-xs font-semibold"
              title="Contactar por WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* Detail View Arrow */}
            <button
              type="button"
              onClick={() => onSelectVehicle(vehicle)}
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
            >
              <span>Ver</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
