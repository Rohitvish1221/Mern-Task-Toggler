import { Router } from "express";
import Task from "../models/Task.js";
const r = Router();
r.get("/", async (_, res) =>
  res.json(
    await Task.find().sort({
      createdAt: -1,
    })
  )
);
r.post("/", async (req, res) => {
  const t = await Task.create({ title: (req.body.title || "").trim() });
  res.status(201).json(t);
});
r.patch("/:id/toggle", async (req, res) => {
  const t = await Task.findById(req.params.id);
  if (!t) return res.status(404).json({ error: "Not found" });
  t.done = !t.done;
  await t.save();
  res.json(t);
});
r.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});
export default r;
