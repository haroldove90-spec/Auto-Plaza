import React, { useState } from 'react';
import { X, Calculator, Building2, CheckCircle2, ShieldCheck, DollarSign, Sparkles } from 'lucide-react';

interface FinancingCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinancingCalculatorModal: React.FC<FinancingCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [carValue, setCarValue] = useState(450000);
  const [downPercent, setDownPercent] = useState(20);
  const [term, setTerm] = useState(48);
  const [submitted, setSubmitted] = useState(false);

  const downAmount = Math.round((carValue * downPercent) / 100);
  const loanAmount = carValue - downAmount;

  // Banks:
  const banks = [
    { name: 'Autoplaza Credi Directo', rate: 11.9, cat: 14.2, badge: 'Recomendado' },
    { name: 'BBVA Auto', rate: 12.5, cat: 15.1, badge: 'Aprobación 24h' },
    { name: 'Banregio Automotriz', rate: 12.9, cat: 15.8, badge: 'Sin Penalización' },
    { name: 'Santander Auto', rate: 13.2, cat: 16.0, badge: 'Tasa Fija' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-[#3483FA] text-white border-b border-blue-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 font-bold" />
            <h2 className="font-extrabold text-base">
              Simulador Multibanca de Crédito Automotriz
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/10 hover:bg-black/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-gray-800 dark:text-gray-200">
          {!submitted ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Sliders (6 cols) */}
              <div className="md:col-span-6 space-y-4 text-xs">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  Parámetros del Vehículo
                </h3>

                <div>
                  <label className="font-bold block mb-1">Valor del auto ($ MXN):</label>
                  <input
                    type="number"
                    step="10000"
                    value={carValue}
                    onChange={(e) => setCarValue(Number(e.target.value))}
                    className="w-full p-2.5 rounded border border-zinc-300 bg-zinc-100 font-extrabold text-sm text-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Enganche ({downPercent}%):</span>
                    <span className="text-emerald-600">${downAmount.toLocaleString('es-MX')}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={downPercent}
                    onChange={(e) => setDownPercent(Number(e.target.value))}
                    className="w-full accent-[#3483FA]"
                  />
                </div>

                <div>
                  <span className="font-bold block mb-1">Plazo de Pago:</span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[12, 24, 36, 48, 60].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTerm(t)}
                        className={`py-2 rounded-lg font-bold text-xs transition ${
                          term === t
                            ? 'bg-[#3483FA] text-white shadow'
                            : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {t}m
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-slate-700">
                  <div className="text-[11px] text-gray-600 dark:text-gray-300">
                    Monto a financiar:
                  </div>
                  <div className="text-lg font-black text-gray-900 dark:text-white">
                    ${loanAmount.toLocaleString('es-MX')} MXN
                  </div>
                </div>
              </div>

              {/* Bank Quotes Comparison (6 cols) */}
              <div className="md:col-span-6 space-y-3 text-xs">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                  <span>Opciones Disponibles</span>
                  <span className="text-[10px] text-gray-400 font-normal">Tasa Anual Fija</span>
                </h3>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {banks.map((b, idx) => {
                    const monthlyRate = b.rate / 100 / 12;
                    const pmt = Math.round(
                      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term))) /
                        (Math.pow(1 + monthlyRate, term) - 1)
                    );

                    return (
                      <div
                        key={idx}
                        className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-500 transition shadow-sm flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                            <span>{b.name}</span>
                            <span className="text-[9px] bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1.5 py-0.2 rounded font-extrabold">
                              {b.badge}
                            </span>
                          </div>
                          <div className="text-[10px] text-gray-500 mt-0.5">
                            Tasa {b.rate}% | CAT {b.cat}% Promedio
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                            ${pmt.toLocaleString('es-MX')}/m
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow transition flex items-center justify-center gap-2 mt-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Iniciar Pre-Aprobación Sin Interés</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                ¡Solicitud de Pre-Aprobación Recibida!
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Tu cotización ha sido procesada con éxito. Un asesor especializado de Autoplaza se pondrá en contacto contigo para validar tu información.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#3483FA] text-white font-bold text-xs rounded-lg shadow"
              >
                Entendido
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
