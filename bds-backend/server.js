const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
connectDB();
const app = express();
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

const authRoute = require("./routes/authRoute");
const { connect } = require("http2");
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Sever is running on port " + PORT));
