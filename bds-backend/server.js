const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
connectDB();
const app = express();
const allowedOrigins = ["http://localhost:3000" || "https://bds-project-dusky.vercel.app"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization","x-client-type"],
    credentials: true, // Cho phép gửi credentials (cookies, Authorization)
  })
);
app.use(express.json());

const authRoute = require("./routes/authRoute");
const { connect } = require("http2");
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Sever is running on port " + PORT));
