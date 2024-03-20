import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Project";
import DashBoard from "./pages/Dashboard";
import { PrivateRoute, AdminRoute } from "./shared/PrivateRoute";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/projects" element={<Projects />} />
            <Route element={<AdminRoute />}>
              <Route path="/create-post" element={<CreatePost />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
