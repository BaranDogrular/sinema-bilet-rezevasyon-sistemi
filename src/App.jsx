import './App.css'

const featuredMovies = [
  {
    id: 1,
    title: 'Gölgeler Þehri',
    genre: 'Bilim Kurgu • 2s 12dk',
    rating: 8.4,
  },
  {
    id: 2,
    title: 'Kum Saati',
    genre: 'Dram • 1s 58dk',
    rating: 7.9,
  },
  {
    id: 3,
    title: 'Sonsuz Hatýra',
    genre: 'Romantik • 2s 5dk',
    rating: 8.1,
  },
]

const upcomingSessions = [
  {
    id: 1,
    movie: 'Gölgeler Þehri',
    hall: 'Salon 3',
    time: '18:40',
    seats: '42/120 boþ',
  },
  {
    id: 2,
    movie: 'Kum Saati',
    hall: 'Salon 1',
    time: '20:15',
    seats: '18/90 boþ',
  },
  {
    id: 3,
    movie: 'Sonsuz Hatýra',
    hall: 'Salon 2',
    time: '21:05',
    seats: '57/110 boþ',
  },
]

function App() {
  return (
    <div className="app">
      <header className="nav">
        <div className="brand">
          <span className="brand-dot" aria-hidden="true"></span>
          <div>
            <p className="brand-title">PerdeX</p>
            <p className="brand-subtitle">Sinema Bilet Rezervasyon</p>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#filmler">Filmler</a>
          <a href="#seanslar">Seanslar</a>
          <a href="#kampanyalar">Kampanyalar</a>
          <button className="cta">Giriþ Yap</button>
        </nav>
      </header>

      <main className="hero">
        <div className="hero-text">
          <p className="eyebrow">Yeni sezon açýldý</p>
          <h1>Perdeler açýlýyor. Koltuðunu hemen ayýrt.</h1>
          <p className="lead">
            Þehir, tarih, sinema ve film seçimini tek ekranda topla. En iyi
            seansý birkaç týkla yakala.
          </p>
          <div className="hero-actions">
            <button className="primary">Bilet Bul</button>
            <button className="ghost">Kampanyalarý Gör</button>
          </div>
        </div>
        <div className="hero-panel">
          <div className="panel-header">
            <p>Hýzlý Rezervasyon</p>
            <span>2 dk içinde tamamla</span>
          </div>
          <div className="panel-grid">
            <label>
              Þehir
              <select>
                <option>Ýstanbul</option>
                <option>Ankara</option>
                <option>Ýzmir</option>
              </select>
            </label>
            <label>
              Tarih
              <input type="date" defaultValue="2026-04-16" />
            </label>
            <label>
              Sinema
              <select>
                <option>Cadde AVM</option>
                <option>DenizPark</option>
                <option>MetroPlex</option>
              </select>
            </label>
            <label>
              Film
              <select>
                <option>Gölgeler Þehri</option>
                <option>Kum Saati</option>
                <option>Sonsuz Hatýra</option>
              </select>
            </label>
          </div>
          <button className="primary wide">Seanslarý Listele</button>
          <p className="panel-note">* 09:00 - 23:30 arasý seanslar gösterilir.</p>
        </div>
      </main>

      <section id="filmler" className="section">
        <div className="section-head">
          <h2>Öne Çýkan Filmler</h2>
          <button className="ghost small">Tüm Filmler</button>
        </div>
        <div className="card-grid">
          {featuredMovies.map((movie) => (
            <article key={movie.id} className="movie-card">
              <div className="poster"></div>
              <div>
                <h3>{movie.title}</h3>
                <p>{movie.genre}</p>
              </div>
              <span className="rating">{movie.rating}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="seanslar" className="section">
        <div className="section-head">
          <h2>Yaklaþan Seanslar</h2>
          <button className="ghost small">Takvimi Aç</button>
        </div>
        <div className="session-grid">
          {upcomingSessions.map((session) => (
            <article key={session.id} className="session-card">
              <div>
                <h3>{session.movie}</h3>
                <p>
                  {session.hall} • {session.time}
                </p>
              </div>
              <p className="seats">{session.seats}</p>
              <button className="secondary">Koltuk Seç</button>
            </article>
          ))}
        </div>
      </section>

      <section id="kampanyalar" className="promo">
        <div>
          <p className="eyebrow">Özel Paket</p>
          <h2>3 bilet al, 1 mýsýr bizden.</h2>
          <p>
            Öðrenci ve aile paketleri için kampanya kodlarýný kullanarak ekstra
            indirim yakala.
          </p>
        </div>
        <button className="primary">Kampanyayý Kullan</button>
      </section>

      <footer className="footer">
        <p>PerdeX © 2026 • Demo baþlangýç arayüzü</p>
        <div className="footer-links">
          <a href="#filmler">Filmler</a>
          <a href="#seanslar">Seanslar</a>
          <a href="#kampanyalar">Kampanyalar</a>
        </div>
      </footer>
    </div>
  )
}

export default App
