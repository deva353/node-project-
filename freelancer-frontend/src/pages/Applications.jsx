import {
    useEffect,
    useState
} from "react";

import {
    getApplications,
    updateApplication
} from "../services/api";

import {
    useAuth
} from "../context/AuthContext";



function Applications() {

    const {
        user
    } = useAuth();


    const [
        applications,
        setApplications
    ] = useState([]);


    const loadApplications =
        async () => {

            try {

                const data =
                    await getApplications();

                setApplications(
                    data
                );

            } catch (error) {

                alert(
                    error.message
                );
            }
        };


    useEffect(() => {

        loadApplications();

    }, []);


    const changeStatus =
        async (
            id,
            status
        ) => {

            try {

                await updateApplication(
                    id,
                    status
                );

                loadApplications();

            } catch (error) {

                alert(
                    error.message
                );
            }
        };


    return (

        <div className="page">

            <h1>
                Applications
            </h1>


            {applications.map(
                application => (

                    <div
                        className="project-card"
                        key={
                            application._id
                        }
                    >

                        <h2>
                            {
                                application
                                    .project
                                    ?.title
                            }
                        </h2>


                        <p>
                            Freelancer:
                            {" "}
                            {
                                application
                                    .freelancer
                                    ?.name
                            }
                        </p>


                        <p>
                            Bid:
                            ₹
                            {
                                application
                                    .bidAmount
                            }
                        </p>


                        <p>
                            Proposal:
                            {" "}
                            {
                                application
                                    .proposal
                            }
                        </p>


                        <p>
                            Status:
                            {" "}
                            {
                                application
                                    .status
                            }
                        </p>


                        {user?.role ===
                            "client" &&

                            application.status ===
                            "pending" && (

                            <div>

                                <button
                                    onClick={() =>
                                        changeStatus(
                                            application._id,
                                            "accepted"
                                        )
                                    }
                                >
                                    Accept
                                </button>


                                <button
                                    onClick={() =>
                                        changeStatus(
                                            application._id,
                                            "rejected"
                                        )
                                    }
                                >
                                    Reject
                                </button>

                            </div>
                        )}

                    </div>
                )
            )}

        </div>
    );
}


export default Applications;