import {
    Link
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext";


function Dashboard() {

    const {
        user
    } = useAuth();


    return (

        <div className="page">

            <h1>
                Welcome,
                {" "}
                {user?.name}
            </h1>


            <p>
                Role:
                {" "}
                {user?.role}
            </p>


            <div className="dashboard-grid">

                {user?.role ===
                    "client" && (

                    <Link
                        to="/create-project"
                        className="dashboard-card"
                    >

                        <h2>
                            Create Project
                        </h2>

                        <p>
                            Post a new project
                        </p>

                    </Link>
                )}


                <Link
                    to="/projects"
                    className="dashboard-card"
                >

                    <h2>
                        Projects
                    </h2>

                    <p>
                        Browse projects
                    </p>

                </Link>


                <Link
                    to="/applications"
                    className="dashboard-card"
                >

                    <h2>
                        Applications
                    </h2>

                    <p>
                        View applications
                    </p>

                </Link>

            </div>

        </div>
    );
}


export default Dashboard;