import {
    Link
} from "react-router-dom";


function Home() {

    return (

        <div className="hero">

            <div>

                <h1>
                    Freelancer Marketplace
                </h1>


                <p>
                    Find projects or
                    talented freelancers.
                </p>


                <Link
                    to="/projects"
                    className="btn"
                >
                    Browse Projects
                </Link>


                <Link
                    to="/register"
                    className="btn"
                >
                    Get Started
                </Link>

            </div>

        </div>
    );
}


export default Home;