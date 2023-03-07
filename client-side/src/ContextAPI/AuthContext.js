import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();
function AuthProvider(props) {
  const [user, setUser] = useState({username:'', id:'', role:"", isLogged:false});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await AuthenticateToken();
      } catch (error) {
       throw new Error(error)
      }
    };
    fetchUser();
  }, []);
  
  const AuthenticateToken = async () => {
    const token = await localStorage.getItem('accessToken');
    if (token) {
      try {
        // Verify the access token
        const result = await axios.get('http://localhost:3001/users/auth', {  headers: { token: token } });

        setUser({ username: result.data.username, id: result.data.id, isLogged: true });
             return user;

            
      } catch (error) {
          setUser({ ...user, isLogged: false });
          localStorage.removeItem('accessToken');
          throw new Error(error);
      }
    } else {
      throw new Error("No access token ");
    }
  };
  
  const handleLogout = () => {
    setUser({ username: '', id: '', role: '', isLogged: false });
    localStorage.removeItem('accessToken');
      setUser({username:"",id:"",role:"", isLogged:false})
      navigate('/login');
  };

 
  return (
    <AuthContext.Provider value={{user, setUser, handleLogout}}>
         {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
