import React,{useContext} from 'react'
import { AuthContext } from '../../ContextAPI/AuthContext'
export default function Index() {
  const {user}=useContext(AuthContext)
  if (!user) {
    return <div>Loading...</div>; // or some other error message
  }

  return (
    <div>Dashboard: Logged User - {user.username}</div>
  );
}
