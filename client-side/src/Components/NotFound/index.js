import React from 'react'
import Card from '../../Components/UI/Cards'
import {useNavigate}  from 'react-router-dom'
export default function Index() {
  const navigate=useNavigate()
  return (
    <div className='row'>
       <div className='col-md-6 offset-2'>
            <Card _cardName="Error 404!" style={{fontSize:"350px"}}>
            <h1> Page Not Found  <button className='btn btn-sm btn-primary' onClick={()=>navigate(-1)}  >Go back</button></h1>
            </Card>
       </div>
    </div>
  )
}
