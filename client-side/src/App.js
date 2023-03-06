import React,{useContext, useEffect, useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from  './pages/Home'
import Dashboard from './pages/Dashboard'
import Items from './pages/Items/Item'
import NotFound from './Components/NotFound'
import Users from './pages/Users'
import Login from './pages/Signin'
import Register from './pages/Signup'
import NavBar from './Components/UI/Navbar'
import {AuthtextAuthContext} from './ContextAPI/AuthtextAuthContext'
import { useLocalStorage } from './api/useLocalStorage';
import swal from 'sweetalert';
import axios from 'axios';
import ErrorBoundary from './Components/ErrorBoundary';
export default function App() {
const navigateTo=useNavigate()
  const getlocalStorageValue=useLocalStorage();
  const [authState, setAuthState]=useState({username:"", id:"", role:"", isLoggedIn:false})

  useEffect(()=>{
    userAuthenticated();
  },[])

  const userAuthenticated=()=>{
    axios.get('http://localhost:3001/users/auth',{
      headers:{  token:getlocalStorageValue.getItem("secretKey")}
    }).then((respo)=>{
      if(respo.data.error){
        setAuthState({...authState, isLoggedIn:false})
        swal({
          text:respo.data.error,
          title:respo.data.code,
          icon:'warning'
        })
         
      }else{
        swal({
          text:"Okay",
          title:respo.data,
          icon:'success'
        })
        setAuthState({
          username:respo.data.name, id:respo.data.id, isLoggedIn:respo.data.isLoggedIn
        })
      
      }
    });
  }
  const logout=()=>{
    localStorage.removeItem("secretKey")
    setAuthState({username:'',id:0, role:'', isLoggedIn:false })
       navigateTo('/')
  }
  return (
    <div className="App">
      <div>
        <AuthtextAuthContext.Provider value={{authState, setAuthState}}>
        <NavBar  logout={logout} />
        <ErrorBoundary>
        <Routes>
            <Route path='*' element={<NotFound/>} />
            <Route path='/' element={<Home/>}  />
            <Route path='/dashboard' element={<Dashboard/>}  />
            <Route path='/items' element={<Items/>}  />
            <Route path='/users' element={<Users/>}  />
            <Route path='/login' element={<Login/>}  />
            <Route path='/register' element={<Register/>}  />
        </Routes>
        </ErrorBoundary>
       
        </AuthtextAuthContext.Provider>
      </div>  
    </div>
  );
}
