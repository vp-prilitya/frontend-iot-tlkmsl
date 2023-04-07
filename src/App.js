import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Reset from "./pages/reset";
import NotFound from "./pages/notfound";

function App() {
  return (
    <div className="min-h-screen absolute w-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset/data" element={<Reset />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
