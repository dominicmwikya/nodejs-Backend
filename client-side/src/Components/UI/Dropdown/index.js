import React from 'react'
import PropTypes from 'prop-types'
const Dropdown=({data, styleClass, value,name,placeholder, onChange, className})=>{
   return (
    <div className={`form-group  ${styleClass}`}>
         <select name={name}   className={className} onChange={onChange}>
            <option value="">Please select {placeholder}</option>
            {data?.map((value, key)=>(
                <option
                    key={value.id}
                     value={value.item_name}>{value.item_name}
                </option>
            ))}
         </select>
    </div>
   )
};
Dropdown.propTypes={
    value:PropTypes.string,
    placeholder:PropTypes.string,
    // data:PropTypes.array.isRequired,
    styleClass:PropTypes.string,
    onChange:PropTypes.func.isRequired
};
Dropdown.defaultProps={
    value:'',
    styleClass:'',
    placeholder:'',
}
export default Dropdown;
