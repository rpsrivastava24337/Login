import express from "express";
import authRoutes from "./routes/auth";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api", authRoutes);

export default app;