const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
require("dotenv").config();




// Middleware
app.use(cors());
app.use(express.json());


// Routes
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const applicationRoutes = require("./routes/applicationRoutes");


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Freelancer Backend API is running"
    });
});


// API routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/applications", applicationRoutes);


// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );

        app.listen(
            process.env.PORT || 5000,
            () => {

                console.log(
                    `Server running on port ${
                        process.env.PORT || 5000
                    }`
                );

            }
        );
    })
    .catch((error) => {

        console.log(
            "MongoDB connection failed"
        );

        console.log(error.message);
    });