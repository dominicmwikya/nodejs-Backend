import React, {useContext, useState} from 'react'
import Cards from "../../Components/UI/Cards"
import { useLogin } from '../../api/user/UseApi';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { checkTokenExpiration } from '../../Auth/Auth';
import { AuthContext } from '../../ContextAPI/AuthContext';
export default function Index() {
  const { user, setUser } = useContext(AuthContext);
  const {LoginUser}=useLogin();
      const [values, setValues]=useState({
      email:"",
      password:""
  });

  
  const navigate=useNavigate()
  const handleChange=(e)=>{
      let name= e.target.name;
      let value= e.target.value;
      const newValues = {
      ...values,
      [name]: value
    }
    setValues(newValues)
}


const _submit = async (e) => {
  e.preventDefault();
 try {
    const result=await LoginUser(values);  
     localStorage.setItem('accessToken', result.data.secretKey);
     console.log("my token login "+ result.data.secretKey)
     console.log('user name after login'+  result.data.user.username)
     setUser({username:result.data.user.username, role:result.data.user.role, id:result.data.user.id, isLogged:true});
     navigate('/')
 } catch (error) {
  console.log(error.message)
  if(error.message){
     swal({
        text:error.message,
        title:"Login Failed",
        icon:"warning",
        timer:2000
     })
  }
 }

 
}
  return (
    <div className='container'>
      <div className='row'>
          <div className='col-5 mx-auto'>
            <Cards>
              <form onSubmit={_submit}>
                  <h3>User Login</h3>
                  {user.username}
                  <div className="mb-3">
                    <label>Email address</label>
                  <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email" 
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password" 
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                    <p className="forgot-password text-right">
                      Forgot Password
                    </p>
              </form>
            </Cards>
          </div>
        </div>
    </div>
  )
}
