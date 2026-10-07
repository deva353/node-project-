const Application =
    require("../models/Application");

const Project =
    require("../models/Project");


// CREATE APPLICATION
const createApplication =
    async (req, res) => {

        try {

            if (
                req.user.role !==
                "freelancer"
            ) {

                return res.status(403).json({
                    message:
                        "Only freelancers can apply"
                });
            }


            const {
                project,
                proposal,
                bidAmount
            } = req.body;


            if (
                !project ||
                !proposal ||
                bidAmount == null
            ) {

                return res.status(400).json({
                    message:
                        "Project, proposal and bid amount are required"
                });
            }


            const projectData =
                await Project.findById(
                    project
                );


            if (!projectData) {

                return res.status(404).json({
                    message:
                        "Project not found"
                });
            }


            if (
                projectData.status !==
                "open"
            ) {

                return res.status(400).json({
                    message:
                        "Applications are closed"
                });
            }


            const existing =
                await Application.findOne({

                    project,

                    freelancer:
                        req.user.id
                });


            if (existing) {

                return res.status(400).json({
                    message:
                        "You already applied"
                });
            }


            const application =
                await Application.create({

                    project,

                    freelancer:
                        req.user.id,

                    proposal,

                    bidAmount
                });


            res.status(201).json({

                message:
                    "Application submitted successfully",

                application
            });


        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to submit application",

                error:
                    error.message
            });
        }
    };


// GET APPLICATIONS
const getApplications =
    async (req, res) => {

        try {

            let applications;


            if (
                req.user.role ===
                "freelancer"
            ) {

                applications =
                    await Application.find({

                        freelancer:
                            req.user.id

                    })
                    .populate(
                        "project",
                        "title budget status"
                    );

            } else {

                const projects =
                    await Project.find({

                        client:
                            req.user.id

                    }).select("_id");


                const projectIds =
                    projects.map(
                        project =>
                            project._id
                    );


                applications =
                    await Application.find({

                        project: {
                            $in:
                                projectIds
                        }

                    })
                    .populate(
                        "project",
                        "title budget status"
                    )
                    .populate(
                        "freelancer",
                        "name email skills"
                    );
            }


            res.status(200).json(
                applications
            );


        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to get applications",

                error:
                    error.message
            });
        }
    };


// UPDATE APPLICATION
const updateApplication =
    async (req, res) => {

        try {

            const application =
                await Application.findById(
                    req.params.id
                ).populate(
                    "project"
                );


            if (!application) {

                return res.status(404).json({
                    message:
                        "Application not found"
                });
            }


            if (
                application.project.client.toString() !==
                req.user.id
            ) {

                return res.status(403).json({
                    message:
                        "Only project owner can update application"
                });
            }


            const {
                status
            } = req.body;


            if (
                ![
                    "pending",
                    "accepted",
                    "rejected"
                ].includes(status)
            ) {

                return res.status(400).json({
                    message:
                        "Invalid status"
                });
            }


            application.status =
                status;


            await application.save();


            res.status(200).json({

                message:
                    "Application updated successfully",

                application
            });


        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to update application",

                error:
                    error.message
            });
        }
    };


module.exports = {

    createApplication,

    getApplications,

    updateApplication
};