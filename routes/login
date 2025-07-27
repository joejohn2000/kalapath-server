const express = require("express");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Missing email or password" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log("[LOGIN] User not found:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("[LOGIN] Invalid password for:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("[LOGIN] Success for:", email);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("[LOGIN] Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
