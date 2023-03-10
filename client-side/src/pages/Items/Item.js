import React, { useEffect, useState, useContext } from 'react';
import Itemform from './Itemform';
import Card from '../../Components/UI/Cards'
import Modal from '../../Components/UI/Modals'
import Table1 from '../../Components/UI/Table';
import swal from 'sweetalert'
import { useFetchItems,useItemAdd, useItemRemove,useFetchUpdateItem } from '../../api/item/useItemApi';
export default function Item() {
  const[show, setShow]=useState(false);
  const showModal=()=>setShow(true);
  const closeModal=()=>setShow(false)
  const [items, setItems]=useState([])
  const {getItems}=useFetchItems()
  const {addItem}= useItemAdd()
  const{removeItem}=useItemRemove();
  const{getUpdateItem}= useFetchUpdateItem()
  const [values, setValues]=useState({ item_name:"", item_category:"",  min_qty:"",item_unit:'',item_description:"" });
      useEffect(() => {
        const fetchItems = async () => {
          const items= await getItems();
          setItems(items.data);
        };
        fetchItems();
      }, [items]);
    
      const handleEdit = (id) => {
        alert(id)
        getUpdateItem(id).then((response)=>{
           console.log(response);
        }).catch(error=>{
          console.log(error);
        })
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
            removeItem(id).then(((response)=>{
              swal({
                     text:response.data,
                     title:'Success',
                     icon:"success",
                     timer:3000
                   });
            }))
            .catch((error)=>{
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
      // console.log(user.id)
      const handleValueChange=(e)=>{
              let name=e.target.name
              let value=e.target.value
              const newValues={
                  ...values,
                [name]:value,
              }
              setValues(newValues);
          }
      
  const createItem=async()=>{
    const response= await addItem(values);
    if(response.data.error){
      swal({
        text:response.data.error,
        title:'Warning!',
        icon:"warning",
        timer:3500
      })
     
    }
    else{
      swal({
        text:response.data,
        title:'Success',
        icon:"success",
        timer:3000
      });
      setValues({
      item_name:"", item_category:"",  min_qty:"",item_unit:'',item_description:"", 
      });
      closeModal();
    }
  }
  const handleSubmit=(ev)=>{
    ev.preventDefault()
    createItem();
  }

  return (
    <div>
      <Table1  data={items}  _edit={handleEdit} _delete={handleDelete}   showModal={showModal}
         className='table table-striped table-bordered hover' 
      />

      <Modal  show={show} onClose={closeModal} header="Add Item Modal"  footer="item modal">
        <Card _cardName="Create Item">
        <Itemform data={items} values={values} handleValueChange={handleValueChange} handleSubmit={handleSubmit} />
        </Card>
      </Modal>
    </div>       
        
  );
}

