const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

app.use(cookieParser()); // Required for handling cookies

// ✅ CORS Configuration - Fix the issue
app.use(
  cors({
    origin: "http://localhost:3002", // ✅ Allow only your frontend
    credentials: true,  // ✅ Allow credentials (cookies, authentication headers)
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allowed headers
  })
);

// ✅ Ensure Preflight (OPTIONS) Requests are Handled
app.options("*", cors({
  origin: "http://localhost:3001",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ✅ Routes
const userRoute = require('./routers/router');
app.use('/api/v1/users', userRoute);

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(3001, () => {
  console.log(`Server running on port`);
});

module.exports = app;
