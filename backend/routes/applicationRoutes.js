const express = require("express");

const {
    createApplication,
    getApplications,
    updateApplication
} = require(
    "../controllers/applicationController"
);

const {
    protect
} = require(
    "../middleware/authMiddleware"
);


const router =
    express.Router();


router.post(
    "/",
    protect,
    createApplication
);


router.get(
    "/",
    protect,
    getApplications
);


router.put(
    "/:id",
    protect,
    updateApplication
);


module.exports = router;