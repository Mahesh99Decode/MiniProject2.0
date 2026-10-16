const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const weatherRoutes = require("./routes/weatherRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const soilRoutes = require("./routes/soilRoutes");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");
const visionRoutes = require("./routes/visionRoutes");
const schemeRoutes = require("./routes/schemeRoutes");

app.use("/api/weather", weatherRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/soil", soilRoutes);
app.use("/api/users", userRoutes);
app.use("/api/test", testRoutes);
app.use("/api/vision", visionRoutes);
app.use("/api/schemes", schemeRoutes);

app.get("/", (req, res) => {
  res.send("KrishiMitra API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
