import IndexPage from './pages/IndexPage';
import {Routes, Route} from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route index element={<IndexPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
    
  )
}

export default App
