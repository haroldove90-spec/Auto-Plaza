import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, DollarSign, Zap, FileSpreadsheet, Layers, Sparkles, Building2, Smartphone } from 'lucide-react';
import { PresentationSettings } from '../types';

interface ClientProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PresentationSettings;
  onUpdateSettings: (updater: (prev: PresentationSettings) => PresentationSettings) => void;
}

export const ClientProposalModal: React.FC<ClientProposalModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const [clientCompany, setClientCompany] = useState(settings.clientName || 'Grupo Automotriz Premier');

  const handleSaveClientName = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings((prev) => ({ ...prev, clientName: clientCompany }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 text-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-base tracking-wide">
              Propuesta Comercial & Presentación de la Plantilla
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Client Customization Bar */}
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="font-bold text-sm text-white">Personalizar Nombre del Cliente:</h3>
                <p className="text-slate-400 text-[11px]">Modifica el nombre para mostrar en la propuesta:</p>
              </div>
            </div>

            <form onSubmit={handleSaveClientName} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-600 text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 font-bold text-xs rounded-lg transition"
              >
                Guardar
              </button>
            </form>
          </div>

          {/* Hero Banner Executive Summary */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 border border-blue-800/50 space-y-3">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-widest">
              PLANTILLA PREMIUM AUTOMOTRIZ • PRESENTACIÓN PARA {clientCompany.toUpperCase()}
            </div>
            <h1 className="text-2xl font-black text-white leading-tight">
              Plataforma Marketplace de Autos 'Autoplaza'
            </h1>
            <p className="text-slate-300 leading-relaxed text-xs">
              Diseño idéntico y optimizado sobre el estándar visual de <strong>Mercado Libre Autos</strong>, adaptado con motores de búsqueda avanzada, verificación mecánica en 240 puntos, simulador de crédito automotriz multibanca y módulo para agencias y particulares.
            </p>
          </div>

          {/* Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700 space-y-1">
              <Zap className="w-5 h-5 text-amber-400" />
              <h4 className="font-bold text-sm text-white">Rendimiento Extremo</h4>
              <p className="text-slate-400 text-[11px]">
                Carga ultra rápida de imágenes de alta resolución sin parpadeos ni bloqueos.
              </p>
            </div>

            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700 space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-sm text-white">Confianza y Certificación</h4>
              <p className="text-slate-400 text-[11px]">
                Distintivo de verificación mecánica y reporte de inexistencia de adeudos.
              </p>
            </div>

            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700 space-y-1">
              <DollarSign className="w-5 h-5 text-blue-400" />
              <h4 className="font-bold text-sm text-white">Monetización Integrada</h4>
              <p className="text-slate-400 text-[11px]">
                Comisiones por publicación destacada, generación de leads de crédito y agencias oficiales.
              </p>
            </div>
          </div>

          {/* Feature Matrix Checklist */}
          <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Funcionalidades Incluidas en la Entregable</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Encabezado Oficial estilo Mercado Libre (Barra Amarilla)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Filtros Rápidos por Tipo de Carrocería (Burbujas con foto)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Barra Lateral Completa de Filtros (Precio, Año, Transmisión)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Tarjetas de Autos con Carrusel de Fotografías Múltiples</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Ficha Técnica Detallada con Galería e Inspección 240 Pts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Calculadora de Financiamiento e Integración WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Comparador de hasta 3 Vehículos Lado a Lado</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Módulo "Vender mi Auto" con Publicación en Tiempo Real</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl shadow-lg transition"
            >
              Explorar la Plantilla Interactiva
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
