import showtimes from "../../data/showtimes";
import movies from "../../data/movies";
import "./Admin.css";

const AdminShowtimes = () => {
  const getMovieTitle = (movieId) => {
    const movie = movies.find((item) => item.id === movieId);
    return movie ? movie.title : "Bilinmiyor";
  };

  return (
    <section className="admin-page">
      <div className="container">
        <div className="admin-page__header admin-page__header--row">
          <div>
            <p className="admin-page__subtitle">Seans Yönetimi</p>
            <h1 className="admin-page__title">Seanslar</h1>
          </div>

          <button className="admin-page__action-btn">Yeni Seans Ekle</button>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Film</th>
                <th>Tarih</th>
                <th>Saat</th>
                <th>Salon</th>
                <th>Format</th>
                <th>Fiyat</th>
                <th>İşlemler</th>
              </tr>
            </thead>

            <tbody>
              {showtimes.map((showtime) => (
                <tr key={showtime.id}>
                  <td>{showtime.id}</td>
                  <td>{getMovieTitle(showtime.movieId)}</td>
                  <td>{showtime.date}</td>
                  <td>{showtime.time}</td>
                  <td>{showtime.hall}</td>
                  <td>{showtime.format}</td>
                  <td>{showtime.price} ₺</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-btn admin-btn--edit">Düzenle</button>
                      <button className="admin-btn admin-btn--delete">Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminShowtimes;