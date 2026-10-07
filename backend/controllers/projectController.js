const Project =
    require("../models/Project");


// CREATE PROJECT
const createProject =
    async (req, res) => {

        try {

            if (
                req.user.role !==
                "client"
            ) {

                return res.status(403).json({
                    message:
                        "Only clients can create projects"
                });
            }


            const {
                title,
                description,
                budget,
                skillsRequired
            } = req.body;


            if (
                !title ||
                !description ||
                budget == null
            ) {

                return res.status(400).json({
                    message:
                        "Title, description and budget are required"
                });
            }


            const project =
                await Project.create({

                    title,

                    description,

                    budget,

                    skillsRequired,

                    client:
                        req.user.id
                });


            res.status(201).json({

                message:
                    "Project created successfully",

                project
            });


        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to create project",

                error:
                    error.message
            });
        }
    };


// GET ALL PROJECTS
const getProjects =
    async (req, res) => {

        try {

            const projects =
                await Project.find()
                    .populate(
                        "client",
                        "name email"
                    )
                    .sort({
                        createdAt: -1
                    });


            res.status(200).json(
                projects
            );


        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to get projects",

                error:
                    error.message
            });
        }
    };


// GET ONE PROJECT
const getProject =
    async (req, res) => {

        try {

            const project =
                await Project.findById(
                    req.params.id
                ).populate(
                    "client",
                    "name email"
                );


            if (!project) {

                return res.status(404).json({

                    message:
                        "Project not found"
                });
            }


            res.status(200).json(
                project
            );


        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to get project",

                error:
                    error.message
            });
        }
    };


// UPDATE PROJECT
const updateProject =
    async (req, res) => {

        try {

            const project =
                await Project.findById(
                    req.params.id
                );


            if (!project) {

                return res.status(404).json({

                    message:
                        "Project not found"
                });
            }


            if (
                project.client.toString() !==
                req.user.id
            ) {

                return res.status(403).json({

                    message:
                        "Only project owner can update"
                });
            }


            const updatedProject =
                await Project.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true,
                        runValidators: true
                    }
                );


            res.status(200).json({

                message:
                    "Project updated successfully",

                project:
                    updatedProject
            });


        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to update project",

                error:
                    error.message
            });
        }
    };


// DELETE PROJECT
const deleteProject =
    async (req, res) => {

        try {

            const project =
                await Project.findById(
                    req.params.id
                );


            if (!project) {

                return res.status(404).json({

                    message:
                        "Project not found"
                });
            }


            if (
                project.client.toString() !==
                req.user.id
            ) {

                return res.status(403).json({

                    message:
                        "Only project owner can delete"
                });
            }


            await Project.findByIdAndDelete(
                req.params.id
            );


            res.status(200).json({

                message:
                    "Project deleted successfully"
            });


        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to delete project",

                error:
                    error.message
            });
        }
    };


module.exports = {

    createProject,

    getProjects,

    getProject,

    updateProject,

    deleteProject
};