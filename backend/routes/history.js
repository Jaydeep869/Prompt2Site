const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const admin = require("../firebase");

router.get("/", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const projects = await Project.find({ userId }).sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    console.error("Error verifying token or fetching projects:", err.message);
    res.status(401).json({ error: "Unauthorized access or token invalid" });
  }
});

router.delete("/:id", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const deleted = await Project.findOneAndDelete({
      _id: req.params.id,
      userId
    });

    if (!deleted) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
