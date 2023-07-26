import './App.css'
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Layout from './Layout';
import Register from './components/Register';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
  );
}

export default App