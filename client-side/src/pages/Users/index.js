import React, { useEffect,useState } from 'react'
import Table1 from '../../Components/UI/Table';
import Modal from '../../Components/UI/Modals'
import Card from '../../Components/UI/Cards'
import Userform from './userform';
import { useFetchData } from '../../api/user/UseApi';
import ErrorBoundary from '../../Components/ErrorBoundary';
export default function Index() {
  const[show, setShow]=useState(false);
  const showModal=()=>setShow(true);
  const closeModal=()=>setShow(false)
  const {getUser}=useFetchData();
  const [userlist, setUserList]=useState([])
   const cols=['id','username','email'];
   useEffect(()=>{
    const users= getUser();
    setUserList(users)
   },[])
  const roles=[
    {
      'id':1,
      "item_name":'Admin'
    },
    {
      'id':2,
      "item_name":'Advanced'
    },
    {
      'id':3,
      "item_name":'Basic'
    }
  ]
  return (
    <div className='col-md-6'>
       <i className='btn fa fa-plus ' onClick={showModal} 
                style={{color:"green", color:'white', backgroundColor:'green',
                margin: '10px 0px', borderRadius:'5px', padding:'10px 40px'}}>
            </i>

        <ErrorBoundary>
        <Table1 cols={cols} data={userlist} 
              className='table table-striped table-bordered hover' 
            />
        </ErrorBoundary>
     
        <ErrorBoundary>
        <Modal  show={show} onClose={closeModal} header=""  footer="item modal" size='md'>
                <Card _cardName="New User Form">
                    <Userform roles={roles}  />
                </Card>
            </Modal>
        </ErrorBoundary>
    </div>
  )
}
