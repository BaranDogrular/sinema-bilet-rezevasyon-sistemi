import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    alert("Şifreler eşleşmiyor.");
    return;
  }

  const result = await register(
    formData.name,
    formData.email,
    formData.password
  );

  if (result.success) {
    navigate("/profile");
  } else {
    alert(result.message);
  }
};

  return (
    <section className="auth-page">
      <div className="container auth-page__container">
        <div className="auth-card">
          <p className="auth-card__subtitle">Yeni Hesap</p>
          <h1 className="auth-card__title">Kayıt Ol</h1>
          <p className="auth-card__text">
            Hemen hesabını oluştur ve rezervasyon deneyimine başla.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form__group">
              <label>Ad Soyad</label>
              <input
                type="text"
                name="name"
                placeholder="Adınızı girin"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-form__group">
              <label>E-posta</label>
              <input
                type="email"
                name="email"
                placeholder="ornek@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-form__group">
              <label>Şifre</label>
              <input
                type="password"
                name="password"
                placeholder="Şifre oluştur"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-form__group">
              <label>Şifre Tekrar</label>
              <input
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