import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/user/Home";
import Movies from "./pages/user/Movies";
import MovieDetail from "./pages/user/MovieDetail";
import Showtimes from "./pages/user/Showtimes";
import SeatSelection from "./pages/user/SeatSelection";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/movies/:id/showtimes" element={<Showtimes />} />
          <Route path="/booking/:showtimeId" element={<SeatSelection />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;