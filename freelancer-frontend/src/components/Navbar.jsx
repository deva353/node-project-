import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext";


function Navbar() {

    const {
        user,
        logout
    } = useAuth();


    const navigate =
        useNavigate();


    const handleLogout = () => {

        logout();

        navigate(
            "/login"
        );
    };


    return (

        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >
                Freelancer
            </Link>


            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/projects">
                    Projects
                </Link>


                {user && (

                    <Link to="/dashboard">
                        Dashboard
                    </Link>
                )}


                {user && (

                    <Link to="/applications">
                        Applications
                    </Link>
                )}


                {!user && (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}


                {user && (

                    <button
                        onClick={
                            handleLogout
                        }
                    >
                        Logout
                    </button>
                )}

            </div>

        </nav>
    );
}


export default Navbar;