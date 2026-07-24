import React from 'react';
import { PresentationSettings } from '../types';
import {
  Sparkles,
  Palette,
  Eye,
  FileText,
  Building2,
  CheckCircle2,
  HelpCircle,
  BarChart3,
  Sliders
} from 'lucide-react';

interface ClientPresentationBarProps {
  settings: PresentationSettings;
  onUpdateSettings: (updater: (prev: PresentationSettings) => PresentationSettings) => void;
  onOpenProposalModal: () => void;
}

export const ClientPresentationBar: React.FC<ClientPresentationBarProps> = ({
  settings,
  onUpdateSettings,
  onOpenProposalModal,
}) => {
  if (!settings.showClientBar) return null;

  return (
    <div className="bg-slate-900 text-white px-4 py-2 border-b border-slate-800 text-xs shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow">
            <Sparkles className="w-3 h-3" />
            <span>DEMO PRESENTACIÓN CLIENTE</span>
          </span>
          <span className="text-slate-300 font-semibold hidden md:inline">
            Plantilla Autoplaza v2.4 (Mercado Libre Autos)
          </span>
        </div>

        {/* Middle Theme Switchers */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px] font-medium hidden sm:inline">Tema:</span>
          
          <button
            onClick={() =>
              onUpdateSettings((prev) => ({ ...prev, themeMode: 'mercado_libre_yellow' }))
            }
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 ${
              settings.themeMode === 'mercado_libre_yellow'
                ? 'bg-[#FFE600] text-slate-950 ring-2 ring-yellow-300'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>Mercado Libre</span>
          </button>

          <button
            onClick={() =>
              onUpdateSettings((prev) => ({ ...prev, themeMode: 'autoplaza_dark_luxury' }))
            }
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 ${
              settings.themeMode === 'autoplaza_dark_luxury'
                ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>Oscuro Premium</span>
          </button>
        </div>

        {/* Right Proposal Deck Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenProposalModal}
            className="px-3 py-1 rounded bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-[11px] transition shadow flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ficha de Presentación al Cliente</span>
          </button>
        </div>

      </div>
    </div>
  );
};
