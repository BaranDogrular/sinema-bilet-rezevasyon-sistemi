import movies from "../../data/movies";
import "./Admin.css";

const AdminMovies = () => {
  return (
    <section className="admin-page">
      <div className="container">
        <div className="admin-page__header admin-page__header--row">
          <div>
            <p className="admin-page__subtitle">Film Yönetimi</p>
            <h1 className="admin-page__title">Filmler</h1>
          </div>

          <button className="admin-page__action-btn">Yeni Film Ekle</button>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Film Adı</th>
                <th>Tür</th>
                <th>Süre</th>
                <th>Puan</th>
                <th>İşlemler</th>
              </tr>
            </thead>

            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.duration}</td>
                  <td>{movie.rating}</td>
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

export default AdminMovies;