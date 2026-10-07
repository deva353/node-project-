import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    getProjects
} from "../services/api";


function Projects() {

    const [
        projects,
        setProjects
    ] = useState([]);


    useEffect(() => {

        const loadProjects =
            async () => {

                try {

                    const data =
                        await getProjects();

                    setProjects(
                        data
                    );

                } catch (error) {

                    alert(
                        error.message
                    );
                }
            };


        loadProjects();

    }, []);


    return (

        <div className="page">

            <h1>
                Available Projects
            </h1>


            <div className="project-grid">

                {projects.map(
                    project => (

                        <div
                            className="project-card"
                            key={
                                project._id
                            }
                        >

                            <h2>
                                {
                                    project.title
                                }
                            </h2>


                            <p>
                                {
                                    project.description
                                }
                            </p>


                            <p>
                                <strong>
                                    Budget:
                                </strong>

                                ₹
                                {
                                    project.budget
                                }
                            </p>


                            <p>
                                <strong>
                                    Status:
                                </strong>

                                {
                                    project.status
                                }
                            </p>


                            <Link
                                to={
                                    `/projects/${project._id}`
                                }
                                className="btn"
                            >
                                View Project
                            </Link>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}


export default Projects;