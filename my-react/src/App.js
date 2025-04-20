import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/registerAuth';
import Login from './components/Login/LoginAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='#' element={<Navbar />} />
      </Routes>
    </Router>
  );
}

export default App;
