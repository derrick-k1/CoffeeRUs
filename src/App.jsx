import { BrowserRouter, Routes } from "react-router";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
             <Route path="/admin" element={<Admin />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;