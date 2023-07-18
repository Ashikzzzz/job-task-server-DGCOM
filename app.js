const express = require("express");
const app = express();
const cors = require("cors");

// import necessery routes 
const userRoute = require("./routes/user.route")
const imageRoute = require("./routes/image.route")

// middleware
app.use(express.json());
app.use(cors());


// using user routes
app.use("/api/v1/users",userRoute)

// using image route 
app.use("/api/v1/image",imageRoute)

// ---------- Happy Server ----------
app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
})

module.exports = app;