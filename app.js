const { useState, useEffect } = React;
const API_URL = window.API_URL;

// Lucide Icons (simplified)
const AlertCircle = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Plus = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const Edit2 = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const Trash2 = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const Filter = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;
const Activity = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const Clock = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckCircle = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TrendingUp = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const X = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const Calendar = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;

function RiskManagementApp() {
  const [risks, setRisks] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingRisk, setEditingRisk] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategorie, setFilterCategorie] = useState('all');
  const [sortBy, setSortBy] = useState('none');
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [titel, setTitel] = useState('');
  const [omschrijving, setOmschrijving] = useState('');
  const [categorie, setCategorie] = useState('extern');
  const [kans, setKans] = useState(3);
  const [impact, setImpact] = useState(3);
  const [responsstrategie, setResponsstrategie] = useState('reduceren');
  const [actiehouder, setActiehouder] = useState('');
  const [acties, setActies] = useState('');
  const [deadline, setDeadline] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [status, setStatus] = useState('nieuw');

  useEffect(() => {
    fetchRisks();
  }, []);

  const fetchRisks = async () => {
    setLoading(true);
    try {
      console.log('Proberen te verbinden met:', `${API_URL}/risks`);
      const response = await fetch(`${API_URL}/risks`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Data ontvangen:', data);
      setRisks(data);
    } catch (error) {
      console.error('Fout bij ophalen:', error);
      alert(`Kan risicos niet ophalen: ${error.message}`);
    }
    setLoading(false);
  };

  const calculateStats = () => {
    const total = risks.length;
    const byStatus = {
      nieuw: risks.filter(r => r.status === 'nieuw').length,
      inBehandeling: risks.filter(r => r.status === 'in behandeling').length,
      gesloten: risks.filter(r => r.status === 'gesloten').length
    };
    
    // Bereken nieuwe risicos deze maand
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const nieuweDezeeMaand = risks.filter(r => {
      if (!r.aangemaakt) return false;
      const riskDate = new Date(r.aangemaakt);
      return riskDate.getMonth() === currentMonth && riskDate.getFullYear() === currentYear;
    }).length;
    
    return { total, byStatus, nieuweDezeeMaand };
  };

  const stats = calculateStats();

  // Heat map data genereren
  const generateHeatMapData = () => {
    const heatMap = [];
    for (let impact = 1; impact <= 5; impact++) {
      for (let kans = 1; kans <= 5; kans++) {
        const count = risks.filter(r => r.kans === kans && r.impact === impact).length;
        heatMap.push({ kans, impact, count });
      }
    }
    return heatMap;
  };

  const getHeatMapColor = (kans, impact) => {
    const score = kans * impact;
    if (score <= 4) return 'bg-green-400';      // 0-4: groen
    if (score <= 9) return 'bg-yellow-400';     // 5-9: geel
    if (score <= 14) return 'bg-orange-400';    // 10-14: oranje
    return 'bg-red-400';                        // 15-25: rood
  };

  const saveRisk = async () => {
    // Validatie
    if (!titel || !omschrijving || !actiehouder || !acties || !deadline) {
      alert('Vul alle verplichte velden in!');
      return;
    }

    const validKans = Math.min(5, Math.max(1, kans));
    const validImpact = Math.min(5, Math.max(1, impact));
    
    const now = new Date().toISOString();
    
    const riskData = {
      titel: titel,
      omschrijving: omschrijving,
      categorie: categorie,
      kans: validKans,
      impact: validImpact,
      responsstrategie: responsstrategie,
      actiehouder: actiehouder,
      acties: acties,
      deadline: deadline,
      status: status,
      ...(editingRisk ? { laatstBewerkt: now } : { aangemaakt: now, laatstBewerkt: now })
    };

    console.log('Versturen:', riskData);

    try {
      let response;
      if (editingRisk) {
        console.log('Updaten risico:', editingRisk._id);
        response = await fetch(`${API_URL}/risks/${editingRisk._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(riskData)
        });
      } else {
        console.log('Nieuw risico aanmaken');
        response = await fetch(`${API_URL}/risks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(riskData)
        });
      }

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response:', data);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      clearForm();
      setCurrentView('dashboard');
      fetchRisks();
    } catch (error) {
      console.error('Fout bij opslaan:', error);
      alert(`Kan risico niet opslaan: ${error.message}`);
    }
  };

  const handleEdit = (risk) => {
    setEditingRisk(risk);
    setTitel(risk.titel);
    setOmschrijving(risk.omschrijving);
    setCategorie(risk.categorie);
    setKans(risk.kans);
    setImpact(risk.impact);
    setResponsstrategie(risk.responsstrategie);
    setActiehouder(risk.actiehouder);
    setActies(risk.acties);
    setDeadline(risk.deadline.split('T')[0]);
    setStatus(risk.status);
    setCurrentView('edit');
  };

  const handleDelete = async (riskId) => {
    if (window.confirm('Weet je zeker dat je dit risico wilt verwijderen?')) {
      try {
        const risk = risks.find(r => r.riskId === riskId);
        await fetch(`${API_URL}/risks/${risk._id}`, { method: 'DELETE' });
        fetchRisks();
      } catch (error) {
        console.error('Fout bij verwijderen:', error);
        alert('Kan risico niet verwijderen');
      }
    }
  };

  const clearForm = () => {
    setTitel('');
    setOmschrijving('');
    setCategorie('extern');
    setKans(3);
    setImpact(3);
    setResponsstrategie('reduceren');
    setActiehouder('');
    setActies('');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDeadline(tomorrow.toISOString().split('T')[0]);
    setStatus('nieuw');
    setEditingRisk(null);
  };

  const getPriorityColor = (prioriteit) => {
    if (prioriteit >= 15) return 'bg-red-100 text-red-800 border-red-300';
    if (prioriteit >= 10) return 'bg-orange-100 text-orange-800 border-orange-300';
    if (prioriteit >= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-green-100 text-green-800 border-green-300';
  };

  const getStatusColor = (status) => {
    if (status === 'nieuw') return 'bg-blue-100 text-blue-800';
    if (status === 'in behandeling') return 'bg-purple-100 text-purple-800';
    if (status === 'gesloten') return 'bg-emerald-100 text-emerald-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getCategorieColor = (categorie) => {
    return categorie === 'extern' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  const filteredRisks = risks.filter(risk => {
    const statusMatch = filterStatus === 'all' || risk.status === filterStatus;
    const categorieMatch = filterCategorie === 'all' || risk.categorie === filterCategorie;
    return statusMatch && categorieMatch;
  });

  const sortedRisks = [...filteredRisks].sort((a, b) => {
    if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
    if (sortBy === 'prioriteit') return b.prioriteit - a.prioriteit;
    return 0;
  });

  const heatMapData = generateHeatMapData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
          <CheckCircle />
          <span className="font-semibold">Risico succesvol opgeslagen!</span>
        </div>
      )}
      
      <div className="bg-slate-800 shadow-xl border-b-4 border-emerald-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center gap-4 mb-6">
            <img 
              src="logo-veerenstael-wit.png" 
              alt="Veerenstael Logo" 
              className="h-20 md:h-24 w-auto"
            />
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">RISK MANAGEMENT TOOL</h2>
          </div>
          
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => { setCurrentView('dashboard'); clearForm(); }}
              className={'px-6 py-3 rounded-lg font-semibold transition-all ' + (currentView === 'dashboard' ? 'bg-slate-700 text-white border-2 border-emerald-400' : 'bg-slate-600 text-white hover:bg-slate-500 border-2 border-transparent')}
            >
              Dashboard
            </button>
            <button
              onClick={() => { setCurrentView('register'); clearForm(); }}
              className={'px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ' + (currentView === 'register' ? 'bg-emerald-500 text-white border-2 border-emerald-400' : 'bg-emerald-600 text-white hover:bg-emerald-500 border-2 border-transparent')}
            >
              <Plus />
              Nieuw Risico
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-700 p-6 rounded-xl shadow-xl border-l-4 border-emerald-400">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300 font-medium">Totaal Risico's</p>
                    <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
                  </div>
                  <Activity />
                </div>
              </div>

              <div className="bg-slate-700 p-6 rounded-xl shadow-xl border-l-4 border-blue-400">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300 font-medium">Nieuw</p>
                    <p className="text-3xl font-bold text-white mt-1">{stats.byStatus.nieuw}</p>
                  </div>
                  <Clock />
                </div>
              </div>

              <div className="bg-slate-700 p-6 rounded-xl shadow-xl border-l-4 border-green-400">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300 font-medium">Gesloten</p>
                    <p className="text-3xl font-bold text-white mt-1">{stats.byStatus.gesloten}</p>
                  </div>
                  <CheckCircle />
                </div>
              </div>

              <div className="bg-slate-700 p-6 rounded-xl shadow-xl border-l-4 border-orange-400">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300 font-medium">Nieuw deze maand</p>
                    <p className="text-3xl font-bold text-white mt-1">{stats.nieuweDezeeMaand}</p>
                  </div>
                  <Calendar />
                </div>
              </div>
            </div>

            <div className="bg-slate-700 p-4 rounded-xl shadow-xl">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter />
                  <span className="font-medium text-white">Filters & Sortering:</span>
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 bg-slate-600 border-2 border-slate-500 text-white rounded-lg">
                  <option value="all">Alle statussen</option>
                  <option value="nieuw">Nieuw</option>
                  <option value="in behandeling">In behandeling</option>
                  <option value="gesloten">Gesloten</option>
                </select>
                <select value={filterCategorie} onChange={(e) => setFilterCategorie(e.target.value)} className="px-4 py-2 bg-slate-600 border-2 border-slate-500 text-white rounded-lg">
                  <option value="all">Alle categorieen</option>
                  <option value="extern">Extern</option>
                  <option value="intern">Intern</option>
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 bg-slate-600 border-2 border-emerald-500 text-white rounded-lg">
                  <option value="none">Sorteer op...</option>
                  <option value="deadline">Deadline (vroegst eerst)</option>
                  <option value="prioriteit">Prioriteit (hoog-laag)</option>
                </select>
                {(filterStatus !== 'all' || filterCategorie !== 'all' || sortBy !== 'none') && (
                  <button onClick={() => { setFilterStatus('all'); setFilterCategorie('all'); setSortBy('none'); }} className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">
                    Reset alles
                  </button>
                )}
              </div>
            </div>

            {/* Heat Map */}
            <div className="bg-slate-700 rounded-xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Risico Heat Map</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-300 mr-4 rotate-[-90deg] origin-center">Impact</span>
                  <div className="flex flex-col gap-1">
                    {[5, 4, 3, 2, 1].map(impact => (
                      <div key={impact} className="flex items-center gap-1">
                        <span className="text-xs text-gray-300 w-3">{impact}</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(kans => {
                            const cell = heatMapData.find(d => d.kans === kans && d.impact === impact);
                            return (
                              <div 
                                key={`${kans}-${impact}`} 
                                className={`w-12 h-12 flex items-center justify-center text-xs font-bold rounded border-2 border-slate-600 ${getHeatMapColor(kans, impact)}`}
                              >
                                {cell?.count || 0}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-1 mt-2">
                      <span className="text-xs text-gray-300 w-3"></span>
                      {[1, 2, 3, 4, 5].map(kans => (
                        <span key={kans} className="text-xs text-gray-300 w-12 text-center">{kans}</span>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      <span className="text-xs text-gray-300 w-3"></span>
                      <span className="text-sm text-gray-300" style={{ marginLeft: '24px' }}>Kans</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 text-white">Laden...</div>
            ) : sortedRisks.length === 0 ? (
              <div className="bg-slate-700 rounded-xl shadow-xl p-12 text-center">
                <AlertCircle />
                <p className="text-xl text-white mb-2 mt-4">Geen risicos gevonden</p>
                <p className="text-gray-400 mb-6">Begin met het toevoegen van je eerste risico</p>
                <button onClick={() => setCurrentView('register')} className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition inline-flex items-center gap-2">
                  <Plus />
                  Nieuw Risico Toevoegen
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {sortedRisks.map((risk) => (
                  <div key={risk.riskId} className="bg-slate-700 rounded-lg shadow-lg hover:shadow-xl transition border-2 border-slate-600 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex flex-col">
                          <span className="text-xs font-mono text-gray-400 font-semibold">{risk.riskId}</span>
                          <span className={'px-2 py-1 rounded-full text-xs font-medium mt-1 text-center ' + getCategorieColor(risk.categorie)}>
                            {risk.categorie}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white">{risk.titel}</h3>
                          <p className="text-sm text-gray-300">{risk.omschrijving.substring(0, 80)}...</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={'px-2 py-1 rounded-full text-xs font-medium ' + getStatusColor(risk.status)}>
                            {risk.status}
                          </span>
                          <span className={'px-3 py-1 rounded-full text-xs font-bold border-2 ' + getPriorityColor(risk.prioriteit)}>
                            Risico: {risk.prioriteit}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">Actiehouder:</div>
                          <div className="font-medium text-white">{risk.actiehouder}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">Aangemaakt:</div>
                          <div className="font-medium text-white text-xs">
                            {risk.aangemaakt ? new Date(risk.aangemaakt).toLocaleDateString('nl-NL') : new Date(risk.createdAt).toLocaleDateString('nl-NL')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">Deadline:</div>
                          <div className="font-medium text-white">
                            {new Date(risk.deadline).toLocaleDateString('nl-NL')}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button onClick={() => setSelectedRisk(risk)} className="px-3 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition text-sm font-medium">
                          Details
                        </button>
                        <button onClick={() => handleEdit(risk)} className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition text-sm font-medium flex items-center gap-1">
                          <Edit2 />
                          Bewerk
                        </button>
                        <button onClick={() => handleDelete(risk.riskId)} className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition">
                          <Trash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {(currentView === 'register' || currentView === 'edit') && (
          <div className="bg-slate-700 rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingRisk ? 'Risico Bewerken: ' + editingRisk.riskId : 'Nieuw Risico Registreren'}
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white mb-2">Titel *</label>
                  <input type="text" required value={titel} onChange={(e) => setTitel(e.target.value)} className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 text-white rounded-lg" placeholder="Korte, duidelijke titel voor het risico" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white mb-2">Omschrijving *</label>
                  <textarea required value={omschrijving} onChange={(e) => setOmschrijving(e.target.value)} rows={4} className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 text-white rounded-lg" placeholder="Uitgebreide beschrijving..." />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Categorie *</label>
                  <select required value={categorie} onChange={(e) => setCategorie(e.target.value)} className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 text-white rounded-lg">
                    <option value="extern">Extern</option>
                    <option value="intern">Intern</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Responsstrategie *</label>
                  <select required value={responsstrategie} onChange={(e) => setResponsstrategie(e.target.value)} className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 text-white rounded-lg">
                    <option value="vermijden">Vermijden</option>
                    <option value="reduceren">Reduceren</option>
                    <option value="overdragen">Overdragen</option>
                    <option value="accepteren">Accepteren</option>
                    <option value="benutten">Benutten</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Kans (1-5) *</label>
                  <input type="number" required min="1" max="5" value={kans} onChange={(e) => setKans(Math.min(5, Math.max(1, parseInt(e.target.value) || 1)))} className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 text-white rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Impact (1-5) *</label>
                  <input type="number" required min="1" max="5" value={impact} onChange={(e) => setImpact(Math.min(5, Math.max(1, parseInt(e.target.value) || 1)))} className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 text-white rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Prioriteit (Automatisch)</label>
                  <div className={'px-4 py-3 rounded-lg font-bold text-center ' + getPriorityColor(kans * impact)}>
                    {kans * impact} (Kans × Impact)
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Status *</label>
                  <select required value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 text-white rounded-lg">
                    <option value="nieuw">Nieuw</option>
                    <option value="in behandeling">In behandeling</option>
                    <option value="gesloten">Gesloten</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Actiehouder *</label>
                  <input type="text" required value={actiehouder} onChange={(e) => setActiehouder(e.target.value)} className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 text-white rounded-lg" placeholder="Naam van verantwoordelijke persoon" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Deadline *</label>
                  <input type="date" required value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 text-white rounded-lg" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white mb-2">Acties *</label>
                  <textarea required value={acties} onChange={(e) => setActies(e.target.value)} rows={4} className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 text-white rounded-lg" placeholder="Beschrijf de acties..." />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-600">
                <button onClick={saveRisk} className="px-8 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition shadow-lg">
                  {editingRisk ? 'Risico Bijwerken' : 'Risico Opslaan'}
                </button>
                <button onClick={() => { setCurrentView('dashboard'); clearForm(); }} className="px-8 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-500 transition">
                  Annuleren
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedRisk && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRisk(null)}>
          <div className="bg-slate-700 rounded-xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto border-2 border-slate-600" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm font-mono text-gray-400 font-semibold">{selectedRisk.riskId}</span>
                  <h2 className="text-2xl font-bold text-white mt-1">{selectedRisk.titel}</h2>
                </div>
                <button onClick={() => setSelectedRisk(null)} className="p-2 hover:bg-slate-600 rounded-lg transition">
                  <X />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-1">Omschrijving</h3>
                  <p className="text-white">{selectedRisk.omschrijving}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-1">Categorie</h3>
                    <span className={'inline-block px-3 py-1 rounded-full text-sm font-medium ' + getCategorieColor(selectedRisk.categorie)}>
                      {selectedRisk.categorie}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-1">Status</h3>
                    <span className={'inline-block px-3 py-1 rounded-full text-sm font-medium ' + getStatusColor(selectedRisk.status)}>
                      {selectedRisk.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-1">Kans</h3>
                    <p className="text-2xl font-bold text-white">{selectedRisk.kans}/5</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-1">Impact</h3>
                    <p className="text-2xl font-bold text-white">{selectedRisk.impact}/5</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-1">Prioriteit</h3>
                    <span className={'inline-block px-4 py-2 rounded-lg text-xl font-bold border-2 ' + getPriorityColor(selectedRisk.prioriteit)}>
                      {selectedRisk.prioriteit}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-1">Responsstrategie</h3>
                  <p className="text-white capitalize">{selectedRisk.responsstrategie}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-1">Actiehouder</h3>
                  <p className="text-white">{selectedRisk.actiehouder}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-1">Acties</h3>
                  <p className="text-white whitespace-pre-line">{selectedRisk.acties}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-1">Deadline</h3>
                  <p className="text-white font-semibold">
                    {new Date(selectedRisk.deadline).toLocaleDateString('nl-NL', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                {selectedRisk.aangemaakt && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-1">Aangemaakt op</h3>
                    <p className="text-white">
                      {new Date(selectedRisk.aangemaakt).toLocaleDateString('nl-NL', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}

                {selectedRisk.laatstBewerkt && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-1">Laatst bewerkt</h3>
                    <p className="text-white">
                      {new Date(selectedRisk.laatstBewerkt).toLocaleDateString('nl-NL', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-600">
                  <div className="flex gap-3">
                    <button onClick={() => { const r = selectedRisk; setSelectedRisk(null); handleEdit(r); }} className="flex-1 px-4 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                      <Edit2 />
                      Bewerken
                    </button>
                    <button onClick={() => { const id = selectedRisk.riskId; setSelectedRisk(null); handleDelete(id); }} className="px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2">
                      <Trash2 />
                      Verwijderen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<RiskManagementApp />, document.getElementById('root'));
