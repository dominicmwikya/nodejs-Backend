import React, { useState } from 'react'
export default (apiFunction)=>{
        const [status, setStatus]=useState("")
        const[response, setResponse]=useState("")
        const[error, setError]=useState('')
        const onDelete=async (id,data)=>{
          setStatus("submitting");
        try {
          const response= await apiFunction(id,data);
               setResponse(response.data)
        } catch (error) {
          setError(error.error)
        }

        }
     return {status, response,error, onDelete}
}
