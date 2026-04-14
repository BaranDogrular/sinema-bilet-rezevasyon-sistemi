import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />

      <main className="layout__main">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;