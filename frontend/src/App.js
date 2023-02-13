
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import PageNotFound from './pages/PageNotFound';
import Signup from "./pages/Signup";
import Navbar from "./headers/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Navbar />
      <Router>

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element ={ <Home />} />
          <Route path='/settings'></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
