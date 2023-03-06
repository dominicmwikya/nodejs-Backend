import React,{useContext} from 'react'
import { AuthtextAuthContext } from '../../ContextAPI/AuthtextAuthContext'
export default function Index() {
  const {authState, setAuthState}=useContext(AuthtextAuthContext);
  return (
    <div>Dashboard  {console.log(authState)}</div>
  )
}
