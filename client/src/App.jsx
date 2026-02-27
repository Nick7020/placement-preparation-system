import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import Result from "./pages/Result";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/test" element={<Test />} />
        <Route path="/result" element={<Result />} />
        <Route path="/register" element={<Register />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
