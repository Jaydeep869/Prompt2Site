const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const Project = require("../models/Project");

router.post("/", verifyToken, async (req, res) => {
  try {
    const { html, css, js } = req.body;
    const uid = req.uid;

    if (!html && !css && !js) {
      return res.status(400).json({ error: "Missing code data." });
    }

    const project = new Project({
      userId: uid,
      html,
      css,
      js,
    });

    await project.save();

    res.status(201).json({ message: "Code saved successfully!", projectId: project._id });
  } catch (err) {
    console.error("Error saving project:", err);
    res.status(500).json({ error: "Failed to save code." });
  }
});

module.exports = router;
