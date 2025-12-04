import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { KeyCard } from './components/KeyCard';
import { Generator } from './components/Generator';
import { StatsChart } from './components/StatsChart';
import { ApiKey, Provider } from './types';
import { MOCK_KEYS } from './constants';
import { LayoutDashboard, Key, PlusCircle, LogOut, Database } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'generator'>('dashboard');
  const [keys, setKeys] = useState<ApiKey[]>([]);

  // Load state from local storage or mocks on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('llm_vault_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    const storedKeys = localStorage.getItem('llm_vault_keys');
    if (storedKeys) {
      setKeys(JSON.parse(storedKeys));
    } else {
      setKeys(MOCK_KEYS);
    }
  }, []);

  // Save keys whenever they change
  useEffect(() => {
    if (keys.length > 0) {
      localStorage.setItem('llm_vault_keys', JSON.stringify(keys));
    }
  }, [keys]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('llm_vault_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('llm_vault_auth');
  };

  const handleDeleteKey = (id: string) => {
    if (window.confirm("Are you sure you want to remove this key?")) {
      setKeys(prev => prev.filter(k => k.id !== id));
    }
  };

  const handleAddKey = (keyString: string, provider: Provider, label: string) => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      key: keyString,
      provider,
      label,
      usagePercent: 0,
      totalLimit: provider === Provider.GEMINI ? 1500 : 500, // Mock limits
      used: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setKeys(prev => [...prev, newKey]);
    setActiveTab('dashboard');
  };

  // Logic to handle "Cycle" or "Generate New" click
  const handleCycleKey = (id: string) => {
    setActiveTab('generator');
    // In a complex app, we might pre-fill the generator with the provider of the depleted key
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const totalKeys = keys.length;
  const activeKeys = keys.filter(k => k.status === 'active').length;
  const depletedKeys = keys.filter(k => k.status !== 'active').length;

  return (
    <div className="min-h-screen flex text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col hidden md:flex">
        <div className="flex items-center gap-3 mb-10 text-indigo-400">
          <Database size={28} />
          <h1 className="text-xl font-bold text-white tracking-tight">LLM Vault</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'bg-indigo-600/20 text-indigo-400 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('generator')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'generator' ? 'bg-indigo-600/20 text-indigo-400 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <PlusCircle size={20} />
            Key Farmer
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors mt-auto"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8">
        <header className="flex justify-between items-center mb-8 md:hidden">
           <div className="flex items-center gap-2 text-indigo-400">
             <Database />
             <span className="font-bold text-white">LLM Vault</span>
           </div>
           <button onClick={handleLogout} className="text-slate-500"><LogOut size={20} /></button>
        </header>

        {activeTab === 'dashboard' ? (
          <div className="space-y-8">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-slate-500 text-sm font-medium">Total Keys</h3>
                <p className="text-3xl font-bold text-white mt-2">{totalKeys}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-slate-500 text-sm font-medium">Active Resources</h3>
                <p className="text-3xl font-bold text-emerald-400 mt-2">{activeKeys}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-slate-500 text-sm font-medium">Depleted / Expired</h3>
                <p className="text-3xl font-bold text-red-400 mt-2">{depletedKeys}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Key List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Manage Keys</h2>
                  <button 
                    onClick={() => setActiveTab('generator')}
                    className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <PlusCircle size={16} /> Add New
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {keys.map(key => (
                    <KeyCard 
                      key={key.id} 
                      apiKey={key} 
                      onDelete={handleDeleteKey}
                      onRefresh={handleCycleKey}
                    />
                  ))}
                  {keys.length === 0 && (
                    <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl">
                      <Key className="mx-auto text-slate-700 mb-2" size={48} />
                      <p className="text-slate-500">No keys in the vault.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Chart Side */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4">Vault Health</h2>
                <StatsChart keys={keys} />
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                    <h4 className="text-sm font-medium text-slate-400">System Status</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      The vault is secure. Usage tracking is simulated for demonstration purposes. 
                      Real-time billing integration requires OAuth access.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Generator onAddKey={handleAddKey} availableKeys={keys} />
        )}
      </main>
    </div>
  );
};

export default App;