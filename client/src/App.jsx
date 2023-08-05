import './App.css'
import {Routes, Route} from 'react-router-dom';
import { UserContextProvider } from './UserContext';
import Layout from './Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Places from './components/Places';
import PlacesForm from './components/PlacesForm';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route index element = {<Home />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/register" element = {<Register />} />
          <Route path = "/profile" element = {<Profile/>} />
          <Route path = "/profile/places" element = {<Places/>} />
          <Route path = "/profile/places/new" element = {<PlacesForm/>} />
        </Route>
      </Routes>
    </UserContextProvider>
      
  );
}

export default App