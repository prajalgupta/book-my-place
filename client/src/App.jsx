import './App.css'
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Layout from './Layout';
import Register from './components/Register';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import UserProfile from './components/UserProfile';

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:subpage?" element={<UserProfile/>} />
          <Route path="/user/:subpage/:action" element={<UserProfile/>} />

        </Route>
      </Routes>
    </UserContextProvider>
      
  );
}

export default App