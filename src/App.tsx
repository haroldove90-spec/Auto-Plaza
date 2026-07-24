import React, { useState, useMemo } from 'react';
import { Vehicle, FilterState, PresentationSettings, BodyStyle } from './types';
import { INITIAL_VEHICLES } from './data/mockVehicles';
import { ClientPresentationBar } from './components/ClientPresentationBar';
import { Header } from './components/Header';
import { SubHeaderCategoryBar } from './components/SubHeaderCategoryBar';
import { SidebarFilters } from './components/SidebarFilters';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { CompareDrawer } from './components/CompareDrawer';
import { PublishModal } from './components/PublishModal';
import { FinancingCalculatorModal } from './components/FinancingCalculatorModal';
import { ClientProposalModal } from './components/ClientProposalModal';
import { Footer } from './components/Footer';
import {
  Heart,
  GitCompare,
  ArrowUpDown,
  SearchX,
  X,
  MapPin,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Car
} from 'lucide-react';

export default function App() {
  // Application Data States:
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [favorites, setFavorites] = useState<string[]>(['car-001']); // default favorite
  const [compared, setCompared] = useState<string[]>(['car-001', 'car-002']); // default compare

  // Active Modals & View States:
  const [selectedVehicleDetail, setSelectedVehicleDetail] = useState<Vehicle | null>(null);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isFinancingModalOpen, setIsFinancingModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('CDMX');

  // WhatsApp Toast Feedback State:
  const [whatsAppToast, setWhatsAppToast] = useState<{ vehicle: Vehicle } | null>(null);

  // Presentation Settings:
  const [presentationSettings, setPresentationSettings] = useState<PresentationSettings>({
    showClientBar: false,
    themeMode: 'mercado_libre_yellow',
    clientName: 'Grupo Automotriz Premier',
    customBrandColor: '#3483FA',
    currencySymbol: 'MXN',
    showFinancingBadge: true,
  });

  // Filter State:
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'Todos',
    condition: 'Todas',
    onlyOfficialStore: false,
    onlyVerified: false,
    onlyDirectDeal: false,
    minPrice: null,
    maxPrice: null,
    minYear: null,
    maxYear: null,
    minMileage: null,
    maxMileage: null,
    brands: [],
    locations: [],
    transmissions: [],
    fuels: [],
    sortBy: 'relevance',
  });

  // Handlers for Favorites & Compare:
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (id: string) => {
    setCompared((prev) => {
      if (prev.includes(id)) {
        return prev.filter((c) => c !== id);
      }
      if (prev.length >= 3) {
        alert('Puedes comparar máximo 3 vehículos a la vez.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'Todos',
      condition: 'Todas',
      onlyOfficialStore: false,
      onlyVerified: false,
      onlyDirectDeal: false,
      minPrice: null,
      maxPrice: null,
      minYear: null,
      maxYear: null,
      minMileage: null,
      maxMileage: null,
      brands: [],
      locations: [],
      transmissions: [],
      fuels: [],
      sortBy: 'relevance',
    });
  };

  const handleAddNewVehicle = (newCar: Vehicle) => {
    setVehicles((prev) => [newCar, ...prev]);
  };

  const handleTriggerWhatsApp = (vehicle: Vehicle) => {
    setWhatsAppToast({ vehicle });
    // Also trigger window.open in a safe fallback:
    const msg = encodeURIComponent(
      `Hola ${vehicle.seller.name}, vi tu anuncio de "${vehicle.title}" por $${vehicle.price.toLocaleString('es-MX')} MXN en Autoplaza y quisiera más información.`
    );
    window.open(`https://wa.me/${vehicle.seller.whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  // Filter & Search Evaluation:
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Search text query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = v.title.toLowerCase().includes(q);
        const matchesBrand = v.brand.toLowerCase().includes(q);
        const matchesModel = v.model.toLowerCase().includes(q);
        const matchesYear = v.year.toString().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesModel && !matchesYear) {
          return false;
        }
      }

      // Category body style
      if (filters.category !== 'Todos' && v.bodyStyle !== filters.category) {
        return false;
      }

      // Condition
      if (filters.condition !== 'Todas' && v.condition !== filters.condition) {
        return false;
      }

      // Toggles
      if (filters.onlyOfficialStore && !v.seller.isOfficialStore) return false;
      if (filters.onlyVerified && !v.isVerified) return false;
      if (filters.onlyDirectDeal && !v.isDirectDeal) return false;

      // Price ranges
      if (filters.minPrice !== null && v.price < filters.minPrice) return false;
      if (filters.maxPrice !== null && v.price > filters.maxPrice) return false;

      // Year ranges
      if (filters.minYear !== null && v.year < filters.minYear) return false;
      if (filters.maxYear !== null && v.year > filters.maxYear) return false;

      // Brands array
      if (filters.brands.length > 0 && !filters.brands.includes(v.brand)) {
        return false;
      }

      // Locations array
      if (
        filters.locations.length > 0 &&
        !filters.locations.some(
          (loc) => v.location.state.includes(loc) || v.location.city.includes(loc)
        )
      ) {
        return false;
      }

      // Transmissions
      if (
        filters.transmissions.length > 0 &&
        !filters.transmissions.includes(v.transmission)
      ) {
        return false;
      }

      // Fuels
      if (filters.fuels.length > 0 && !filters.fuels.includes(v.fuelType)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'year_desc') return b.year - a.year;
      if (filters.sortBy === 'km_asc') return a.mileage - b.mileage;
      if (filters.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return b.viewsCount - a.viewsCount; // relevance
    });
  }, [vehicles, filters]);

  const comparedVehiclesObjects = useMemo(() => {
    return vehicles.filter((v) => compared.includes(v.id));
  }, [vehicles, compared]);

  const favoriteVehiclesObjects = useMemo(() => {
    return vehicles.filter((v) => favorites.includes(v.id));
  }, [vehicles, favorites]);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      presentationSettings.themeMode === 'autoplaza_dark_luxury'
        ? 'bg-zinc-950 text-zinc-100 dark'
        : 'bg-zinc-50 text-zinc-900'
    }`}>
      
      {/* Client Presentation Toolbar */}
      {presentationSettings.showClientBar && (
        <ClientPresentationBar
          settings={presentationSettings}
          onUpdateSettings={setPresentationSettings}
          onOpenProposalModal={() => setIsProposalModalOpen(true)}
        />
      )}

      {/* Main Yellow Header (Mercado Libre Style) */}
      <Header
        filters={filters}
        onUpdateFilters={setFilters}
        favoritesCount={favorites.length}
        compareCount={compared.length}
        onOpenFavoritesModal={() => setIsFavoritesModalOpen(true)}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onOpenPublishModal={() => setIsPublishModalOpen(true)}
        onOpenFinancingModal={() => setIsFinancingModalOpen(true)}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        selectedLocation={selectedLocation}
        themeMode={presentationSettings.themeMode}
      />

      {/* SubHeader Category Quick Bubbles */}
      <SubHeaderCategoryBar
        currentCategory={filters.category}
        onSelectCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
        vehiclesCount={filteredVehicles.length}
      />

      {/* Sleek Interface Hero Promo Banner */}
      <div className="w-full bg-zinc-900 relative overflow-hidden flex items-center px-6 md:px-12 py-8 border-b border-zinc-800">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%)' }}></div>
        </div>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
          <div className="max-w-xl">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 tracking-tight">Financia tu próximo auto</h2>
            <p className="text-zinc-300 text-xs md:text-sm mb-4">Créditos aprobados en menos de 24 horas con tasa fija preferencial en Autoplaza.</p>
            <button
              onClick={() => setIsFinancingModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded font-bold text-sm hover:bg-blue-700 transition shadow-sm"
            >
              Simular planes de crédito
            </button>
          </div>
          <div className="hidden md:flex w-80 h-28 bg-zinc-800 rounded-t-2xl border-x border-t border-zinc-700 flex-col items-center justify-center p-4 self-end shadow-lg">
            <span className="text-zinc-400 text-xs uppercase tracking-widest font-bold">Destacado del día</span>
            <span className="text-white text-lg font-bold italic tracking-wide">BMW Serie 3 2024</span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Sidebar Filters */}
          <SidebarFilters
            filters={filters}
            onUpdateFilters={setFilters}
            totalResultsCount={filteredVehicles.length}
            onResetFilters={handleResetFilters}
          />

          {/* Right Listings Results Area */}
          <section className="flex-1 w-full space-y-4">
            
            {/* Sort & Quick Stats Bar */}
            <div className="bg-white p-3.5 rounded border border-zinc-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-900 text-sm">
                  {filteredVehicles.length.toLocaleString()}
                </span>
                <span className="text-zinc-500 font-medium">
                  {filteredVehicles.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                </span>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-zinc-500 font-medium">Ordenar por:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as any,
                    }))
                  }
                  className="bg-zinc-100 border border-zinc-300 rounded px-2.5 py-1 font-bold text-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="relevance">Más relevantes</option>
                  <option value="price_asc">Menor precio</option>
                  <option value="price_desc">Mayor precio</option>
                  <option value="year_desc">Año más reciente</option>
                  <option value="km_asc">Menor kilometraje</option>
                  <option value="newest">Publicaciones recientes</option>
                </select>
              </div>
            </div>

            {/* Vehicle List */}
            {filteredVehicles.length > 0 ? (
              <div className="space-y-4">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isFavorite={favorites.includes(vehicle.id)}
                    isCompared={compared.includes(vehicle.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onToggleCompare={handleToggleCompare}
                    onSelectVehicle={setSelectedVehicleDetail}
                    onOpenWhatsApp={handleTriggerWhatsApp}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search Results State */
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 border border-gray-200 dark:border-slate-800 text-center space-y-4">
                <SearchX className="w-16 h-16 text-gray-300 dark:text-slate-700 mx-auto" />
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                  No encontramos vehículos que coincidan con tus filtros
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Intenta cambiar la búsqueda por término, ajustar el rango de precios o limpiar los filtros seleccionados.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-[#3483FA] text-white font-bold text-xs rounded-xl shadow hover:bg-blue-600 transition"
                >
                  Restablecer Todos los Filtros
                </button>
              </div>
            )}

          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer themeMode={presentationSettings.themeMode} />

      {/* MODALS */}

      {/* 1. Vehicle Detail Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicleDetail}
        onClose={() => setSelectedVehicleDetail(null)}
        isFavorite={selectedVehicleDetail ? favorites.includes(selectedVehicleDetail.id) : false}
        isCompared={selectedVehicleDetail ? compared.includes(selectedVehicleDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onToggleCompare={handleToggleCompare}
        onOpenWhatsApp={handleTriggerWhatsApp}
      />

      {/* 2. Compare Drawer */}
      <CompareDrawer
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        vehicles={comparedVehiclesObjects}
        onRemoveFromCompare={handleToggleCompare}
        onClearAll={() => setCompared([])}
        onSelectVehicle={(v) => {
          setSelectedVehicleDetail(v);
          setIsCompareModalOpen(false);
        }}
      />

      {/* 3. Favorites Modal */}
      {isFavoritesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-800 flex flex-col max-h-[85vh]">
            <div className="p-4 bg-red-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-white" />
                <h2 className="font-bold text-base">Mis Vehículos Favoritos ({favorites.length})</h2>
              </div>
              <button onClick={() => setIsFavoritesModalOpen(false)} className="p-1.5 rounded-lg bg-black/10 hover:bg-black/20">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
              {favoriteVehiclesObjects.length === 0 ? (
                <div className="py-12 text-center text-gray-500 space-y-2">
                  <Heart className="w-10 h-10 mx-auto text-gray-300" />
                  <p>No tienes vehículos en tus favoritos aún.</p>
                </div>
              ) : (
                favoriteVehiclesObjects.map((v) => (
                  <div key={v.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <img src={v.images[0]} alt={v.title} className="w-16 h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">{v.title}</h4>
                        <div className="text-emerald-600 font-extrabold">${v.price.toLocaleString('es-MX')} MXN</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedVehicleDetail(v);
                        setIsFavoritesModalOpen(false);
                      }}
                      className="px-3 py-1.5 bg-[#3483FA] text-white font-bold rounded-lg"
                    >
                      Ver Ficha
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Publish Vehicle Modal ("Vender mi auto") */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onAddVehicle={handleAddNewVehicle}
      />

      {/* 5. Financing Simulator Modal */}
      <FinancingCalculatorModal
        isOpen={isFinancingModalOpen}
        onClose={() => setIsFinancingModalOpen(false)}
      />

      {/* 6. Location Picker Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#3483FA]" />
                <span>Selecciona tu Ubicación</span>
              </h3>
              <button onClick={() => setIsLocationModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Filtra las publicaciones por la ciudad o estado más cercano a ti:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {['CDMX', 'Estado de México', 'Jalisco', 'Nuevo León', 'Puebla', 'Querétaro', 'Yucatán', 'Veracruz'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setFilters((prev) => ({ ...prev, locations: [loc] }));
                    setIsLocationModalOpen(false);
                  }}
                  className={`p-2.5 rounded-xl border text-left font-semibold transition ${
                    selectedLocation === loc
                      ? 'bg-blue-50 border-[#3483FA] text-[#3483FA]'
                      : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. Client Presentation Proposal Modal */}
      <ClientProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        settings={presentationSettings}
        onUpdateSettings={setPresentationSettings}
      />

      {/* Toast Popup Notification */}
      {whatsAppToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400" />
          <div className="text-xs">
            <p className="font-bold">Contactando al Vendedor vía WhatsApp...</p>
            <p className="text-gray-400 text-[11px]">{whatsAppToast.vehicle.title}</p>
          </div>
          <button onClick={() => setWhatsAppToast(null)} className="ml-2 text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
