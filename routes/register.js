const express = require("express");
const bcrypt = require("bcryptjs");
const prisma = require("../utils/prisma"); // or your DB client
const { nanoid } = require("nanoid");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        id: nanoid(),
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
