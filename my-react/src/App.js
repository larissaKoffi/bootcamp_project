import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/assets/Home/HomePage";
import Register from "./components/assets/Register/RegisterAuth";
import Login from "./components/assets/Login/LoginAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
