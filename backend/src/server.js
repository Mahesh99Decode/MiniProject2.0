const express = require("express");
<<<<<<< HEAD
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();
=======
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

// Load .env from backend directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { connectDB } = require("../database");
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a

connectDB();
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const weatherRoutes = require("./routes/weatherRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const soilRoutes = require("./routes/soilRoutes");
const userRoutes = require("./routes/userRoutes");
<<<<<<< HEAD
const testRoutes = require("./routes/testRoutes");
const visionRoutes = require("./routes/visionRoutes");
const schemeRoutes = require("./routes/schemeRoutes");
=======
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const visionRoutes = require("./routes/visionRoutes");
const schemeRoutes = require("./routes/schemeRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const alertRoutes = require("./routes/alertRoutes");
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a

app.use("/api/weather", weatherRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/soil", soilRoutes);
app.use("/api/users", userRoutes);
<<<<<<< HEAD
app.use("/api/test", testRoutes);
app.use("/api/vision", visionRoutes);
app.use("/api/schemes", schemeRoutes);
=======
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/vision", visionRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/alerts", alertRoutes);
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a

app.get("/", (req, res) => {
  res.send("KrishiMitra API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
