import Home from "./pages/Home/BeforeIndex";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="dark bg-secondary text-foreground flex justify-center items-center min-h-screen">
        <Routes>
          <Route path="/page/:pageNumber" element={<Home />} />
          <Route path="/" element={<Home />} /> {/* Redirect to default page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
