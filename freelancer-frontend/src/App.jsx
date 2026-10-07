import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import Applications from "./pages/Applications";


function App() {

    return (
        <>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={
                        <Home />
                    }
                />

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />

                <Route
                    path="/register"
                    element={
                        <Register />
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <Dashboard />
                    }
                />

                <Route
                    path="/projects"
                    element={
                        <Projects />
                    }
                />

                <Route
                    path="/projects/:id"
                    element={
                        <ProjectDetails />
                    }
                />

                <Route
                    path="/create-project"
                    element={
                        <CreateProject />
                    }
                />

                <Route
                    path="/applications"
                    element={
                        <Applications />
                    }
                />

            </Routes>

        </>
    );
}


export default App;