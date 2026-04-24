import pool from "../config/db.js";

export const getAuthStatus = (req, res) => {
  res.json({
    message: "Auth route çalışıyor.",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Bu email ile kayıtlı kullanıcı zaten var.",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role
      `,
      [name, email, password, "user"]
    );

    res.status(201).json({
      message: "Kayıt başarılı.",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Kayıt başarısız.",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `
      SELECT id, name, email, role
      FROM users
      WHERE email = $1 AND password = $2
      `,
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Email veya şifre hatalı.",
      });
    }

    res.json({
      message: "Giriş başarılı.",
      user: result.rows[0],
      token: "test-token-123",
    });
  } catch (error) {
    res.status(500).json({
      message: "Giriş başarısız.",
      error: error.message,
    });
  }
};