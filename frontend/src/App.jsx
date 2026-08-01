import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Notifications from "./pages/Notifications";
import AICopilot from "./pages/AICopilot";
import Workspace from "./pages/Workspace";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/ai-copilot" element={<AICopilot />} />
                <Route path="/workspace/:projectId" element={<Workspace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;