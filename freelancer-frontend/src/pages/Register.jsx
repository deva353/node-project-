import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext";


function Register() {

    const {
        register
    } = useAuth();


    const navigate =
        useNavigate();


    const [form, setForm] =
        useState({

            name: "",

            email: "",

            password: "",

            role: "freelancer",

            skills: "",

            bio: ""
        });


    const handleChange = (
        event
    ) => {

        setForm({

            ...form,

            [event.target.name]:
                event.target.value
        });
    };


    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();


        try {

            await register({

                ...form,

                skills:
                    form.skills
                        .split(",")
                        .map(
                            skill =>
                                skill.trim()
                        )
            });


            alert(
                "Registration successful"
            );


            navigate(
                "/login"
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
                Create Account
            </h2>


            <form
                onSubmit={
                    handleSubmit
                }
            >

                <input
                    name="name"
                    placeholder="Name"
                    value={
                        form.name
                    }
                    onChange={
                        handleChange
                    }
                    required
                />


                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={
                        form.email
                    }
                    onChange={
                        handleChange
                    }
                    required
                />


                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={
                        form.password
                    }
                    onChange={
                        handleChange
                    }
                    required
                />


                <select
                    name="role"
                    value={
                        form.role
                    }
                    onChange={
                        handleChange
                    }
                >

                    <option value="freelancer">
                        Freelancer
                    </option>

                    <option value="client">
                        Client
                    </option>

                </select>


                <input
                    name="skills"
                    placeholder="React, Node.js, MongoDB"
                    value={
                        form.skills
                    }
                    onChange={
                        handleChange
                    }
                />


                <textarea
                    name="bio"
                    placeholder="Tell us about yourself"
                    value={
                        form.bio
                    }
                    onChange={
                        handleChange
                    }
                />


                <button>
                    Register
                </button>

            </form>

        </div>
    );
}


export default Register;