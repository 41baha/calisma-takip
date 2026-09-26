import { useState, useEffect } from 'react'
import StudyForm from '../components/StudyForm'
import StudyList from '../components/StudyList'
import { dersler, fetchStudies, ornekKayitlar } from '../utils/api'

const STORAGE_KEY = 'calisma-takip-kayitlar'

// dakikayı "1 sa 20 dk" şeklinde yazdırır
function formatDuration(min) {
  const saat = Math.floor(min / 60)
  const dk = min % 60
  return saat > 0 ? `${saat} sa ${dk} dk` : `${dk} dk`
}

function Home() {
  const [studies, setStudies] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  
  const [loading, setLoading] = useState(() => !localStorage.getItem(STORAGE_KEY))
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [dersFilter, setDersFilter] = useState('Hepsi')

  // uzak API'den liste verisini al
  useEffect(() => {
    if (!loading) return

    fetchStudies()
      .then((data) => {
        setStudies(data)
        setError('')
      })
      .catch(() => {
        setStudies(ornekKayitlar)
        setError("API'ye ulaşılamadı, örnek kayıtlar yüklendi.")
      })
      .finally(() => setLoading(false))
  }, [loading])

  // liste değişince localStorage'a kaydet 
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(studies))
    }
  }, [studies, loading])

  function addStudy(data) {
    setStudies([{ ...data, id: Date.now(), kaynak: 'yerel' }, ...studies])
  }

  function updateStudy(data) {
    setStudies(studies.map((s) => (s.id === data.id ? data : s)))
    setEditing(null)
  }

  function deleteStudy(id) {
    setStudies(studies.filter((s) => s.id !== id))
    if (editing && editing.id === id) setEditing(null)
  }

  function reloadFromApi() {
    if (!window.confirm("Tüm kayıtlar silinip API'den yeniden yüklenecek. Emin misin?")) return
    localStorage.removeItem(STORAGE_KEY)
    setEditing(null)
    setLoading(true)
  }

  // üstteki kutular için hesaplamalar
  const bugun = new Date().toLocaleDateString('en-CA')
  const totalMinutes = studies.reduce((sum, s) => sum + s.sure, 0)
  const todayMinutes = studies
    .filter((s) => s.tarih === bugun)
    .reduce((sum, s) => sum + s.sure, 0)
  const courseCount = new Set(studies.map((s) => s.ders)).size

  const stats = [
    { label: 'Toplam Kayıt', value: studies.length },
    { label: 'Toplam Süre', value: formatDuration(totalMinutes) },
    { label: 'Bugünkü Süre', value: formatDuration(todayMinutes) },
    { label: 'Farklı Ders', value: courseCount },
  ]

  // arama ve ders filtresine göre listeyi süz
  const filtered = studies.filter(
    (s) =>
      (dersFilter === 'Hepsi' || s.ders === dersFilter) &&
      s.konu.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="header-gradient text-white text-center rounded-4 p-4 mb-4">
        <h1 className="h2 mb-1">Çalışma Takip</h1>
        <p className="mb-0">Günlük çalışmalarını kaydet, sürelerini takip et</p>
        <button className="btn btn-light btn-sm mt-3" onClick={reloadFromApi}>
          API'den yeniden yükle
        </button>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((item) => (
          <div className="col-6 col-md-3" key={item.label}>
            <div className="card shadow-sm border-0 text-center p-3">
              <div className="fs-4 fw-bold stat-number">{item.value}</div>
              <div className="text-muted small">{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          {/* key değişince form sıfırdan kurulur, düzenlenen kayıtla dolar */}
          <StudyForm
            key={editing ? editing.id : 'yeni'}
            onAdd={addStudy}
            onUpdate={updateStudy}
            editing={editing}
            onCancel={() => setEditing(null)}
          />
        </div>

        <div className="col-lg-8">
          <div className="row g-2 mb-3">
            <div className="col-8">
              <input
                className="form-control"
                placeholder="Konuda ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-4">
              <select
                className="form-select"
                value={dersFilter}
                onChange={(e) => setDersFilter(e.target.value)}
              >
                <option>Hepsi</option>
                {dersler.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <div className="alert alert-warning">{error}</div>}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" />
              <p className="mt-2 text-muted">Veriler API'den yükleniyor...</p>
            </div>
          ) : (
            <StudyList
              studies={filtered}
              onEdit={setEditing}
              onDelete={deleteStudy}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home