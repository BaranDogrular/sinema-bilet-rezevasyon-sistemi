import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/user/Home";
import Movies from "./pages/user/Movies";
import MovieDetail from "./pages/user/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;