import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../Components/UI/Input';
import Dropdown from '../../Components/UI/Dropdown';
import swal from 'sweetalert';
import { usePost } from '../../api/user/UseApi';
const Index = ({roles}) => {
  const { createUser } = usePost();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password:'',
      rpassword:'',
      role:''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password:Yup.string().min(4, "password must be atleast 4 characters").max(8,'password must be maximum of 8 characters').required("Required field"),
      rpassword:Yup.string().oneOf([Yup.ref("password"), null],"passwords must match").required("password must match"),
      role:Yup.string().required("Please select user role")
    }),
    onSubmit: values => {
      createUser(values).then((response)=>{
        if(response.error){
          console.log(response.error)
              swal({
                text:response.error,
                title:'Failed',
                timer:3500,
                icon:'warning'
          })
        }
        else{
          swal({text:response,
            title:'success',
            timer:3500,
            icon:'success'
          })
        }
      })
    },
  });
  return (
    <div className="container">
    <div className="row">
      <div className="col">
      <form onSubmit={formik.handleSubmit} className="userform" style={{marginLeft:"0px",paddingLeft:"0px"}}>
              <div className='form-group row'>
                  <div className='col'>
                  <div className="input-group mb-3">
                      <div className="input-group-prepend  col-sm-3">
                          <span className="input-group-text">User Name</span>
                      </div>
                      <Input id="firstName" name="username"  className='form-control' type="text" onChange={formik.handleChange} 
                     onBlur={formik.handleBlur} value={formik.values.username}  />
                  
                  </div> 
                  </div>
              </div>
              {formik.touched.username && formik.errors.username ? (<div className='error' style={{color:'red',marginLeft:'200px'}}>{"Username  "+formik.errors.username}</div>  ) : null}
              <div className='form-group row'>
                  <div className='col'>
                  <div className="input-group mb-2">
                      <div className="input-group-prepend  col-sm-3">
                          <span className="input-group-text">User Email: </span>
                      </div>
                      <Input id="email" name="email" className='form-control' type="email"   onChange={formik.handleChange} onBlur={formik.handleBlur}value={formik.values.email}/>
                  </div> 
                  </div>
              </div>
              {formik.touched.email && formik.errors.email ? (<div className='error' style={{color:'red',marginLeft:'200px'}}>{"Email "+formik.errors.email}</div> ) : null}
              <div className='form-group row'>
                  <div className='col'>
                  <div className="input-group mb-3">
                      <div className="input-group-prepend  col-sm-3">
                          <span className="input-group-text">User Type: </span>
                      </div>

                      <Dropdown  className='form-control' placeholder='User roles'name="role" id="role"
                         onChange={formik.handleChange} onBlur={formik.handleBlur}
                         data={roles}
                       value={formik.values.role}  />
                      {/* <select className='form-control' name="role" id="role" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.role} >
                        <option value=''>User Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketers">Marketers</option>
                      </select>  */}
                  </div> 
                  </div>
              </div>
              {formik.touched.role && formik.errors.role ? (<div className='error' style={{color:'red',marginLeft:'200px'}}>{formik.errors.role}</div>  ) : null}
              <div className='form-group row'>
                  <div className='col'>
                  <div className="input-group mb-3">
                      <div className="input-group-prepend  col-sm-3">
                          <span className="input-group-text">password: </span>
                      </div>
                    <Input id="password" name="password" className='form-control' type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                  </div> 
                  </div>
                 
              </div>
              {formik.touched.password && formik.errors.password ? ( <div className='error' style={{color:'red',marginLeft:'200px'}}>{formik.errors.password}</div>) : null}
              <div className='form-group row'>
                  <div className='col'>
                  <div className="input-group mb-3">
                      <div className="input-group-prepend  col-sm-3">
                          <span className="input-group-text">password: </span>
                      </div>
                   <Input id="rpassword" name="rpassword" className='form-control' type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rpassword}/>
                  </div> 
                  </div>
              </div>
              {formik.touched.rpassword && formik.errors.rpassword ?(<div className='error' style={{color:'red',marginLeft:'200px'}}>{formik.errors.rpassword}</div>  ) : null}
               <button className='btn btn-success btn-sm' style={{width:'100px', float:'right', marginLeft:'auto', marginRight:'0px'}} type='submit'>ADD USER</button>
            </form> 
      </div>
    </div>
  </div>
  );
};
export default Index;