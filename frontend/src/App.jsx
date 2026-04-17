import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Predictions from "./pages/Predictions";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] pb-10">
        <Navbar />
        <main className="pt-24 px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
