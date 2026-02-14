import express, { Application, Request, Response, NextFunction } from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import routes from "./routes";

const app: Application = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/online_shop";

// 🔥 CORS з cookies
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// 🔥 Парсер cookies
app.use(cookieParser());

// JSON
app.use(express.json());

// Static
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api", routes);

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Global error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Internal server error" });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Підключено до MongoDB");

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB помилка:", err);
    process.exit(1);
  }
}

start();
