const express = require("express");
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//logger
app.use((req, res, next) => {
  console.log("----------------LOGS----------------");
  console.log("Request url:", req.url);
  console.log("Request body:", req.body);
  console.log("Request params:", req.params);
  console.log("Request Method:", req.method);
  console.log("----------------LOGS----------------");
  next();
});

//endpoints
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Home page" });
});
app.get("/about", (req, res) => {
  res.json({
    name: "Alfiya N",
    location: "Sharjah, UAE",
    email: "alfiyanijin@gmail.com",
    country: "India",
  });
});
app.get("/data", async (req, res, next) => {
  try {
    //random quotes api
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    console.log(data[0]);
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
});

//error handling
app.use((error, req, res, next) => {
  console.log("Error:", error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
});

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
