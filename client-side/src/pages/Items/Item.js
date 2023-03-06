import React, { useEffect, useState } from 'react';
import itemsapi from '../../api/itemsapi'
import useFetch from '../../Hooks/useFetch';
import Itemform from './Itemform';
import Card from '../../Components/UI/Cards'
import Modal from '../../Components/UI/Modals'
import Table1 from '../../Components/UI/Table';
import useDelete from '../../Hooks/useDelete';
export default function Item() {
 const[show, setShow]=useState(false);
 const showModal=()=>setShow(true);
 const closeModal=()=>setShow(false)
    const getItemsApi = useFetch(itemsapi.getItems);
    const deleteItemApi=useDelete(itemsapi.deleteItem)
  
    useEffect(() => {
         getItemsApi.request();
    }, []);

     const cols=['id', 'item_name','item_category','qty','min_qty', 'user'
     ];
    return (
      <div className='row'>
          <div className='col-md-6'>
            <i className='btn fa fa-plus ' onClick={showModal} 
                style={{color:"green", color:'white', backgroundColor:'green',
                margin: '10px 0px', borderRadius:'5px', padding:'10px 40px'}}>
            </i>
            <Table1 cols={cols} data={getItemsApi.data} 
              className='table table-striped table-bordered hover' 
              loading={getItemsApi.loading}   
              error={getItemsApi.error}
              onDelete={deleteItemApi.onDelete}
            />
            <Modal  show={show} onClose={closeModal} header="Add Item Modal"  footer="item modal">
              <Card _cardName="Create Item">
                    <Itemform data={getItemsApi.data}  />
                </Card>
            </Modal>
          </div>
      </div>
    );
}

