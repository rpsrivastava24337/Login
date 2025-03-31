import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/auth";
import { Router } from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const router = Router();

// Example route
router.post("/login", (req, res) => {
  res.send("Login route");
});

app.use("/api/auth", routes);
app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
