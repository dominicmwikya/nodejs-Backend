import React, { useEffect,useState } from 'react'
import Table1 from '../../Components/UI/Table';
import Modal from '../../Components/UI/Modals'
import Card from '../../Components/UI/Cards'
import Userform from './userform';
import swal from 'sweetalert';
import ReactTable from '../../Components/UI/Table/TableReact'
import { useFetchData, useDeleteUser,usePost } from '../../api/user/UseApi';
import ErrorBoundary from '../../Components/ErrorBoundary';
import { checkTokenExpiration } from '../../Auth/Auth';
export default function Index() {
  const[show, setShow]=useState(false);
  const showModal=()=>setShow(true);
  const closeModal=()=>setShow(false)
  const {getUsers}=useFetchData();
  const {deleteUser}=useDeleteUser();
  const { createUser } = usePost();
  const [userlist, setUserList]=useState([])
  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'username' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'ROLE', accessor: 'role' },
  
  ];
  const fetchUsers = async () => {
    const users= await getUsers();
    setUserList(users.data);
  };

  useEffect(() => {
    fetchUsers();
  },[]);
  
  const handleEdit = (id) => {
    // handle edit logic here
    alert(id)
  };

  const newUser=async(data)=>{
    try {
      const response = await createUser(data);
      swal({
        text:response.data,
        title:'Success',
        icon:'success',
        timer:3000
      })
      closeModal()
      fetchUsers()
    } catch (error) {   
      let errorMessage = 'An unknown error occurred. Please try again later.';
    
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
    
      swal({
        title: 'Failed',
        text: errorMessage,
        icon: 'error',
        timer: 3500
      });
    }
  }

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

    <div className='container'>
        <ErrorBoundary>

       <ReactTable  data={userlist}  columns={columns}   />
        {/* <Table1  data={userlist}   _edit={handleEdit} _delete={handleDelete}
        showModal={showModal}
              className='table table-striped table-bordered hover' 
            /> */}
        </ErrorBoundary>
        <ErrorBoundary>
        <Modal  show={show} onClose={closeModal} header=""  footer="item modal" size='md'>
                <Card _cardName="New User Form">
                    <Userform roles={roles} closeModal={closeModal}  newUser={newUser} />
                </Card>
            </Modal>
        </ErrorBoundary>
      </div>
  )
}
