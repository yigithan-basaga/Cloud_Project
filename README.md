# Görev Takip Sistemi

Bu proje, Bulut Bilişim dersi için hazırlanmış iki katmanlı bir görev takip uygulamasıdır. Sistem; görev ekleme, listeleme, güncelleme, silme ve tamamlanma durumunu değiştirme işlemlerini destekler. Backend tarafında Express REST API, verilerin kalıcı tutulması için SQLite veritabanı; frontend tarafında ise React ve Vite kullanılmıştır.

## Proje Amacı

Bu uygulamanın amacı, temel bir full stack web uygulamasının nasıl kurulduğunu öğrenci seviyesinde anlaşılır bir yapıyla göstermektir. Projede istemci-sunucu haberleşmesi, REST API mantığı, veritabanı kullanımı ve React ile arayüz geliştirme birlikte ele alınmıştır.

## Kullanılan Teknolojiler

* Node.js
* Express.js
* SQLite
* React
* Vite
* CORS
* JSON middleware
* AWS (EC2, S3)

## Temel Özellikler

* Görevleri listeleme
* Yeni görev ekleme
* Görev düzenleme
* Görev silme
* Görevi tamamlandı / tamamlanmadı olarak işaretleme
* Boş veya çok kısa görev girişini engelleyen form doğrulaması
* Başarı, bilgi ve hata mesajları gösterme
* Component tabanlı frontend mimarisi

## Klasör Yapısı

```text
BULUT/
├─ backend/
│  ├─ db.js
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ package.json
│  ├─ vite.config.js
│  ├─ index.html
│  └─ src/
│     ├─ App.jsx
│     ├─ styles.css
│     ├─ components/
│     │  ├─ Header.jsx
│     │  ├─ StatusMessage.jsx
│     │  ├─ TaskForm.jsx
│     │  ├─ TaskItem.jsx
│     │  └─ TaskList.jsx
│     └─ services/
│        └─ taskService.js
└─ README.md
```

## Backend Detayları

Backend klasörü içinde Node.js ve Express ile bir REST API bulunmaktadır. Uygulama açıldığında `tasks.db` adlı SQLite veritabanı dosyası otomatik oluşturulur ve `tasks` tablosu hazırlanır.

### Veritabanı Alanları

* `id`: Otomatik artan görev kimliği
* `title`: Görev başlığı
* `completed`: Tamamlanma durumu
* `created_at`: Oluşturulma tarihi

### API Endpointleri

* `GET /tasks` → Tüm görevleri listeler
* `POST /tasks` → Yeni görev ekler
* `PUT /tasks/:id` → Görev günceller
* `DELETE /tasks/:id` → Görev siler

## Frontend Detayları

Frontend klasörü içinde React ve Vite kullanılarak hazırlanmış arayüz bulunmaktadır.

Arayüz özellikleri:

* Görev ekleme formu
* Görev listesi
* Tamamlanma checkbox
* Düzenleme ve silme işlemleri
* Başarı ve hata mesajları
* Responsive (mobil uyumlu) tasarım

## Kurulum Adımları

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Çalıştırma

### Backend

```bash
cd backend
npm start
```

Backend varsayılan olarak şu adreste çalışır:

```text
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm run dev
```

Frontend şu adreste çalışır:

```text
http://localhost:5173
```

---

# AWS Üzerinde Deployment

Bu proje AWS kullanılarak iki katmanlı mimari ile deploy edilmiştir.

## Backend (EC2)

* Ubuntu tabanlı EC2 instance kullanılmıştır
* Proje GitHub üzerinden clone edilmiştir
* Node.js kurulumu yapılmıştır
* Backend, PM2 kullanılarak sürekli çalışır hale getirilmiştir

Çalıştırma komutu:

```bash
pm2 start server.js --name "Han's TM"
```

## Frontend (S3)

* React uygulaması production build alınmıştır:

```bash
npm run build
```

* Oluşan `dist` klasörü S3 bucket içine yüklenmiştir
* Static website hosting aktif edilmiştir

## Frontend - Backend Bağlantısı

Frontend tarafında:

```text
VITE_API_BASE_URL=http://51.21.218.27:5000
```

Backend tarafında:

```text
CLIENT_ORIGIN=http://to-do.frontend.s3-website.eu-north-1.amazonaws.com
```

## Sistem Mimarisi

```text
S3 (Frontend) → HTTP → EC2 (Backend) → SQLite (Veritabanı)
```

## Sonuç

* Frontend ve backend başarıyla entegre edilmiştir
* AWS üzerinde çalışır hale getirilmiştir
* Tüm CRUD işlemleri sorunsuz şekilde gerçekleştirilmektedir
