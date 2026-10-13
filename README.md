# gezicilabs.github.io

Gezicilabs'ın uygulama tanıtım sitesi. [Astro](https://astro.build) ile yapıldı, GitHub Pages'te yayınlanır.

- Türkçe: `/`, İngilizce: `/en/`
- Her uygulamanın kendi sayfası (`/apps/<ad>/`) ve gizlilik politikası (`/apps/<ad>/privacy/`) var.
  Google Play'e gizlilik politikası adresi olarak bu sayfayı verebilirsin.
- Gündüz/gece modu: ziyaretçinin saatine göre 19:00–07:00 arası gece. Elle seçim tarayıcıda saklanır,
  "Otomatik" düğmesi saate göre moda geri döndürür.

## Çalıştırma

```sh
npm install
npm run dev      # http://localhost:4321 (taslak uygulamalar da görünür)
npm run build    # dist/ klasörüne canlı sürümü üretir
npm run check    # tip kontrolü
```

## Yeni uygulama eklemek

1. `src/content/apps/ornek-uygulama.yaml` dosyasını kopyala, örneğin `src/content/apps/hava-durumu.yaml`.
   Dosya adı sayfa adresini belirler: `/apps/hava-durumu/`.
2. Alanları doldur (ad, açıklamalar, Play linki, sürüm…). Hazır olunca `draft: true` satırını sil.
3. İkon ve ekran görüntülerini `public/apps/hava-durumu/` içine koy ve YAML'da `/apps/hava-durumu/icon.png` gibi yaz.
4. Gizlilik politikası için `src/content/privacy/hava-durumu/tr.md` ve `en.md` dosyalarını ekle
   (`src/content/privacy/ornek-uygulama/` örneğini kopyalayabilirsin).
5. `main` dalına gönder. Site birkaç dakika içinde kendini günceller.

## Genel ayarlar

`src/site.ts`: iletişim e-postası, Google Play geliştirici sayfası ve GitHub linki. Boş bırakılanlar sitede gizlenir.
Sitedeki metinler (iki dilde): `src/i18n/ui.ts`.

## Yayın

`main` dalına her gönderimde `.github/workflows/deploy.yml` siteyi derleyip GitHub Pages'e yükler.
Bir kerelik ayar: GitHub'da **Settings → Pages → Build and deployment → Source: GitHub Actions** seçilmeli.
