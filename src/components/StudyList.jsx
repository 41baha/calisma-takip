// her ders için bir rozet rengi
const renkler = {
  Matematik: 'primary',
  Fizik: 'info',
  Kimya: 'warning',
  Biyoloji: 'success',
  Türkçe: 'danger',
  Tarih: 'secondary',
  Yazılım: 'dark',
}

function StudyList({ studies, onEdit, onDelete }) {
  // gösterilecek kayıt yoksa bu mesajı göster
  if (studies.length === 0) {
    return <p className="text-muted">Gösterilecek çalışma kaydı yok.</p>
  }

  function handleDelete(id) {
    if (window.confirm('Bu kaydı silmek istediğine emin misin?')) {
      onDelete(id)
    }
  }

  return (
    <div className="d-flex flex-column gap-3">
      {studies.map((s) => (
        <div key={s.id} className="card shadow-sm border-0">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="study-title mb-1">{s.konu}</h5>
              <div className="mb-1">
                <span className={`badge text-bg-${renkler[s.ders] || 'secondary'} me-2`}>
                  {s.ders}
                </span>
                {s.kaynak === 'api' && (
                  <span className="badge bg-light text-secondary border">API</span>
                )}
              </div>
              <small className="text-muted">
                {s.sure} dk - {s.tarih}
              </small>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => onEdit(s)}
              >
                Düzenle
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(s.id)}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StudyList