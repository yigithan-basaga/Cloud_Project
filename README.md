# Gorev Takip Sistemi

Bu proje, bulut bilisim dersi icin hazirlanmis iki katmanli bir gorev takip uygulamasidir. Sistem; gorev ekleme, listeleme, guncelleme, silme ve tamamlanma durumunu degistirme islemlerini destekler. Backend tarafinda Express REST API, verilerin kalici tutulmasi icin SQLite veritabani; frontend tarafinda ise React ve Vite kullanilmistir.

## Proje Amaci

Bu uygulamanin amaci, temel bir full stack web uygulamasinin nasil kuruldugunu ogrenci seviyesinde anlasilir bir yapiyla gostermektir. Projede istemci-sunucu haberlesmesi, REST API mantigi, veritabani kullanimi ve React ile arayuz gelistirme birlikte ele alinmistir.

## Kullanilan Teknolojiler

- Node.js
- Express.js
- SQLite
- React
- Vite
- CORS
- JSON middleware

## Temel Ozellikler

- Gorevleri listeleme
- Yeni gorev ekleme
- Gorev duzenleme
- Gorev silme
- Gorevi tamamlandi veya tamamlanmadi olarak isaretleme
- Bos veya cok kisa gorev girisini engelleyen form dogrulamasi
- Basari, bilgi ve hata mesajlari gosterme
- Daha duzenli kod yapisi icin component tabanli frontend mimarisi

## Klasor Yapisi

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

## Backend Detaylari

Backend klasoru icinde Node.js ve Express ile bir REST API bulunur. Uygulama acildiginda `tasks.db` adli SQLite veritabani dosyasi otomatik olusur ve `tasks` tablosu hazirlanir.

`tasks` tablosunda su alanlar bulunur:

- `id`: Otomatik artan benzersiz gorev kimligi
- `title`: Gorev basligi
- `completed`: Gorevin tamamlanma durumu
- `created_at`: Gorevin olusturulma tarihi

### API Endpointleri

- `GET /tasks`: Tum gorevleri listeler
- `POST /tasks`: Yeni gorev ekler
- `PUT /tasks/:id`: Mevcut gorevi gunceller
- `DELETE /tasks/:id`: Gorevi siler

## Frontend Detaylari

Frontend klasoru icinde React ve Vite kullanilarak hazirlanmis arayuz bulunur. Arayuzde:

- Yeni gorev ekleme formu
- Gorev listesi
- Tamamlandi durumu icin checkbox
- Duzenleme ve silme butonlari
- Duruma gore basari ve hata bildirimleri
- Mobil ekranda da duzgun gorunen responsive tasarim

## Kurulum Adimlari

Asagidaki adimlar `cmd` terminal icin uygundur:

### 1. Backend bagimliliklarini kurun

```cmd
cd C:\Users\Asus\Desktop\BULUT\backend
npm install
```

### 2. Frontend bagimliliklarini kurun

```cmd
cd C:\Users\Asus\Desktop\BULUT\frontend
npm install
```

## Calistirma Adimlari

### 1. Backend sunucusunu baslatin

```cmd
cd C:\Users\Asus\Desktop\BULUT\backend
npm start
```

Backend varsayilan olarak `http://localhost:5000` adresinde calisir.

### 2. Frontend gelistirme sunucusunu baslatin

Yeni bir `cmd` penceresi acin ve su komutlari calistirin:

```cmd
cd C:\Users\Asus\Desktop\BULUT\frontend
npm run dev
```

Frontend varsayilan olarak `http://localhost:5173` adresinde calisir.

### 3. Uygulamayi tarayicida acin

Tarayicidan su adrese gidin:

```text
http://localhost:5173
```

## Ornek Kullanim Senaryosu

1. Uygulamayi acin.
2. "Yeni Gorev Ekle" alanina bir gorev yazin.
3. `Gorev Ekle` butonuna basin.
4. Eklenen gorevi listede gorun.
5. Gorevi duzenlemek icin `Duzenle` butonunu kullanin.
6. Gorevi tamamlamak icin checkbox isaretleyin.
7. Gerekiyorsa `Sil` butonu ile gorevi kaldirin.

## Notlar

- Backend calistiginda SQLite veritabani dosyasi backend klasoru icinde olusur.
- Frontend, API isteklerini `http://localhost:5000/tasks` adresine gonderir.
- Eger backend calismiyorsa frontend tarafinda hata mesaji gorunur.
- Hem frontend hem backend ayni anda acik olmadan uygulama tam olarak calismaz.

## Deploy Oncesi Ortam Degiskenleri

AWS veya benzeri bir sunucuya cikmadan once uygulamanin ortam degiskenleri ile calismasi gerekir.

### Backend

`backend/.env.example` dosyasini temel alin:

```text
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

- `PORT`: Sunucunun dinleyecegi port
- `CLIENT_ORIGIN`: CORS icin izin verilecek frontend adresi

### Frontend

`frontend/.env.example` dosyasini temel alin:

```text
VITE_API_BASE_URL=http://localhost:5000
```

- `VITE_API_BASE_URL`: Frontend'in baglanacagi backend adresi

Ornek production degeri:

```text
VITE_API_BASE_URL=http://EC2_PUBLIC_IP:5000
```
