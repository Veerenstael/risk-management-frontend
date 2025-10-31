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
const Download = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const Upload = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;
const Lock = () => <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const LogOut = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

// Login Component
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Controleer inloggegevens (hardcoded voor eenvoud)
    if (username === window.LOGIN_USERNAME && password === window.LOGIN_PASSWORD) {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
    } else {
      setError('Onjuiste gebruikersnaam of wachtwoord');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-slate-700">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-emerald-500/10 rounded-full">
              <Lock />
            </div>
          </div>
          <img src="logo-veerenstael-wit.png" alt="Veerenstael" className="h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Risk Management</h1>
          <p className="text-gray-400">Log in om toegang te krijgen</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gebruikersnaam
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Voer gebruikersnaam in"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Wachtwoord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Voer wachtwoord in"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition shadow-lg"
          >
            Inloggen
          </button>
        </form>
      </div>
    </div>
  );
}

function RiskManagementApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [risks, setRisks] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingRisk, setEditingRisk] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategorie, setFilterCategorie] = useState('all');
  const [sortBy, setSortBy] = useState('none');
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  
  const [titel, setTitel] = useState('');
  const [omschrijving, setOmschrijving] = useState('');
  const [categorie, setCategorie] = useState('extern');
  const [kans, setKans] = useState(3);
  const [impact, setImpact] = useState(3);
  const [responsstrategie, setResponsstrategie] = useState('reduceren');
  const [actiehouder, setActiehouder] = useState('');
  const [actiehouderAnders, setActiehouderAnders] = useState('');
  const [projectcode, setProjectcode] = useState('');
  const [acties, setActies] = useState('');
  const [deadline, setDeadline] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [status, setStatus] = useState('nieuw');

  // Check login status bij laden
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchRisks();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

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

  // Export functie
  const exportToExcel = () => {
    const exportData = sortedRisks.map(risk => ({
      'Risico ID': risk.riskId,
      'Titel': risk.titel,
      'Omschrijving': risk.omschrijving,
      'Categorie': risk.categorie,
      'Kans': risk.kans,
      'Impact': risk.impact,
      'Prioriteit': risk.prioriteit,
      'Responsstrategie': risk.responsstrategie,
      'Actiehouder': risk.actiehouder,
      'Projectcode': risk.projectcode || '',
      'Acties': risk.acties,
      'Deadline': new Date(risk.deadline).toLocaleDateString('nl-NL'),
      'Status': risk.status,
      'Aangemaakt': risk.aangemaakt ? new Date(risk.aangemaakt).toLocaleDateString('nl-NL') : '',
      'Laatst Bewerkt': risk.laatstBewerkt ? new Date(risk.laatstBewerkt).toLocaleDateString('nl-NL') : ''
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Risico's");
    
    const datum = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `Risicos_Export_${datum}.xlsx`);
  };

  // Import functie
  const importFromExcel = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'yyyy-mm-dd' });

        let successCount = 0;
        let errorCount = 0;

        // Functie om datum te parsen (timezone-safe)
        const parseDate = (dateStr) => {
          if (!dateStr) {
            const today = new Date();
            today.setHours(12, 0, 0, 0);
            return today.toISOString();
          }

          if (dateStr instanceof Date) {
            return dateStr.toISOString();
          }

          let parsedDate;
          
          if (dateStr.includes('-')) {
            const parts = dateStr.split('-');
            if (parts.length === 3) {
              const year = parseInt(parts[0]);
              const month = parseInt(parts[1]) - 1;
              const day = parseInt(parts[2]);
              parsedDate = new Date(year, month, day, 12, 0, 0, 0);
            }
          } else if (dateStr.includes('/')) {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
              const day = parseInt(parts[0]);
              const month = parseInt(parts[1]) - 1;
              const year = parseInt(parts[2]);
              parsedDate = new Date(year, month, day, 12, 0, 0, 0);
            }
          }

          if (parsedDate && !isNaN(parsedDate.getTime())) {
            return parsedDate.toISOString();
          }

          const today = new Date();
          today.setHours(12, 0, 0, 0);
          return today.toISOString();
        };

        for (const row of jsonData) {
          try {
            const riskData = {
              titel: row['Titel'] || '',
              omschrijving: row['Omschrijving'] || '',
              categorie: (row['Categorie'] || 'extern').toLowerCase(),
              kans: parseInt(row['Kans']) || 3,
              impact: parseInt(row['Impact']) || 3,
              prioriteit: (parseInt(row['Kans']) || 3) * (parseInt(row['Impact']) || 3),
              responsstrategie: (row['Responsstrategie'] || 'reduceren').toLowerCase(),
              actiehouder: row['Actiehouder'] || '',
              projectcode: row['Projectcode'] || '',
              acties: row['Acties'] || '',
              deadline: parseDate(row['Deadline']),
              status: (row['Status'] || 'nieuw').toLowerCase().replace(' ', ' '),
              aangemaakt: row['Aangemaakt'] ? parseDate(row['Aangemaakt']) : new Date().toISOString(),
              laatstBewerkt: row['Laatst Bewerkt'] ? parseDate(row['Laatst Bewerkt']) : new Date().toISOString()
            };

            const response = await fetch(`${API_URL}/risks`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(riskData),
            });

            if (response.ok) {
              successCount++;
            } else {
              errorCount++;
              console.error('Fout bij importeren van rij:', await response.text());
            }
          } catch (err) {
            errorCount++;
            console.error('Fout bij verwerken van rij:', err);
          }
        }

        alert(`Import voltooid!\n${successCount} risico's succesvol geïmporteerd.\n${errorCount} fouten.`);
        fetchRisks();
      } catch (error) {
        console.error('Fout bij importeren:', error);
        alert('Er is een fout opgetreden bij het importeren van het bestand.');
      } finally {
        setImporting(false);
        event.target.value = '';
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const saveRisk = async () => {
    const finalActiehouder = actiehouder === 'Anders' ? actiehouderAnders : actiehouder;

    const riskData = {
      titel,
      omschrijving,
      categorie,
      kans: parseInt(kans),
      impact: parseInt(impact),
      prioriteit: parseInt(kans) * parseInt(impact),
      responsstrategie,
      actiehouder: finalActiehouder,
      projectcode,
      acties,
      deadline: new Date(deadline).toISOString(),
      status
    };

    try {
      const url = editingRisk 
        ? `${API_URL}/risks/${editingRisk._id}`
        : `${API_URL}/risks`;
      
      const response = await fetch(url, {
        method: editingRisk ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(riskData),
      });

      if (!response.ok) {
        throw new Error('Fout bij opslaan');
      }

      await fetchRisks();
      clearForm();
      setCurrentView('dashboard');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('Er is een fout opgetreden bij het opslaan');
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
    
    const actiehouders = ['Tom Esmeijer', 'Kadir Altunal', 'Stefan Vooren', 'Mette van der Linden', 'Marijn Kuilboer', 'Peter Schasfoort', 'Jolien Boon', 'Marjolein Witteman'];
    if (actiehouders.includes(risk.actiehouder)) {
      setActiehouder(risk.actiehouder);
      setActiehouderAnders('');
    } else {
      setActiehouder('Anders');
      setActiehouderAnders(risk.actiehouder);
    }
    
    setProjectcode(risk.projectcode || '');
    setActies(risk.acties);
    setDeadline(new Date(risk.deadline).toISOString().split('T')[0]);
    setStatus(risk.status);
    setCurrentView('form');
  };

  const handleDelete = async (riskId) => {
    if (!confirm('Weet je zeker dat je dit risico wilt verwijderen?')) {
      return;
    }

    const risk = risks.find(r => r.riskId === riskId);
    if (!risk) return;

    try {
      const response = await fetch(`${API_URL}/risks/${risk._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Fout bij verwijderen');
      }

      await fetchRisks();
      alert('Risico succesvol verwijderd');
    } catch (error) {
      console.error('Error:', error);
      alert('Er is een fout opgetreden bij het verwijderen');
    }
  };

  const clearForm = () => {
    setEditingRisk(null);
    setTitel('');
    setOmschrijving('');
    setCategorie('extern');
    setKans(3);
    setImpact(3);
    setResponsstrategie('reduceren');
    setActiehouder('');
    setActiehouderAnders('');
    setProjectcode('');
    setActies('');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDeadline(tomorrow.toISOString().split('T')[0]);
    setStatus('nieuw');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'nieuw': return 'bg-blue-500 text-white';
      case 'in behandeling': return 'bg-yellow-500 text-black';
      case 'gesloten': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getCategorieColor = (cat) => {
    return cat === 'extern' ? 'bg-purple-500 text-white' : 'bg-orange-500 text-white';
  };

  const getPriorityColor = (priority) => {
    if (priority >= 15) return 'bg-red-500/20 border-red-500 text-red-400';
    if (priority >= 10) return 'bg-orange-500/20 border-orange-500 text-orange-400';
    if (priority >= 6) return 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
    return 'bg-green-500/20 border-green-500 text-green-400';
  };

  const isDeadlinePassed = (deadline) => {
    return new Date(deadline) < new Date();
  };

  const filteredRisks = risks.filter(risk => {
    if (filterStatus !== 'all' && risk.status !== filterStatus) return false;
    if (filterCategorie !== 'all' && risk.categorie !== filterCategorie) return false;
    return true;
  });

  let sortedRisks = [...filteredRisks];
  if (sortBy === 'priority-high') {
    sortedRisks.sort((a, b) => b.prioriteit - a.prioriteit);
  } else if (sortBy === 'priority-low') {
    sortedRisks.sort((a, b) => a.prioriteit - b.prioriteit);
  } else if (sortBy === 'deadline') {
    sortedRisks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }

  // Als niet ingelogd, toon login scherm
  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  // Toon de normale app
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header met uitlogknop */}
      <div className="bg-slate-800/80 backdrop-blur-sm shadow-xl border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src="logo-veerenstael-wit.png" alt="Veerenstael" className="h-10" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                Risk Management
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              <LogOut />
              Uitloggen
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <CheckCircle />
          <span className="font-semibold">Risico succesvol opgeslagen!</span>
        </div>
      )}

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-6 py-3 rounded-lg font-semibold transition shadow-lg ${
              currentView === 'dashboard'
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('overzicht')}
            className={`px-6 py-3 rounded-lg font-semibold transition shadow-lg ${
              currentView === 'overzicht'
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            Risico Overzicht
          </button>
          <button
            onClick={() => { clearForm(); setCurrentView('form'); }}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition shadow-lg flex items-center gap-2"
          >
            <Plus />
            Nieuw Risico
          </button>
        </div>

        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl shadow-xl border border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">Totaal Risico's</p>
                    <p className="text-4xl font-bold text-white">{stats.total}</p>
                  </div>
                  <div className="text-emerald-400">
                    <Activity />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl shadow-xl border border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">Nieuwe (deze maand)</p>
                    <p className="text-4xl font-bold text-white">{stats.nieuweDezeeMaand}</p>
                  </div>
                  <div className="text-blue-400">
                    <Calendar />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl shadow-xl border border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">In Behandeling</p>
                    <p className="text-4xl font-bold text-white">{stats.byStatus.inBehandeling}</p>
                  </div>
                  <div className="text-yellow-400">
                    <Clock />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl shadow-xl border border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">Gesloten</p>
                    <p className="text-4xl font-bold text-white">{stats.byStatus.gesloten}</p>
                  </div>
                  <div className="text-green-400">
                    <TrendingUp />
                  </div>
                </div>
              </div>
            </div>

            {/* Heat Map */}
            <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Risico Heat Map</h2>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  <div className="flex">
                    <div className="w-20"></div>
                    <div className="flex-1">
                      <div className="grid grid-cols-5 gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map(k => (
                          <div key={k} className="text-center text-sm font-semibold text-gray-400">
                            Kans {k}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {[5, 4, 3, 2, 1].map(impact => (
                    <div key={impact} className="flex mb-2">
                      <div className="w-20 flex items-center">
                        <span className="text-sm font-semibold text-gray-400">Impact {impact}</span>
                      </div>
                      <div className="flex-1 grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map(kans => {
                          const cell = generateHeatMapData().find(c => c.kans === kans && c.impact === impact);
                          const priority = kans * impact;
                          let bgColor = 'bg-green-500/30';
                          if (priority >= 15) bgColor = 'bg-red-500/50';
                          else if (priority >= 10) bgColor = 'bg-orange-500/50';
                          else if (priority >= 6) bgColor = 'bg-yellow-500/40';
                          
                          return (
                            <div
                              key={`${kans}-${impact}`}
                              className={`${bgColor} rounded-lg p-4 text-center border-2 border-slate-600 hover:scale-105 transition cursor-pointer`}
                            >
                              <div className="text-2xl font-bold text-white">{cell?.count || 0}</div>
                              <div className="text-xs text-gray-300 mt-1">P: {priority}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Risks */}
            <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Recente Risico's</h2>
              <div className="space-y-4">
                {risks.slice(0, 5).map((risk) => (
                  <div
                    key={risk._id}
                    className="bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-emerald-500 transition cursor-pointer"
                    onClick={() => setSelectedRisk(risk)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <span className="text-xs font-mono text-gray-400 font-semibold">{risk.riskId}</span>
                        <h3 className="text-lg font-semibold text-white mt-1">{risk.titel}</h3>
                      </div>
                      <span className={'px-3 py-1 rounded-full text-xs font-medium ' + getPriorityColor(risk.prioriteit)}>
                        P: {risk.prioriteit}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-3">{risk.omschrijving}</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className={'px-2 py-1 rounded text-xs font-medium ' + getStatusColor(risk.status)}>
                        {risk.status}
                      </span>
                      <span className={'px-2 py-1 rounded text-xs font-medium ' + getCategorieColor(risk.categorie)}>
                        {risk.categorie}
                      </span>
                      <span className="px-2 py-1 bg-slate-600 text-gray-300 rounded text-xs">
                        {risk.actiehouder}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Overzicht View */}
        {currentView === 'overzicht' && (
          <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Alle Risico's</h2>
              <div className="flex gap-3">
                <button
                  onClick={exportToExcel}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition flex items-center gap-2"
                >
                  <Download />
                  Exporteren
                </button>
                <label className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition flex items-center gap-2 cursor-pointer">
                  <Upload />
                  {importing ? 'Importeren...' : 'Importeren'}
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={importFromExcel}
                    className="hidden"
                    disabled={importing}
                  />
                </label>
              </div>
            </div>

            <div className="flex gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Alle Statussen</option>
                  <option value="nieuw">Nieuw</option>
                  <option value="in behandeling">In Behandeling</option>
                  <option value="gesloten">Gesloten</option>
                </select>
              </div>

              <select
                value={filterCategorie}
                onChange={(e) => setFilterCategorie(e.target.value)}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Alle Categorieën</option>
                <option value="extern">Extern</option>
                <option value="intern">Intern</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="none">Sorteren op...</option>
                <option value="priority-high">Prioriteit (Hoog → Laag)</option>
                <option value="priority-low">Prioriteit (Laag → Hoog)</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                <p className="text-gray-400 mt-4">Risico's laden...</p>
              </div>
            ) : sortedRisks.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle />
                <p className="text-gray-400 mt-4">Geen risico's gevonden</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedRisks.map((risk) => (
                  <div
                    key={risk._id}
                    className="bg-slate-700 p-5 rounded-lg border border-slate-600 hover:border-emerald-500 transition cursor-pointer"
                    onClick={() => setSelectedRisk(risk)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <span className="text-sm font-mono text-gray-400 font-semibold">{risk.riskId}</span>
                        <h3 className="text-xl font-bold text-white mt-1">{risk.titel}</h3>
                      </div>
                      <span className={'px-4 py-2 rounded-lg text-sm font-bold border-2 ' + getPriorityColor(risk.prioriteit)}>
                        P: {risk.prioriteit}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">{risk.omschrijving}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-400">Kans:</span>
                        <span className="ml-2 font-semibold text-white">{risk.kans}/5</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Impact:</span>
                        <span className="ml-2 font-semibold text-white">{risk.impact}/5</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Actiehouder:</span>
                        <span className="ml-2 font-semibold text-white">{risk.actiehouder}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Deadline:</span>
                        <span className={`ml-2 font-semibold ${isDeadlinePassed(risk.deadline) ? 'text-red-400' : 'text-white'}`}>
                          {new Date(risk.deadline).toLocaleDateString('nl-NL')}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <span className={'px-3 py-1 rounded-full text-xs font-medium ' + getStatusColor(risk.status)}>
                        {risk.status}
                      </span>
                      <span className={'px-3 py-1 rounded-full text-xs font-medium ' + getCategorieColor(risk.categorie)}>
                        {risk.categorie}
                      </span>
                      <span className="px-3 py-1 bg-slate-600 text-gray-300 rounded-full text-xs font-medium capitalize">
                        {risk.responsstrategie}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Form View */}
        {currentView === 'form' && (
          <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingRisk ? 'Risico Bewerken' : 'Nieuw Risico Toevoegen'}
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Titel *</label>
                  <input
                    type="text"
                    value={titel}
                    onChange={(e) => setTitel(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Korte beschrijving van het risico"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Omschrijving *</label>
                  <textarea
                    value={omschrijving}
                    onChange={(e) => setOmschrijving(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Gedetailleerde beschrijving van het risico"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Categorie *</label>
                  <select
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="extern">Extern</option>
                    <option value="intern">Intern</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status *</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="nieuw">Nieuw</option>
                    <option value="in behandeling">In Behandeling</option>
                    <option value="gesloten">Gesloten</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Kans (1-5) *</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={kans}
                    onChange={(e) => setKans(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Impact (1-5) *</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={impact}
                    onChange={(e) => setImpact(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Prioriteit (berekend)</label>
                  <div className={'w-full px-4 py-3 rounded-lg border-2 text-center font-bold text-lg ' + getPriorityColor(parseInt(kans) * parseInt(impact))}>
                    {parseInt(kans) * parseInt(impact)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Responsstrategie *</label>
                  <select
                    value={responsstrategie}
                    onChange={(e) => setResponsstrategie(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="vermijden">Vermijden</option>
                    <option value="reduceren">Reduceren</option>
                    <option value="overdragen">Overdragen</option>
                    <option value="accepteren">Accepteren</option>
                    <option value="benutten">Benutten (voor kansen)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Actiehouder *</label>
                  <select
                    value={actiehouder}
                    onChange={(e) => setActiehouder(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Selecteer actiehouder...</option>
                    <option value="Tom Esmeijer">Tom Esmeijer</option>
                    <option value="Kadir Altunal">Kadir Altunal</option>
                    <option value="Stefan Vooren">Stefan Vooren</option>
                    <option value="Mette van der Linden">Mette van der Linden</option>
                    <option value="Marijn Kuilboer">Marijn Kuilboer</option>
                    <option value="Peter Schasfoort">Peter Schasfoort</option>
                    <option value="Jolien Boon">Jolien Boon</option>
                    <option value="Marjolein Wittema">Marjolein Witteman</option>
                    <option value="Anders">Anders...</option>
                  </select>
                </div>

                {actiehouder === 'Anders' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Andere actiehouder</label>
                    <input
                      type="text"
                      value={actiehouderAnders}
                      onChange={(e) => setActiehouderAnders(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Naam actiehouder"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Projectcode (optioneel)</label>
                  <input
                    type="text"
                    value={projectcode}
                    onChange={(e) => setProjectcode(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="bijv. PROJ-2024-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Deadline *</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Acties *</label>
                  <textarea
                    value={acties}
                    onChange={(e) => setActies(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Welke acties worden ondernomen om dit risico te beheren?"
                    required
                  />
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

                {selectedRisk.projectcode && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-1">Projectcode</h3>
                    <p className="text-white font-mono">{selectedRisk.projectcode}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-1">Acties</h3>
                  <p className="text-white whitespace-pre-line">{selectedRisk.acties}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-1">Deadline</h3>
                  <p className={`font-semibold ${isDeadlinePassed(selectedRisk.deadline) ? 'text-red-400' : 'text-white'}`}>
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
