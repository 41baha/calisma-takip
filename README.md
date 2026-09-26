# Çalışma Takip

Günlük ders çalışmalarını kaydetmek ve takip etmek için geliştirilmiş bir React uygulamasıdır. Web Geliştirme; JavaScript eğitimi proje ödevi olarak hazırlanmıştır.

## Özellikler
- Çalışma ekleme (ders, konu, süre, tarih)
- Çalışmaları kart şeklinde listeleme
- Kayıt güncelleme
- Kayıt silme
- İlk açılışta örnek veri uzak API'den (JSONPlaceholder) alınır ve localStorage'a kaydedilir
- Kayıtlar tarayıcıda (localStorage) saklanır, sayfa yenilenince kaybolmaz
- Konuda arama ve derse göre filtreleme
- Toplam kayıt, toplam süre, bugünkü süre ve farklı ders sayısını gösteren özet kutuları
- "API'den yeniden yükle" butonu ile örnek verilere geri dönme

Not: JSONPlaceholder sahte bir test API'sidir. Ondan gelen kayıtlar uygulamaya uyarlanarak ders ve konu bilgisiyle eşleştirilmiştir.

## Kullanılan Teknolojiler
- React (Vite ile kuruldu)
- Bootstrap 5
- localStorage
- fetch ile uzak API isteği

## Kurulum
1. Proje indirilir: `git clone https://github.com/41baha/calisma-takip.git`
2. Proje klasörüne girilir: `cd calisma-takip`
3. Paketler kurulur: `npm install`
4. Uygulama başlatılır: `npm run dev`
5. Tarayıcıda `http://localhost:5173` adresi açılır

## Klasör Yapısı
- `src/components`: StudyForm ve StudyList bileşenleri
- `src/pages`: Home sayfası
- `src/utils`: API isteğini yapan `api.js`
- `src/main.jsx`: uygulamanın başlangıç noktası

## Canlı Demo
Netlify linki: (yayına alınca buraya eklenecek)