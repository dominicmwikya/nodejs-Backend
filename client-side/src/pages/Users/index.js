import React, { useEffect,useState } from 'react'
import Table1 from '../../Components/UI/Table';
import Modal from '../../Components/UI/Modals'
import Card from '../../Components/UI/Cards'
import Userform from './userform';
import swal from 'sweetalert';
import { useFetchData, useDeleteUser } from '../../api/user/UseApi';
import ErrorBoundary from '../../Components/ErrorBoundary';
import { checkTokenExpiration } from '../../Auth/Auth';
export default function Index() {
  const[show, setShow]=useState(false);
  const showModal=()=>setShow(true);
  const closeModal=()=>setShow(false)
  const {getUsers}=useFetchData();
  const {deleteUser}=useDeleteUser();
  const [userlist, setUserList]=useState([])
   const cols=['id','username','email'];

   useEffect(() => {
    const fetchUsers = async () => {
      const users= await getUsers();
      setUserList(users.data);
    };
    fetchUsers();
  }, [userlist]);
  
  const handleEdit = (id) => {
    // handle edit logic here

    alert(id)
  };

  const handleDelete = async(id) => {

    swal({
      title: "Are you sure?",
      text: "This operation is irreversible!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm)=>{
      if(confirm){
        deleteUser(id).then(((response)=>{
          console.log(response)
          swal({
                 text:response.data,
                 title:'Success',
                 icon:"success",
                 timer:3000
               });
        })).catch((error)=>{
          console.log(error)
          swal({
            text:error,
            title:'Warning!',
            icon:"warning",
            timer:3500
          })
        })
      }else{
        swal({
          text:"Item Not deleted!",
          title:'Canceled!',
          icon:"success",
          timer:3000
        });
      }
    })
    
  };
  const handleUpdatePassword = (id) => {
    // handle update password logic here
  };
  const roles=[
    {
      'id':1,
      "item_name":'Admin'
    },
    {
      'id':2,
      "item_name":'Normal'
    },
    {
      'id':3,
      "item_name":'guest'
    }
  ]
  return (
    <div className='col-md-6'>
            <i className='btn fa fa-plus ' onClick={showModal} 
                style={{color:"green", color:'white', backgroundColor:'green',
                margin: '10px 0px', borderRadius:'5px', padding:'10px 40px'}}>
            </i>
        <ErrorBoundary>
        <Table1 cols={cols} data={userlist}   _edit={handleEdit} _delete={handleDelete}
              className='table table-striped table-bordered hover' 
            />
        </ErrorBoundary>
        <ErrorBoundary>

          
        <Modal  show={show} onClose={closeModal} header=""  footer="item modal" size='md'>
                <Card _cardName="New User Form">
                    <Userform roles={roles} closeModal={closeModal} />
                </Card>
            </Modal>
        </ErrorBoundary>
    </div>
  )
}
