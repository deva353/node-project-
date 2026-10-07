import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    getProject,
    createApplication
} from "../services/api";

import {
    useAuth
} from "../context/AuthContext";


function ProjectDetails() {

    const {
        id
    } = useParams();


    const {
        user
    } = useAuth();


    const [
        project,
        setProject
    ] = useState(null);


    const [
        proposal,
        setProposal
    ] = useState("");


    const [
        bidAmount,
        setBidAmount
    ] = useState("");


    useEffect(() => {

        const loadProject =
            async () => {

                try {

                    const data =
                        await getProject(
                            id
                        );

                    setProject(
                        data
                    );

                } catch (error) {

                    alert(
                        error.message
                    );
                }
            };


        loadProject();

    }, [id]);


    const handleApply = async (
        event
    ) => {

        event.preventDefault();


        try {

            await createApplication({

                project: id,

                proposal,

                bidAmount:
                    Number(
                        bidAmount
                    )
            });


            alert(
                "Application submitted successfully"
            );


            setProposal("");

            setBidAmount("");


        } catch (error) {

            alert(
                error.message
            );
        }
    };


    if (!project) {

        return (
            <div className="page">
                Loading...
            </div>
        );
    }


    return (

        <div className="page">

            <h1>
                {project.title}
            </h1>


            <p>
                {
                    project.description
                }
            </p>


            <h3>
                Budget:
                ₹{project.budget}
            </h3>


            <p>
                Status:
                {project.status}
            </p>


            {user?.role ===
                "freelancer" &&

                project.status ===
                "open" && (

                <div className="form-container">

                    <h2>
                        Apply
                    </h2>


                    <form
                        onSubmit={
                            handleApply
                        }
                    >

                        <textarea
                            placeholder="Write your proposal"
                            value={
                                proposal
                            }
                            onChange={
                                e =>
                                    setProposal(
                                        e.target.value
                                    )
                            }
                            required
                        />


                        <input
                            type="number"
                            placeholder="Your bid amount"
                            value={
                                bidAmount
                            }
                            onChange={
                                e =>
                                    setBidAmount(
                                        e.target.value
                                    )
                            }
                            required
                        />


                        <button>
                            Apply
                        </button>

                    </form>

                </div>
            )}

        </div>
    );
}


export default ProjectDetails;