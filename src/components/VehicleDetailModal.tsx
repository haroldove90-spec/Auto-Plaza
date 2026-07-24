import React, { useState } from 'react';
import { Vehicle } from '../types';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Gauge,
  MapPin,
  Building2,
  Phone,
  MessageCircle,
  Calculator,
  Award,
  ChevronRight,
  Sparkles,
  Heart,
  GitCompare,
  Share2,
  Info
} from 'lucide-react';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  isFavorite: boolean;
  isCompared: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onOpenWhatsApp: (vehicle: Vehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  isFavorite,
  isCompared,
  onToggleFavorite,
  onToggleCompare,
  onOpenWhatsApp,
}) => {
  if (!vehicle) return null;

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [termMonths, setTermMonths] = useState(48);
  const [activeTab, setActiveTab] = useState<'specs' | 'inspection' | 'financing' | 'seller'>('specs');
  const [testDriveBooked, setTestDriveBooked] = useState(false);
  const [creditRequested, setCreditRequested] = useState(false);

  // Financial calculations:
  const downPaymentAmount = Math.round((vehicle.price * downPaymentPercent) / 100);
  const loanAmount = vehicle.price - downPaymentAmount;
  const annualInterestRate = 0.129; // 12.9% per year
  const monthlyInterestRate = annualInterestRate / 12;
  const monthlyPayment = Math.round(
    (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths))) /
      (Math.pow(1 + monthlyInterestRate, termMonths) - 1)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-800 my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="px-4 py-3 bg-gray-100 dark:bg-slate-800/80 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
            <span className="text-[#3483FA] font-bold">Autoplaza</span>
            <span>/</span>
            <span>{vehicle.brand}</span>
            <span>/</span>
            <span className="truncate max-w-[150px]">{vehicle.model}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(vehicle.id)}
              className={`p-2 rounded-lg border transition ${
                isFavorite
                  ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/50'
                  : 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 hover:bg-gray-50'
              }`}
              title="Favorito"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>

            <button
              onClick={() => onToggleCompare(vehicle.id)}
              className={`p-2 rounded-lg border transition ${
                isCompared
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 hover:bg-gray-50'
              }`}
              title="Comparar"
            >
              <GitCompare className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 transition"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-gray-800 dark:text-gray-200">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {/* Main Image Display */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-900 border border-gray-200 dark:border-slate-800 shadow-md">
                <img
                  src={vehicle.images[selectedImgIndex]}
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {vehicle.isVerified && (
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Inspeccionado en 240 Puntos</span>
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition ${
                      selectedImgIndex === idx
                        ? 'border-[#3483FA] ring-2 ring-blue-400/40'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>

              {/* Description */}
              <div className="bg-gray-50 dark:bg-slate-800/60 p-4 rounded-xl border border-gray-200 dark:border-slate-700">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2">
                  Descripción del Vendedor
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>
            </div>

            {/* Price & Summary Column (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {vehicle.condition} • {vehicle.bodyStyle}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight mt-1">
                  {vehicle.title}
                </h1>

                {/* Specs quick row */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-300 mt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    {vehicle.year}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-blue-500" />
                    {vehicle.mileage === 0 ? '0 km' : `${vehicle.mileage.toLocaleString()} km`}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    {vehicle.location.city}
                  </span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 space-y-2">
                <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  ${vehicle.price.toLocaleString('es-MX')}{' '}
                  <span className="text-xs font-bold text-gray-500">MXN</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-blue-200 dark:border-slate-700">
                  <span className="text-gray-600 dark:text-gray-300 font-medium">Mensualidad estimada desde:</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                    ${monthlyPayment.toLocaleString('es-MX')}/mes
                  </span>
                </div>
              </div>

              {/* Seller Contact Box */}
              <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center font-bold text-blue-600 text-sm">
                    {vehicle.seller.avatarUrl ? (
                      <img src={vehicle.seller.avatarUrl} alt={vehicle.seller.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      vehicle.seller.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-gray-900 dark:text-white">{vehicle.seller.name}</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{vehicle.seller.type} • ⭐ {vehicle.seller.rating}</p>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => onOpenWhatsApp(vehicle)}
                    className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>

                  <a
                    href={`tel:${vehicle.seller.phone}`}
                    className="w-full py-2.5 px-3 rounded-lg bg-[#3483FA] hover:bg-blue-600 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Llamar</span>
                  </a>
                </div>

                {/* Test Drive Button */}
                {!testDriveBooked ? (
                  <button
                    onClick={() => setTestDriveBooked(true)}
                    className="w-full py-2 px-3 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200 font-semibold text-xs transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Agendar Prueba de Manejo</span>
                  </button>
                ) : (
                  <div className="p-2 rounded bg-emerald-50 text-emerald-700 text-xs text-center font-semibold border border-emerald-200">
                    ✓ ¡Solicitud de prueba enviada! El vendedor te contactará en breve.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Tabs Section: Technical Specs / Inspection / Financing Calculator */}
          <div className="pt-6 border-t border-gray-200 dark:border-slate-800">
            <div className="flex border-b border-gray-200 dark:border-slate-800 gap-4 overflow-x-auto">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'specs'
                    ? 'border-[#3483FA] text-[#3483FA]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>Ficha Técnica Completa</span>
              </button>

              <button
                onClick={() => setActiveTab('inspection')}
                className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'inspection'
                    ? 'border-[#3483FA] text-[#3483FA]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Certificado de Inspección</span>
              </button>

              <button
                onClick={() => setActiveTab('financing')}
                className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'financing'
                    ? 'border-[#3483FA] text-[#3483FA]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Calculator className="w-4 h-4 text-blue-600" />
                <span>Cotizador de Crédito</span>
              </button>
            </div>

            {/* Tab 1: Specs */}
            {activeTab === 'specs' && (
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-400 block font-medium">Motorización</span>
                  <span className="font-bold text-gray-900 dark:text-white">{vehicle.techSpecs.engine}</span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-400 block font-medium">Potencia (HP)</span>
                  <span className="font-bold text-gray-900 dark:text-white">{vehicle.techSpecs.horsepower} HP</span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-400 block font-medium">Torque</span>
                  <span className="font-bold text-gray-900 dark:text-white">{vehicle.techSpecs.torque}</span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-400 block font-medium">Rendimiento Estimado</span>
                  <span className="font-bold text-gray-900 dark:text-white">{vehicle.techSpecs.fuelEconomy}</span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-400 block font-medium">Tracción</span>
                  <span className="font-bold text-gray-900 dark:text-white">{vehicle.techSpecs.drivetrain}</span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-400 block font-medium">Bolsas de Aire</span>
                  <span className="font-bold text-gray-900 dark:text-white">{vehicle.techSpecs.airbags} Airbags</span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-400 block font-medium">Número de Serie (VIN)</span>
                  <span className="font-mono text-gray-800 dark:text-gray-200">{vehicle.techSpecs.vin}</span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-400 block font-medium">Color Exterior</span>
                  <span className="font-bold text-gray-900 dark:text-white">{vehicle.techSpecs.colorExterior}</span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-400 block font-medium">Color Interior</span>
                  <span className="font-bold text-gray-900 dark:text-white">{vehicle.techSpecs.colorInterior}</span>
                </div>
              </div>
            )}

            {/* Tab 2: Inspection */}
            {activeTab === 'inspection' && (
              <div className="pt-4 space-y-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-emerald-600" />
                    <div>
                      <h4 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
                        Vehículo Certificado por Autoplaza
                      </h4>
                      <p className="text-xs text-emerald-800 dark:text-emerald-300">
                        Fecha de verificación: {vehicle.inspectionDate || '2026-07-01'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-emerald-600 text-white px-3 py-1 rounded-full">
                    APROBADO
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {Object.entries(vehicle.inspection).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-2 p-2.5 bg-gray-50 dark:bg-slate-800 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="capitalize font-medium text-gray-800 dark:text-gray-200">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Interactive Financing Calculator */}
            {activeTab === 'financing' && (
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-slate-800/80 p-5 rounded-xl border border-gray-200 dark:border-slate-700">
                <div className="space-y-4 text-xs">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                    Ajusta tus parámetros de financiamiento:
                  </h4>

                  {/* Down payment slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span>Enganche ({downPaymentPercent}%):</span>
                      <span className="text-[#3483FA] font-extrabold">${downPaymentAmount.toLocaleString('es-MX')} MXN</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-[#3483FA]"
                    />
                  </div>

                  {/* Term Selector */}
                  <div className="space-y-1">
                    <span className="font-semibold block">Plazo en meses:</span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[12, 24, 36, 48, 60].map((term) => (
                        <button
                          key={term}
                          onClick={() => setTermMonths(term)}
                          className={`py-1.5 rounded text-xs font-bold transition ${
                            termMonths === term
                              ? 'bg-[#3483FA] text-white'
                              : 'bg-white dark:bg-slate-700 border text-gray-700 dark:text-gray-200'
                          }`}
                        >
                          {term}m
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calculated Output */}
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-slate-700 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Pago mensual estimado:</span>
                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                      ${monthlyPayment.toLocaleString('es-MX')}{' '}
                      <span className="text-xs font-bold text-gray-400">MXN/mes</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Tasa anual estimada 12.9% sujeto a aprobación de crédito bancario.
                    </p>
                  </div>

                  {!creditRequested ? (
                    <button
                      onClick={() => setCreditRequested(true)}
                      className="mt-4 w-full py-2.5 bg-[#3483FA] hover:bg-blue-600 text-white font-bold text-xs rounded-lg transition shadow"
                    >
                      Solicitar Pre-Aprobación Inmediata
                    </button>
                  ) : (
                    <div className="mt-4 p-2 bg-emerald-50 text-emerald-800 text-xs text-center font-bold rounded">
                      ✓ Pre-aprobación iniciada con folio #AP-{Math.floor(100000 + Math.random() * 900000)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
