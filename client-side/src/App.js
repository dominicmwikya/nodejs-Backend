import React,{useContext} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from  './pages/Home'
import Dashboard from './pages/Dashboard'
import Items from './pages/Items/Item'
import NotFound from './Components/NotFound'
import Users from './pages/Users'
import Login from './pages/Signin'
import Register from './pages/Signup'
import NavBar from './Components/UI/Navbar'
import Purchases from './pages/Purchases'
import Orders from './pages/Orders'
import ErrorBoundary from './Components/ErrorBoundary';

export default function App() {
  return (
    <div className="App">
      <div>
      <NavBar  />
        <ErrorBoundary>
        <Routes>
            <Route path='*' element={<NotFound/>} />
            <Route path='/' element={<Home/>}  />
            <Route path='/dashboard' element={<Dashboard/>}  />
            <Route path='/items' element={<Items/>}  />
            <Route path='/users' element={<Users/>}  />
            <Route path='/login' element={<Login/>}  />
            <Route path='/register' element={<Register/>}  />
            <Route path='/purchases' element={<Purchases />}  />
            <Route path='/orders' element={<Orders />}  />
        </Routes>
        </ErrorBoundary>
      </div>  
    </div>
  );
}
