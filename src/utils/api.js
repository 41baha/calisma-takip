const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=6'

export const dersler = [
  'Matematik',
  'Fizik',
  'Kimya',
  'Biyoloji',
  'Türkçe',
  'Tarih',
  'Yazılım',
]

// API sahte Latince metin döndürdüğü için, gelen her kaydı bu Türkçe konularla eşleştirdim.
const ornekKonular = [
  { ders: 'Matematik', konu: 'Türev ve integral' },
  { ders: 'Fizik', konu: 'Newton hareket yasaları' },
  { ders: 'Kimya', konu: 'Periyodik tablo' },
  { ders: 'Biyoloji', konu: 'Hücre yapısı' },
  { ders: 'Türkçe', konu: 'Paragraf soruları' },
  { ders: 'Tarih', konu: 'Kurtuluş Savaşı' },
  { ders: 'Yazılım', konu: 'React bileşenleri' },
]

// API çalışmazsa kullanılacak örnek kayıtlar
export const ornekKayitlar = [
  { id: 1, ders: 'Matematik', konu: 'Türev', sure: 45, tarih: '2026-09-24', kaynak: 'yerel' },
  { id: 2, ders: 'Fizik', konu: 'Hareket', sure: 30, tarih: '2026-09-23', kaynak: 'yerel' },
]

// uzak API'den listeyi alıp çalışma kaydı formatına çeviriyoruz
export async function fetchStudies() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('API isteği başarısız oldu')
  const data = await res.json()

  return data.map((t) => {
    const ornek = ornekKonular[(t.id - 1) % ornekKonular.length]
    // kayıtlar son birkaç güne dağılsın
    const tarih = new Date(Date.now() - (t.id % 4) * 86400000).toLocaleDateString('en-CA')

    return {
      id: t.id,
      ders: ornek.ders,
      konu: ornek.konu,
      sure: 20 + (t.id % 5) * 10,
      tarih,
      kaynak: 'api',
    }
  })
}