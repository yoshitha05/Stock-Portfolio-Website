const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// GLOBAL CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/data")); 
app.use("/api/stocks", require("./routes/stocks"));
app.use("/api/portfolio", require("./routes/portfolio"));

// Connect DB
connectDB();

// Start Server
app.listen(5001, () => console.log("Server running on port 5001"));