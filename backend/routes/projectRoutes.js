const express = require("express");

const {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
} = require(
    "../controllers/projectController"
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
    createProject
);


router.get(
    "/",
    getProjects
);


router.get(
    "/:id",
    getProject
);


router.put(
    "/:id",
    protect,
    updateProject
);


router.delete(
    "/:id",
    protect,
    deleteProject
);


module.exports = router;