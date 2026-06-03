import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Onboarding from "./pages/Onboarding";
import Model from "./pages/Model";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute"; 

function Router() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Navbar />
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/onboarding"
        element={
          <PrivateRoute>
            <Onboarding />
          </PrivateRoute>
        }
      />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Model />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default Router;
