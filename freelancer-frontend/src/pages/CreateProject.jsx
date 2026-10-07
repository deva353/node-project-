import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    createProject
} from "../services/api";


function CreateProject() {

    const navigate =
        useNavigate();


    const [form, setForm] =
        useState({

            title: "",

            description: "",

            budget: "",

            skillsRequired: ""
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

            await createProject({

                title:
                    form.title,

                description:
                    form.description,

                budget:
                    Number(
                        form.budget
                    ),

                skillsRequired:
                    form.skillsRequired
                        .split(",")
                        .map(
                            skill =>
                                skill.trim()
                        )
            });


            alert(
                "Project created successfully"
            );


            navigate(
                "/projects"
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
                Create Project
            </h2>


            <form
                onSubmit={
                    handleSubmit
                }
            >

                <input
                    name="title"
                    placeholder="Project title"
                    value={
                        form.title
                    }
                    onChange={
                        handleChange
                    }
                    required
                />


                <textarea
                    name="description"
                    placeholder="Project description"
                    value={
                        form.description
                    }
                    onChange={
                        handleChange
                    }
                    required
                />


                <input
                    name="budget"
                    type="number"
                    placeholder="Budget"
                    value={
                        form.budget
                    }
                    onChange={
                        handleChange
                    }
                    required
                />


                <input
                    name="skillsRequired"
                    placeholder="React, Node.js, MongoDB"
                    value={
                        form.skillsRequired
                    }
                    onChange={
                        handleChange
                    }
                />


                <button>
                    Create Project
                </button>

            </form>

        </div>
    );
}


export default CreateProject;