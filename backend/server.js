const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

// JWT Secret
const SECRET = "MY_SUPER_SECRET_KEY";

// File upload settings (JPEG/PDF)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, cb) {
    const allowed = ["image/jpeg", "application/pdf"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPEG or PDF allowed"));
    }
    cb(null, true);
  },
});

// ------------------ LOGIN API ------------------
app.post("/login", (req, res) => {
  // For assignment, we return a token without credentials
  const token = jwt.sign({ user: "test-user" }, SECRET, { expiresIn: "2h" });

  return res.json({
    success: true,
    token,
  });
});

// ------------------ FORM SUBMIT API ------------------
app.post("/submit-form", upload.single("file"), (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Token missing" });

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, SECRET);

    return res.json({
      success: true,
      data: {
        ...req.body,
        fileName: req.file ? req.file.originalname : null,
      },
    });
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

// ------------------ START SERVER ------------------
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
