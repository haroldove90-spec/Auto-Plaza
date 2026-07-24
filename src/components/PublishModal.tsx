import React, { useState } from 'react';
import { Vehicle, BodyStyle, Condition, Transmission, FuelType } from '../types';
import { X, PlusCircle, CheckCircle2, Car, Upload, MapPin, DollarSign } from 'lucide-react';
import { BRANDS, LOCATIONS_MEXICO } from '../data/mockVehicles';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (newVehicle: Vehicle) => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  onAddVehicle,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    brand: 'Nissan',
    model: '',
    year: 2024,
    version: 'Exclusive',
    price: 350000,
    mileage: 15000,
    condition: 'Seminuevo' as Condition,
    bodyStyle: 'Sedán' as BodyStyle,
    transmission: 'Automática' as Transmission,
    fuelType: 'Gasolina' as FuelType,
    color: 'Blanco',
    city: 'CDMX',
    state: 'CDMX',
    sellerName: 'Mi Concesionaria / Particular',
    phone: '55 1234 5678',
    whatsapp: '525512345678',
    description: 'Excelente estado, servicios de agencia al día, un solo dueño.',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  });

  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createdVehicle: Vehicle = {
      id: `car-user-${Date.now()}`,
      title: formData.title || `${formData.year} ${formData.brand} ${formData.model} ${formData.version}`,
      brand: formData.brand,
      model: formData.model || 'Modelo Custom',
      year: Number(formData.year),
      version: formData.version,
      price: Number(formData.price),
      currency: 'MXN',
      mileage: Number(formData.mileage),
      condition: formData.condition,
      bodyStyle: formData.bodyStyle,
      transmission: formData.transmission,
      fuelType: formData.fuelType,
      color: formData.color,
      doors: 4,
      images: [
        formData.imageUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
      ],
      location: {
        city: formData.city,
        state: formData.state,
        fullAddress: `${formData.city}, ${formData.state}`
      },
      seller: {
        id: `seller-user-${Date.now()}`,
        name: formData.sellerName,
        type: 'Particular Directo',
        rating: 5.0,
        salesCount: 1,
        location: `${formData.city}, ${formData.state}`,
        city: formData.city,
        state: formData.state,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        responseTime: 'Responde de inmediato',
        isOfficialStore: false,
        verifiedBadge: true,
        joinedYear: 2026,
      },
      isVerified: true,
      isDirectDeal: true,
      isFeatured: true,
      highlights: ['Factura Original', 'Un solo dueño', 'Verificación Vigente'],
      techSpecs: {
        engine: '2.0L 4Cil Turbo',
        displacement: '1998 cc',
        horsepower: 180,
        torque: '180 lb-pie',
        fuelEconomy: '15.5 km/l',
        drivetrain: 'Tracción Delantera',
        doors: 4,
        passengers: 5,
        airbags: 6,
        vin: `3VIN${Math.floor(10000000 + Math.random() * 90000000)}`,
        colorExterior: formData.color,
        colorInterior: 'Negro'
      },
      inspection: {
        motor: true,
        transmision: true,
        suspension: true,
        frenos: true,
        electrico: true,
        esteticaExterior: true,
        esteticaInterior: true,
        documentacionRegla: true,
        sinAdeudos: true,
        llantasBuenas: true
      },
      inspectionDate: '2026-07-24',
      description: formData.description,
      monthlyEstimate: Math.round(Number(formData.price) * 0.014),
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 1
    };

    onAddVehicle(createdVehicle);
    setIsPublished(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-yellow-400 text-slate-900 border-b border-yellow-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 font-bold" />
            <h2 className="font-extrabold text-base">
              Publicar mi Auto en Autoplaza
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/10 hover:bg-black/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-zinc-800">
          {!isPublished ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Marca *</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full p-2.5 rounded border border-zinc-300 bg-zinc-100 text-zinc-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {BRANDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Modelo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sentra, RAV4, Jetta..."
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full p-2.5 rounded border border-zinc-300 bg-zinc-100 text-zinc-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Año *</label>
                  <input
                    type="number"
                    required
                    min="2000"
                    max="2026"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full p-2.5 rounded border border-zinc-300 bg-zinc-100 text-zinc-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Precio ($ MXN) *</label>
                  <input
                    type="number"
                    required
                    step="5000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded border border-zinc-300 bg-zinc-100 text-zinc-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Kilometraje (km) *</label>
                  <input
                    type="number"
                    required
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
                    className="w-full p-2.5 rounded border border-zinc-300 bg-zinc-100 text-zinc-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Tipo de Carrocería *</label>
                  <select
                    value={formData.bodyStyle}
                    onChange={(e) => setFormData({ ...formData, bodyStyle: e.target.value as BodyStyle })}
                    className="w-full p-2.5 rounded border border-zinc-300 bg-zinc-100 text-zinc-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Sedán">Sedán</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Pick-Up">Pick-Up</option>
                    <option value="Van">Van</option>
                    <option value="Deportivo">Deportivo</option>
                    <option value="Eléctrico/Híbrido">Eléctrico/Híbrido</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Ubicación / Estado *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value, state: e.target.value })}
                    className="w-full p-2.5 rounded border border-zinc-300 bg-zinc-100 text-zinc-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {LOCATIONS_MEXICO.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-700">URL Fotografía Principal</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full p-2.5 rounded border border-zinc-300 bg-zinc-100 text-zinc-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1 text-xs text-zinc-700">Descripción Detallada</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 text-xs rounded border border-zinc-300 bg-zinc-100 text-zinc-900 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#3483FA] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 mt-4"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Publicar Anuncio Ahora</span>
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                ¡Anuncio Publicado Exitosamente!
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Tu vehículo ha sido añadido al catálogo activo de Autoplaza. Ya está disponible para búsquedas y comparación.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#3483FA] text-white font-bold text-xs rounded-lg shadow"
              >
                Volver al Marketplace
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
