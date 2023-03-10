import React, { useState , useContext} from 'react'
import InputField from '../../Components/UI/Input';
import Button from '../../Components/UI/Buttons'
import Dropdown from '../../Components/UI/Dropdown';
export default function Itemform({handleSubmit, handleValueChange, values,}) {
  return (
    <form className='form-inline' onSubmit={handleSubmit}>
        <div className='form-group row'>
            <div className='col'>


                <div className="input-group mb-2">
                    <InputField  className="form-control" 
                            type="text" 
                            name="item_name" 
                            placeholder="item name" 
                            value={values.item_name}
                            onChange={handleValueChange} />
                </div> 
            </div>
            
            <div className='col'>
                <div className="input-group mb-2"> 
                <select name='item_category'  onChange={handleValueChange} className='form-control'>
                    <option> Please select category</option>
                    <option value='charger'>charger</option>
                    <option value='phone'>phone</option>
                    <option value='laptop'>laptop</option>
                </select>

                    {/* <Dropdown  
                            data={data} 
                            name="item_category"
                            placeholder="item category" 
                            onChange={handleValueChange}
                            className="form-control"
                            value={values.category}
                            /> */}
                
                </div> 
            </div>
        </div>
        <div className='form-group row'>
        <div className='col'>
            <div className="input-group mb-2"> 
                <InputField  className="form-control" 
                    type="number" 
                    name="min_qty" 
                    placeholder="min item qty" 
                    value={values.min_qty}
                    onChange={handleValueChange}
                    />
            </div> 
        </div>

        <div className='col'>
            <div className="input-group mb-2">
                <select className='form-control' name="item_unit">
                    <option defaultValue>Select Unit</option>
                    <option value="piece">Piece</option>
                    <option value="kg">Kg</option>
                </select>
            </div> 
        </div>
            
        </div>
        <div className='form-group row'>
            <div className='col'>
                <div className="input-group mb-2">
                    <InputField  className="form-control" 
                            type="textarea" 
                            name="item_description" 
                            placeholder="Item description" 
                            value={values.item_description}
                            onChange={handleValueChange} />
                </div> 
            </div>
        </div>
        
        <div className='form-group row'>
            <input  className="btn btn-success" 
                    type="submit" 
                    value="Add Item"
                    style={{textShadow:"none", 
                    height:'40px',
                    width:"150px",
                    color:'white', 
                    borderRadius:"10px",
                    textCenter:"center",
                    marginLeft:'50%',
                    display: "flex", alignItems: "center", justifyContent: "center" 
                }}
                />
            {/* <Button  
                    className="btn btn-success" 
                    type="submit" 
                    value="Add Item"
                    style={{textShadow:"none", 
                    height:'40px',
                    width:"150px",
                    color:'white', 
                    borderRadius:"10px",
                    textCenter:"center",
                    marginLeft:'50%',
                    display: "flex", alignItems: "center", justifyContent: "center" 
                }}
                /> */}
        </div> 
    </form>
  )
}
