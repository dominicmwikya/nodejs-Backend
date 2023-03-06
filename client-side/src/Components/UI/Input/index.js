import React from 'react'
import PropTypes from 'prop-types'; 
const Input=({type, name, onChange, value, className, placeholder, style})=>{
return (
<div>
  {type==='textarea' ?(
    <textarea className={className} name={name}
    style={style}  onChange={onChange}
    placeholder={placeholder}
    > 
     </textarea>
  ):(
    <input 
            type={type}
            className={className}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            style={style}
        />
  )}
</div>
)

};
Input.propTypes={
        type:PropTypes.string,
        onChange:PropTypes.func.isRequired,
        placeholder:PropTypes.string,
        // style:PropTypes.string,
        name:PropTypes.string.isRequired,
        className:PropTypes.string
      };
      Input.defaultProps={
        type:'text',
        placeholder:'',
        // style:"",
        className:"form-control"

      }
export default Input;
