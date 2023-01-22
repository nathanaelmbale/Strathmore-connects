
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Account from './pages/Account';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import PageNotFound from './pages/PageNotFound';
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element ={ <Home />} />
          <Route path='/settings'>
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
