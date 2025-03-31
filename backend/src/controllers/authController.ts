import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { uid, password } = req.body;

    if (!uid || !password) {
      return res.status(400).json({ message: "UID and password are required." });
    }

    // Find user in the database
    const user = await prisma.user.findUnique({ where: { uid } });
    if (!user) return res.status(401).json({ message: "Invalid UID or password." });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid UID or password." });

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
