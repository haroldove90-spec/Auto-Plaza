import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Lock, Award, HeartHandshake, PhoneCall } from 'lucide-react';

interface FooterProps {
  themeMode: 'mercado_libre_yellow' | 'autoplaza_dark_luxury' | 'autoplaza_clean_white';
}

export const Footer: React.FC<FooterProps> = ({ themeMode }) => {
  const isYellow = themeMode === 'mercado_libre_yellow';

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400 text-xs transition-colors">
      
      {/* Top Value Badges Bar */}
      <div className="bg-gray-50 dark:bg-slate-800/60 py-6 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-xs">Compra Protegida</h4>
              <p className="text-[11px] text-gray-500">Garantía mecánica y revisión legal completa.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-xs">Datos Validados</h4>
              <p className="text-[11px] text-gray-500">Inspección de VIN y sin reporte de robo.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-xs">Agencias Certificadas</h4>
              <p className="text-[11px] text-gray-500">Agencias automotrices con respaldo oficial.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-xs">Atención 24/7</h4>
              <p className="text-[11px] text-gray-500">Asesoría telefónica y por WhatsApp.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-6 border-b border-gray-100 dark:border-slate-800">
          
          <div className="space-y-2">
            <Logo variant="light" showTagline={false} />
            <p className="text-[11px] max-w-sm text-gray-500">
              El marketplace líder para comprar, comparar y vender vehículos seminuevos, usados y 0 km en todo México.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs font-semibold">
            <div className="space-y-2">
              <span className="text-gray-900 dark:text-white font-bold block">Acerca de</span>
              <ul className="space-y-1 text-gray-500 font-normal">
                <li><a href="#" className="hover:underline">Autoplaza México</a></li>
                <li><a href="#" className="hover:underline">Agencias Oficiales</a></li>
                <li><a href="#" className="hover:underline">Inversionistas</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-gray-900 dark:text-white font-bold block">Servicios</span>
              <ul className="space-y-1 text-gray-500 font-normal">
                <li><a href="#" className="hover:underline">Simulador de Crédito</a></li>
                <li><a href="#" className="hover:underline">Verificación 240 Pts</a></li>
                <li><a href="#" className="hover:underline">Vender mi Auto</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-gray-900 dark:text-white font-bold block">Legal</span>
              <ul className="space-y-1 text-gray-500 font-normal">
                <li><a href="#" className="hover:underline">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:underline">Aviso de Privacidad</a></li>
                <li><a href="#" className="hover:underline">Ayuda / PQR</a></li>
              </ul>
            </div>
          </div>

        </div>

      {/* Bottom Bar matching Sleek Interface Design */}
      <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-4 px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 uppercase tracking-wider font-bold">
            © 2026 AUTOPLAZA MARKETPLACE • PARTE DE GRUPO PLAZA
          </div>
          <div className="flex gap-4 text-[10px] text-zinc-500 font-medium">
            <a href="#" className="hover:text-blue-600 transition">Términos y condiciones</a>
            <a href="#" className="hover:text-blue-600 transition">Aviso de privacidad</a>
            <a href="#" className="hover:text-blue-600 transition">Ayuda / PQR</a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};
