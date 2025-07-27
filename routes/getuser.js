import { getServerSession } from "next-auth/next";
import { authOptions } from "@/path/to/authOptions"; // your NextAuth options
import prisma from "@/utils/db";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true, email: true, name: true },
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
}
module.exports = router;
