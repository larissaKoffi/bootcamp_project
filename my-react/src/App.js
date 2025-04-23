import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './components/Accueil/Accueil';
import HomePage from './components/Home/HomePage';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/registerAuth';
import Login from './components/Login/LoginAuth';
import AdminDash from './components/Admin/AdminDash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Accueil />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminDash />} />
        <Route path='#' element={<Navbar />} />
      </Routes>
    </Router>
  );
}

export default App;