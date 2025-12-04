import React from 'react';
import { ApiKey } from '../types';
import { Trash2, Copy, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

interface KeyCardProps {
  apiKey: ApiKey;
  onDelete: (id: string) => void;
  onRefresh: (id: string) => void;
}

export const KeyCard: React.FC<KeyCardProps> = ({ apiKey, onDelete, onRefresh }) => {
  const isDepleted = apiKey.status === 'depleted' || apiKey.usagePercent >= 100;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey.key);
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border p-5 transition-all ${
      isDepleted 
        ? 'bg-red-950/20 border-red-900/50' 
        : 'bg-slate-800/50 border-slate-700 hover:border-indigo-500/50'
    }`}>
      {/* Background Progress Bar */}
      <div 
        className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${isDepleted ? 'bg-red-600' : 'bg-emerald-500'}`} 
        style={{ width: `${apiKey.usagePercent}%` }}
      />

      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              apiKey.provider === 'Gemini' ? 'bg-blue-500/20 text-blue-400' : 
              apiKey.provider === 'OpenAI' ? 'bg-green-500/20 text-green-400' : 
              'bg-purple-500/20 text-purple-400'
            }`}>
              {apiKey.provider}
            </span>
            <h3 className="font-semibold text-slate-100">{apiKey.label}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            {apiKey.key.substring(0, 8)}...{apiKey.key.substring(apiKey.key.length - 4)}
          </p>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={copyToClipboard}
            className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
            title="Copy Key"
          >
            <Copy size={16} />
          </button>
          <button 
            onClick={() => onDelete(apiKey.id)}
            className="p-1.5 hover:bg-red-900/30 rounded text-slate-400 hover:text-red-400 transition-colors"
            title="Delete Key"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-slate-400">Usage Quota</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-bold ${isDepleted ? 'text-red-500' : 'text-slate-200'}`}>
              {apiKey.usagePercent}%
            </span>
            <span className="text-xs text-slate-600">
              ({apiKey.used} / {apiKey.totalLimit})
            </span>
          </div>
        </div>
        
        {isDepleted ? (
           <button 
             onClick={() => onRefresh(apiKey.id)}
             className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-indigo-500/20 transition-all animate-pulse"
           >
             <RefreshCw size={14} />
             GENERATE NEW
           </button>
        ) : (
          <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded">
            <CheckCircle size={14} />
            Active
          </div>
        )}
      </div>
      
      {isDepleted && (
        <div className="mt-3 flex items-center gap-2 text-xs text-red-400 bg-red-950/40 p-2 rounded border border-red-900/30">
          <AlertTriangle size={14} />
          <span>Limit reached. Cycle this key.</span>
        </div>
      )}
    </div>
  );
};