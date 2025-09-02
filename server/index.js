import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import tasks from "./routes/tasks.js";

const app = express();
app.use(cors());
app.use(express.json());

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://vishro1221:K8ccCbnNxy5hoeos@cluster0.apttude.mongodb.net/inventures?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/tasks", tasks);
app.get("/health", (_, res) => res.json({ ok: true }));

app.listen(4000, () => console.log("🚀 Server running on http://localhost:4000"));
