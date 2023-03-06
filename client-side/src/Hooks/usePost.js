import React, { useState } from 'react'
export default (apiFunction)=>{
        const [status, setStatus]=useState("")
        const[response, setResponse]=useState("")
        const[error, setError]=useState('')
        const submitData=async (data)=>{
          setStatus("submitting");
        try {
          const response= await apiFunction(data);
               setResponse(response.data)
        } catch (error) {
          setError(error.error)
        }

        }
     return {status, response,error, submitData}
}
