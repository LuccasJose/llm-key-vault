import React, { useState, useEffect } from 'react';
import { Provider, ApiKey } from '../types';
import { ExternalLink, RefreshCw, Copy, KeyRound, Mail, Zap, CheckCircle2, ArrowRight, WalletCards, LayoutTemplate, ShieldCheck } from 'lucide-react';

interface GeneratorProps {
  onAddKey: (key: string, provider: Provider, label: string) => void;
  availableKeys: ApiKey[];
}

// Direct Link Configuration
const PROVIDER_DATA = {
  [Provider.GEMINI]: {
    login: "https://accounts.google.com/signin",
    keys: "https://aistudio.google.com/app/apikey",
    billing: "https://console.cloud.google.com/billing",
    color: "from-blue-600 to-indigo-600",
    iconColor: "text-blue-400",
    steps: [
      "Log in to your Google account.",
      "Click 'Create API Key' in Google AI Studio.",
      "Select a project (or create a new 'My First Project').",
      "Copy the generated key and paste it below."
    ]
  },
  [Provider.OPENAI]: {
    login: "https://platform.openai.com/login",
    keys: "https://platform.openai.com/api-keys",
    billing: "https://platform.openai.com/usage",
    color: "from-emerald-600 to-teal-600",
    iconColor: "text-emerald-400",
    steps: [
      "Access OpenAI platform and verify phone if needed.",
      "Go to the 'API Keys' section in the sidebar.",
      "Click 'Create new secret key'.",
      "Name it, copy the key, and paste it below."
    ]
  },
  [Provider.ANTHROPIC]: {
    login: "https://console.anthropic.com/login",
    keys: "https://console.anthropic.com/settings/keys",
    billing: "https://console.anthropic.com/settings/plans",
    color: "from-orange-600 to-amber-600",
    iconColor: "text-orange-400",
    steps: [
      "Log in to the Anthropic Console.",
      "Click 'Get API Keys' in the dashboard.",
      "Click the 'Create Key' button.",
      "Copy the key starting with 'sk-ant' and paste below."
    ]
  },
  [Provider.MISTRAL]: {
    login: "https://auth.mistral.ai/ui/login",
    keys: "https://console.mistral.ai/api-keys/",
    billing: "https://console.mistral.ai/billing/",
    color: "from-purple-600 to-fuchsia-600",
    iconColor: "text-purple-400",
    steps: [
      "Create your account at Mistral AI.",
      "Add a card if required (sometimes trial is available without).",
      "Generate a new key in the 'API Keys' tab.",
      "Copy and paste below immediately (it only shows once)."
    ]
  }
};

export const Generator: React.FC<GeneratorProps> = ({ onAddKey, availableKeys }) => {
  const [selectedProvider, setSelectedProvider] = useState<Provider>(Provider.GEMINI);
  
  // Manual key inputs
  const [newKeyInput, setNewKeyInput] = useState('');
  const [newKeyLabel, setNewKeyLabel] = useState('');
  
  // Identity Tools
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [showIdentityTools, setShowIdentityTools] = useState(false);

  // Update suggested label
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 1000);
    setNewKeyLabel(`${selectedProvider} Account #${randomId}`);
  }, [selectedProvider]);

  const generateIdentity = () => {
    // Generate strong password
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let pass = "";
    for (let i = 0; i < 20; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Generate email alias
    const prefixes = ["dev.ai", "lab.test", "project.x", "api.farmer", "user.temp"];
    const randomNum = Math.floor(Math.random() * 99999);
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const email = `${prefix}+${randomNum}@gmail.com`;

    setGeneratedEmail(email);
    setGeneratedPassword(pass);
    setShowIdentityTools(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKeyInput) {
      onAddKey(newKeyInput, selectedProvider, newKeyLabel);
      setNewKeyInput('');
      // Optional visual feedback
    }
  };

  const providerInfo = PROVIDER_DATA[selectedProvider];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* 1. Provider Selection */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="text-yellow-400 fill-yellow-400" />
            Key Acquisition Center
           </h2>
           <p className="text-slate-400 text-sm mt-1">Select the platform to access direct links and tools.</p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            {Object.values(Provider).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedProvider(p)}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                  selectedProvider === p 
                    ? `bg-gradient-to-r ${PROVIDER_DATA[p].color} text-white shadow-lg` 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {p}
              </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Links and Guide */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Main Access Card */}
            <div className={`rounded-2xl p-1 bg-gradient-to-br ${providerInfo.color}`}>
                <div className="bg-slate-950 rounded-xl p-6 h-full relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${providerInfo.color} opacity-10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none`}></div>
                    
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{selectedProvider} Developer Portal</h3>
                            <p className="text-slate-400 text-sm max-w-md">
                                Directly access official pages to manage your credentials.
                            </p>
                        </div>
                        <LayoutTemplate size={32} className={`${providerInfo.iconColor} opacity-80`} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
                        <a 
                            href={providerInfo.login} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex flex-col items-center justify-center p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 rounded-lg transition-all group"
                        >
                            <ShieldCheck className="mb-2 text-slate-400 group-hover:text-white" size={24} />
                            <span className="text-sm font-semibold text-slate-200">1. Login / Sign Up</span>
                        </a>
                        <a 
                            href={providerInfo.keys} 
                            target="_blank" 
                            rel="noreferrer"
                            className={`flex flex-col items-center justify-center p-4 bg-slate-800 border-2 border-${providerInfo.iconColor.split('-')[1]}-500/30 hover:border-${providerInfo.iconColor.split('-')[1]}-500 rounded-lg transition-all group shadow-lg shadow-${providerInfo.iconColor.split('-')[1]}-500/10`}
                        >
                            <KeyRound className={`mb-2 ${providerInfo.iconColor}`} size={28} />
                            <span className="text-sm font-bold text-white">2. Generate API Key</span>
                            <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Direct Link</span>
                        </a>
                        <a 
                            href={providerInfo.billing} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex flex-col items-center justify-center p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 rounded-lg transition-all group"
                        >
                            <WalletCards className="mb-2 text-slate-400 group-hover:text-white" size={24} />
                            <span className="text-sm font-semibold text-slate-200">Check Quotas</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Step by Step */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h4 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500"/>
                    How to get your free key:
                </h4>
                <ul className="space-y-4">
                    {providerInfo.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                                    {idx + 1}
                                </div>
                                {idx < providerInfo.steps.length - 1 && (
                                    <div className="w-0.5 h-full bg-slate-800 my-1"></div>
                                )}
                            </div>
                            <p className="text-sm text-slate-300 py-0.5">{step}</p>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

        {/* RIGHT COLUMN: Tools and Deposit */}
        <div className="space-y-6">
            
            {/* Sign Up Helper */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                        <UserPlusIcon />
                        New Account Helper
                    </h3>
                    <button 
                        onClick={generateIdentity}
                        className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-colors"
                        title="Generate new data"
                    >
                        <RefreshCw size={16} className={showIdentityTools ? 'animate-spin-once' : ''} />
                    </button>
                </div>
                
                <p className="text-xs text-slate-500 mb-4">
                    Need to create a new account? Generate secure data quickly to copy and paste into the signup form.
                </p>

                {showIdentityTools ? (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                        <div className="group">
                            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Suggested Email (Gmail Alias)</label>
                            <div className="flex">
                                <code className="flex-1 bg-slate-950 border border-slate-700 rounded-l px-3 py-2 text-xs text-emerald-400 font-mono truncate">
                                    {generatedEmail}
                                </code>
                                <button 
                                    onClick={() => copyToClipboard(generatedEmail)}
                                    className="px-3 bg-slate-800 border-y border-r border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white rounded-r transition-colors"
                                >
                                    <Copy size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="group">
                            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Strong Password</label>
                            <div className="flex">
                                <code className="flex-1 bg-slate-950 border border-slate-700 rounded-l px-3 py-2 text-xs text-indigo-400 font-mono truncate">
                                    {generatedPassword}
                                </code>
                                <button 
                                    onClick={() => copyToClipboard(generatedPassword)}
                                    className="px-3 bg-slate-800 border-y border-r border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white rounded-r transition-colors"
                                >
                                    <Copy size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4 bg-slate-950/50 rounded-lg border border-dashed border-slate-800">
                        <p className="text-xs text-slate-600">Click the refresh button above to generate data.</p>
                    </div>
                )}
            </div>

            {/* Deposit Form */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <ArrowRight className="text-emerald-500" />
                    Deposit Key
                </h3>
                
                <form onSubmit={handleSave} className="space-y-4 relative z-10">
                    <div>
                        <label className="text-xs text-slate-400 block mb-1">Identifier (Label)</label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-600 text-white px-3 py-2.5 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                            value={newKeyLabel}
                            onChange={(e) => setNewKeyLabel(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 block mb-1">API Key (sk-...)</label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-3 text-slate-600" size={16} />
                            <input 
                                type="text" 
                                placeholder="Paste your key here..." 
                                className="w-full bg-slate-900 border border-slate-600 text-white pl-10 pr-3 py-2.5 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-mono text-sm transition-all"
                                value={newKeyInput}
                                onChange={(e) => setNewKeyInput(e.target.value)}
                            />
                        </div>
                    </div>
                    <button 
                        type="submit"
                        disabled={!newKeyInput}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
                    >
                        Add to Vault
                    </button>
                </form>
            </div>

        </div>
      </div>
    </div>
  );
};

// Simple icon component helper
const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
);