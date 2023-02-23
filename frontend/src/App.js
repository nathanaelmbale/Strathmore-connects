
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import PageNotFound from './pages/PageNotFound';
import Signup from "./pages/Signup";
import Navbar from "./headers/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext()

  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path='/settings'></Route>
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
