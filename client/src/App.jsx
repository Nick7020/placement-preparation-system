import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import Result from "./pages/Result";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Leaderboard from "./pages/Leaderboard";
import SelectTest from "./pages/SelectTest";

import Admin from "./pages/Admin";
import EditQuestion from "./pages/EditQuestion";
import AdminRoute from "./components/AdminRoute";

function App() {

  // Keep Railway server alive - ping every 5 minutes
  useEffect(() => {
    const ping = () => axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/ping`).catch(() => {});
    ping();
    const interval = setInterval(ping, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/test" 
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/result" 
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/leaderboard" 
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/select-test" 
          element={
            <ProtectedRoute>
              <SelectTest />
            </ProtectedRoute>
          } 
        />
        <Route path="/edit-question/:id" element={<AdminRoute><EditQuestion /></AdminRoute>} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;