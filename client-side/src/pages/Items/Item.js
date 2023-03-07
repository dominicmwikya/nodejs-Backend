import React, { useEffect, useState } from 'react';
import Itemform from './Itemform';
import Card from '../../Components/UI/Cards'
import Modal from '../../Components/UI/Modals'
import Table1 from '../../Components/UI/Table';
import swal from 'sweetalert'
import { useFetchItems,useItemAdd } from '../../api/item/useItemApi';
export default function Item() {
  const[show, setShow]=useState(false);
  const showModal=()=>setShow(true);
  const closeModal=()=>setShow(false)
  const [items, setItems]=useState([])
  const {getItems}=useFetchItems()
  const {addItem}= useItemAdd()
  const [values, setValues]=useState({ item_name:"", item_category:"",  min_qty:"",item_unit:'',item_description:"" });
  const fetchItems = async () => {
      const items= await getItems();
      setItems(items.data);
    };
      useEffect(() => {
  
        fetchItems();
      }, [fetchItems]);

      const cols=['id', 'item_name','item_category','qty','min_qty', 'user'
      ];

      const handleEdit = (id) => {
        // handle edit logic here
    
        alert(id)
      };
    
      const handleDelete = (id) => {
        // handle delete logic here
        alert(id)
      };
      
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
    if(response.data){
      closeModal();
      swal({
        text:response.data,
        title:'Success',
        icon:"success",
        timer:3000
      });
      setValues({
      item_name:"", item_category:"",  min_qty:"",item_unit:'',item_description:""
      })
    }
  }
  const handleSubmit=(ev)=>{
    ev.preventDefault()
    createItem();
  }

  return (
    <div className='row'>
        <div className='col-md-6'>
          <i className='btn fa fa-plus ' onClick={showModal} 
              style={{color:"green", color:'white', backgroundColor:'green',
              margin: '10px 0px', borderRadius:'5px', padding:'10px 40px'}}>
          </i>
          <Table1 cols={cols} data={items}  _edit={handleEdit} _delete={handleDelete}
            className='table table-striped table-bordered hover' 
          
          />
          <Modal  show={show} onClose={closeModal} header="Add Item Modal"  footer="item modal">
            <Card _cardName="Create Item">
                  <Itemform data={items} values={values} handleValueChange={handleValueChange} handleSubmit={handleSubmit} />
              </Card>
          </Modal>
        </div>
    </div>
  );
}

