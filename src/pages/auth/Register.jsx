import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Şifreler eşleşmiyor.");
      return;
    }

    const result = await register(
      formData.name,
      formData.email,
      formData.password
    );

    if (result.success) {
      toast.success("Kayıt başarılı!");
      navigate("/profile");
    } else {
      toast.error(result.message || "Kayıt başarısız.");
    }
  };

  return (
    <section className="auth-page">
      <div className="container auth-page__container">
        <div className="auth-card">
          <p className="auth-card__subtitle">Eden Cineverse</p>

          <h1 className="auth-card__title">Yeni Hesap Oluştur</h1>

          <p className="auth-card__text">
            Hesabını oluştur, vizyondaki filmleri keşfet ve koltuğunu kolayca
            ayırt.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form__group">
              <label htmlFor="name">Ad Soyad</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Adınızı girin"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-form__group">
              <label htmlFor="email">E-posta</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="ornek@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-form__group">
              <label htmlFor="password">Şifre</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Şifre oluştur"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-form__group">
              <label htmlFor="confirmPassword">Şifre Tekrar</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Şifreyi tekrar girin"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-form__button">
              Kayıt Ol
            </button>
          </form>

          <p className="auth-card__footer">
            Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;