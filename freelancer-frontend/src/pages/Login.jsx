import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext";


function Login() {

    const {
        login
    } = useAuth();


    const navigate =
        useNavigate();


    const [email, setEmail] =
        useState("");


    const [password, setPassword] =
        useState("");


    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();


        try {

            await login({

                email,

                password
            });


            navigate(
                "/dashboard"
            );


        } catch (error) {

            alert(
                error.message
            );
        }
    };


    return (

        <div className="form-container">

            <h2>
                Login
            </h2>


            <form
                onSubmit={
                    handleSubmit
                }
            >

                <input
                    type="email"
                    placeholder="Email"
                    value={
                        email
                    }
                    onChange={
                        e =>
                            setEmail(
                                e.target.value
                            )
                    }
                    required
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={
                        password
                    }
                    onChange={
                        e =>
                            setPassword(
                                e.target.value
                            )
                    }
                    required
                />


                <button>
                    Login
                </button>

            </form>

        </div>
    );
}


export default Login;