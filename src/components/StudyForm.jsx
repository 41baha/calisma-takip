import { useState } from 'react'

function StudyForm({ onAdd, onUpdate, editing, onCancel }) {
  
  const bugun = new Date().toLocaleDateString('en-CA')

  // düzenleme modundaysak formu o kayıtla doldur, değilse boş başla
  const [form, setForm] = useState(
    editing || { ders: 'Matematik', konu: '', sure: '', tarih: bugun }
  )

  // inputlar DEĞİŞİNCE FORM GÜNCELLERNİR
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault() // sayfa yenilenmesini engellediğim yer
    if (!form.konu.trim() || !form.sure) return

    const data = { ...form, konu: form.konu.trim(), sure: Number(form.sure) }

    if (editing) {
      onUpdate(data)
    } else {
      onAdd(data)
      setForm({ ...form, konu: '', sure: '' }) 
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card shadow-sm border-0 p-3">
      <h5 className="study-title mb-3">
        {editing ? 'Çalışmayı Düzenle' : 'Yeni Çalışma Ekle'}
      </h5>

      <label className="form-label">Ders</label>
      <select
        name="ders"
        value={form.ders}
        onChange={handleChange}
        className="form-select mb-3"
      >
        <option>Matematik</option>
        <option>Fizik</option>
        <option>Kimya</option>
        <option>Biyoloji</option>
        <option>Türkçe</option>
        <option>Tarih</option>
        <option>Yazılım</option>
      </select>

      <label className="form-label">Konu *</label>
      <input
        name="konu"
        value={form.konu}
        onChange={handleChange}
        className="form-control mb-3"
        placeholder="Örn: Türev"
      />

      <label className="form-label">Süre (dakika) *</label>
      <input
        name="sure"
        type="number"
        min="1"
        value={form.sure}
        onChange={handleChange}
        className="form-control mb-3"
        placeholder="Örn: 45"
      />

      <label className="form-label">Tarih</label>
      <input
        name="tarih"
        type="date"
        value={form.tarih}
        onChange={handleChange}
        className="form-control mb-3"
      />

      <div>
        <button type="submit" className="btn btn-success">
          {editing ? 'Güncelle' : 'Ekle'}
        </button>
        {editing && (
          <button
            type="button"
            className="btn btn-outline-secondary ms-2"
            onClick={onCancel}
          >
            Vazgeç
          </button>
        )}
      </div>
    </form>
  )
}

export default StudyForm