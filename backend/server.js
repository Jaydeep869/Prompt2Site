const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const generateRoute = require("./routes/generate");
const saveRoute = require("./routes/save");
const historyRoute = require("./routes/history");
const path = require("path");


dotenv.config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {

}).then(() => console.log("MongoDB connected"));


const app = express();
app.use(cors());

app.use(express.json());

app.use("/frontend", express.static(path.join(__dirname, "frontend")));
console.log("Running from: ", __dirname);

app.use("/api/generate", generateRoute);
app.use("/api/save", saveRoute);
app.use("/api/history", historyRoute);

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
