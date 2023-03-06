import React, {useContext, useState} from 'react'
import { AuthtextAuthContext } from '../../ContextAPI/AuthtextAuthContext';
import Cards from "../../Components/UI/Cards"
import { useLogin } from '../../api/user/UseApi';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
export default function Index() {

  const {LoginUser}=useLogin();
      const {setAuthState}=useContext(AuthtextAuthContext);
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
    const response = await LoginUser(values);
    localStorage.setItem("secretKey", response.data.secretKey);
    setAuthState({
      username:response.data.username,
      id:response.data.id,
      role:response.data.role
    })
    swal({
      text:response.data.message,
      icon:'success',
      title:"Welcome!",
    }).then(()=>{
      navigate('/')
    })
  } catch (error) {
    swal({
      title: 'Error!',
      text: error.message, // Display only the error message
      icon: 'warning',
    });
  }
}
  return (
    <div className='container'>
      <div className='row'>
          <div className='col-5 mx-auto'>
            <Cards>
              <form onSubmit={_submit}>
                  <h3>User Login</h3>
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
