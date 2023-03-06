import React ,{useState} from 'react'
import PropTypes from 'prop-types'; 
function SubmitButton({className, type, value, style}) {
  const [isSubmitted, setIsSubmitted ]=useState(false);
  function submitHandler(){
      setIsSubmitted(true);
  }
  return ( 
    <button   
            onClick={submitHandler}  
            type={type} 
            value={value} 
            className={`${className} submit-button`}
            style={style} >
            {/* {isSubmitted ? 'Submitting...':value} */}
    </button>
   )};
   SubmitButton.propTypes={
       className:PropTypes.string,
       value:PropTypes.string.isRequired,
       
   };

   SubmitButton.defaultProps={
    className:'btn-danger'
   }
export default SubmitButton;