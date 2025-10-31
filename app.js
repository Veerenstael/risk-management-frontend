// app.js
const { useState, useEffect, useMemo } = React;
const API_URL = window.API_URL;

// ===== BASIC AUTH HELPERS =====
function makeBasicHeader(u, p) {
  return 'Basic ' + btoa(`${u}:${p}`);
}
function getAuthHeader() {
  const h = sessionStorage.getItem('basicAuth');
  return h ? { Authorization: h } : {};
}
function logoutAuth() {
  sessionStorage.removeItem('basicAuth');
  location.reload();
}

// ===== UI: simpele login overlay =====
function LoginGate({ onOk }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    const header = makeBasicHeader(u, p);
    try {
      // Proefcall
      const res = await fetch(`${API_URL}/risks`, { headers: { Authorization: header } });
      if (res.ok || res.status === 401) {
        if (res.ok) {
          sessionStorage.setItem('basicAuth', header);
          onOk();
          return;
        }
      }
      setErr('Onjuiste inloggegevens');
    } catch {
      // Server (nog) niet bereikbaar? Sla header toch op.
      sessionStorage.setItem('basicAuth', header);
      onOk();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800">
      <form onSubmit={submit} className="bg-slate-700 w-full max-w-sm p-8 rounded-xl shadow-xl border border-slate-600">
        <div className="flex items-center gap-3 mb-5 justify-center">
          <img src="logo-veerenstael-wit.png" className="h-8" alt="Veerenstael" />
          <h1 className="text-white text-xl font-bold">Inloggen</h1>
        </div>
        <label className="block text-sm text-gray-200">Gebruikersnaam</label>
        <input className="w-full mt-1 mb-3 px-3 py-2 rounded bg-slate-600 text-white border border-slate-500"
               value={u} onChange={e=>setU(e.target.value)} />
        <label className="block text-sm text-gray-200">Wachtwoord</label>
        <input type="password" className="w-full mt-1 mb-4 px-3 py-2 rounded bg-slate-600 text-white border border-slate-500"
               value={p} onChange={e=>setP(e.target.value)} />
        {err && <div className="text-red-400 text-sm mb-3">{err}</div>}
        <button className="w-full py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">Inloggen</button>
      </form>
    </div>
  );
}

// ===== API helpers =====
async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`, { headers: { ...getAuthHeader() } });
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
  return res.json();
}
async function apiJson(method, path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}`);
  return res.json();
}
async function apiDelete(path) {
  const res = await fetch(`${API_URL}${path}`, { method: 'DELETE', headers: { ...getAuthHeader() } });
  if (!res.ok) throw new Error(`DELETE ${path} -> ${res.status}`);
  return res.json();
}

// ===== Hoofdcomponent =====
function RiskManagementApp() {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({ status: 'Alle', categorie: 'Alle' });

  async function load() {
    setLoading(true);
    try {
      const data = await apiGet('/risks');
      setRisks(data);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  // Stats voor tegels
  const stats = useMemo(() => {
    const total = risks.length;
    const nieuw = risks.filter(r => (r.status || 'Nieuw') === 'Nieuw').length;
    const gesloten = risks.filter(r => (r.status || '').toLowerCase() === 'gesloten').length;
    const month = new Date().getMonth();
    const nieuwDezeMaand = risks.filter(r => new Date(r.createdAt).getMonth() === month).length;
    return { total, nieuw, gesloten, nieuwDezeMaand };
  }, [risks]);

  // Filteren
  const filtered = risks.filter(r => {
    const s = filters.status === 'Alle' || (r.status || 'Nieuw') === filters.status;
    const c = filters.categorie === 'Alle' || (r.categorie || '—') === filters.categorie;
    return s && c;
  });

  // Unieke waarden voor dropdowns
  const statusOpties = useMemo(() => ['Alle', ...Array.from(new Set(risks.map(r => r.status || 'Nieuw')))], [risks]);
  const categorieOpties = useMemo(() => ['Alle', ...Array.from(new Set(risks.map(r => r.categorie || '—')))], [risks]);

  function openNieuw() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(r) {
    setEditing(r);
    setFormOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd.entries());
    if (body.kans) body.kans = Number(body.kans);
    if (body.impact) body.impact = Number(body.impact);
    if (body.deadline) body.deadline = new Date(body.deadline);

    if (editing) {
      const upd = await apiJson('PUT', `/risks/${editing._id}`, body);
      setRisks(risks.map(r => (r._id === upd._id ? upd : r)));
    } else {
      const created = await apiJson('POST', '/risks', body);
      setRisks([created, ...risks]);
    }
    setFormOpen(false);
  }

  async function handleDelete(r) {
    if (!confirm(`Verwijder ${r.titel || r.riskId || 'dit risico'}?`)) return;
    await apiDelete(`/risks/${r._id}`);
    setRisks(risks.filter(x => x._id !== r._id));
  }

  // Export naar Excel (eenvoudig)
  function exportExcel() {
    const ws = XLSX.utils.json_to_sheet(risks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Risks');
    XLSX.writeFile(wb, 'risks.xlsx');
  }

  // Import uit Excel (expect kolomnamen gelijk aan velden)
  async function importExcel(ev) {
    const file = ev.target.files[0];
    if (!file) return;
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws);
    for (const row of rows) {
      try {
        const created = await apiJson('POST', '/risks', row);
        setRisks(prev => [created, ...prev]);
      } catch (e) {
        console.error('Import fout:', e);
      }
    }
    ev.target.value = '';
  }

  return (
    <div className="min-h-screen bg-slate-800 text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="logo-veerenstael-wit.png" className="h-8" alt="Veerenstael"/>
          <div className="text-lg font-semibold">RISK MANAGEMENT TOOL</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openNieuw} className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Nieuw Risico</button>
          <button onClick={exportExcel} className="px-3 py-2 rounded bg-slate-600 hover:bg-slate-500">Exporteren</button>
          <label className="px-3 py-2 rounded bg-slate-600 hover:bg-slate-500 cursor-pointer">
            Importeren
            <input type="file" accept=".xlsx,.xls" className="hidden" onChange={importExcel}/>
          </label>
          <button onClick={logoutAuth} className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600">Uitloggen</button>
        </div>
      </div>

      {/* Tegels */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Tile label="Totaal Risico's" value={stats.total}/>
        <Tile label="Nieuw" value={stats.nieuw}/>
        <Tile label="Gesloten" value={stats.gesloten}/>
        <Tile label="Nieuw deze maand" value={stats.nieuwDezeMaand}/>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mt-6 bg-slate-700/60 border border-slate-600 rounded-xl p-4 flex flex-wrap gap-3">
        <div>
          <div className="text-sm text-gray-300">Status</div>
          <select value={filters.status} onChange={e=>setFilters(f=>({...f, status:e.target.value}))}
                  className="bg-slate-700 border border-slate-500 rounded px-3 py-2">
            {statusOpties.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <div className="text-sm text-gray-300">Categorie</div>
          <select value={filters.categorie} onChange={e=>setFilters(f=>({...f, categorie:e.target.value}))}
                  className="bg-slate-700 border border-slate-500 rounded px-3 py-2">
            {categorieOpties.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Lijst */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="bg-slate-700/60 border border-slate-600 rounded-xl">
          {loading ? (
            <div className="p-6">Laden…</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-gray-300">Geen risico’s gevonden</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-gray-300">
                <tr>
                  <th className="p-3">RiskId</th>
                  <th className="p-3">Titel</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Categorie</th>
                  <th className="p-3">Kans</th>
                  <th className="p-3">Impact</th>
                  <th className="p-3 w-32">Acties</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r._id} className="border-t border-slate-600/70">
                    <td className="p-3">{r.riskId || '—'}</td>
                    <td className="p-3">{r.titel || '—'}</td>
                    <td className="p-3">{r.status || 'Nieuw'}</td>
                    <td className="p-3">{r.categorie || '—'}</td>
                    <td className="p-3">{r.kans ?? '—'}</td>
                    <td className="p-3">{r.impact ?? '—'}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={()=>openEdit(r)} className="px-2 py-1 rounded bg-slate-600 hover:bg-slate-500">Bewerken</button>
                        <button onClick={()=>handleDelete(r)} className="px-2 py-1 rounded bg-red-600 hover:bg-red-500">Verwijder</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal form */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-700 w-full max-w-2xl rounded-xl border border-slate-600 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 text-lg font-semibold mb-2">Risico {editing?.riskId ? `– ${editing.riskId}` : ''}</div>

            <Field label="Titel" name="titel" defaultValue={editing?.titel}/>
            <Field label="Beschrijving" name="beschrijving" defaultValue={editing?.beschrijving} textarea/>
            <Field label="Status" name="status" defaultValue={editing?.status || 'Nieuw'}/>
            <Field label="Categorie" name="categorie" defaultValue={editing?.categorie}/>
            <Field label="Strategie" name="strategie" defaultValue={editing?.strategie}/>
            <Field label="Eigenaar" name="eigenaar" defaultValue={editing?.eigenaar}/>
            <Field label="Kans (1-5)" name="kans" type="number" min="1" max="5" defaultValue={editing?.kans}/>
            <Field label="Impact (1-5)" name="impact" type="number" min="1" max="5" defaultValue={editing?.impact}/>
            <Field label="Deadline" name="deadline" type="date" defaultValue={editing?.deadline ? new Date(editing.deadline).toISOString().slice(0,10) : ''}/>
            <Field label="Opmerkingen" name="opmerkingen" defaultValue={editing?.opmerkingen} textarea/>

            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              <button type="button" onClick={()=>setFormOpen(false)} className="px-3 py-2 rounded bg-slate-600 hover:bg-slate-500">Annuleren</button>
              <button className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500">{editing ? 'Opslaan' : 'Aanmaken'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// Kleine hulpelementen
function Tile({ label, value }) {
  return (
    <div className="bg-slate-700/60 border border-slate-600 rounded-xl p-4">
      <div className="text-gray-300 text-sm">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
function Field({ label, name, textarea, ...rest }) {
  return (
    <label className="block">
      <div className="text-sm text-gray-300 mb-1">{label}</div>
      {textarea ? (
        <textarea name={name} className="w-full h-24 px-3 py-2 rounded bg-slate-600 text-white border border-slate-500" {...rest} />
      ) : (
        <input name={name} className="w-full px-3 py-2 rounded bg-slate-600 text-white border border-slate-500" {...rest} />
      )}
    </label>
  );
}

// App entry: Login of App
function AppWithAuth() {
  const [ok, setOk] = useState(!!sessionStorage.getItem('basicAuth'));
  return ok ? <RiskManagementApp/> : <LoginGate onOk={()=>setOk(true)}/>;
}

ReactDOM.render(<AppWithAuth />, document.getElementById('root'));
