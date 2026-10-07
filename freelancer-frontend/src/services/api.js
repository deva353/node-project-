const API_URL =
    "http://localhost:5000/api";


const request = async (
    endpoint,
    options = {}
) => {

    const token =
        localStorage.getItem(
            "token"
        );


    const response =
        await fetch(
            `${API_URL}${endpoint}`,
            {

                ...options,

                headers: {

                    "Content-Type":
                        "application/json",

                    ...(token && {
                        Authorization:
                            `Bearer ${token}`
                    }),

                    ...options.headers
                }
            }
        );


    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data.message ||
            "Request failed"
        );
    }


    return data;
};


// USER
export const registerUser =
    (data) =>
        request(
            "/users/register",
            {
                method: "POST",

                body:
                    JSON.stringify(data)
            }
        );


export const loginUser =
    (data) =>
        request(
            "/users/login",
            {
                method: "POST",

                body:
                    JSON.stringify(data)
            }
        );


// PROJECT
export const getProjects =
    () =>
        request("/projects");


export const getProject =
    (id) =>
        request(
            `/projects/${id}`
        );


export const createProject =
    (data) =>
        request(
            "/projects",
            {
                method: "POST",

                body:
                    JSON.stringify(data)
            }
        );


// APPLICATION
export const createApplication =
    (data) =>
        request(
            "/applications",
            {
                method: "POST",

                body:
                    JSON.stringify(data)
            }
        );


export const getApplications =
    () =>
        request(
            "/applications"
        );


export const updateApplication =
    (id, status) =>
        request(
            `/applications/${id}`,
            {
                method: "PUT",

                body:
                    JSON.stringify({
                        status
                    })
            }
        );