const express = require("express");
const router = express.Router();
const { generateCode } = require("../controllers/aiControllers");

router.post("/", generateCode);

module.exports = router;
