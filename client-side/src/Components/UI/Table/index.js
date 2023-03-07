import React from 'react'
import { Table } from 'react-bootstrap';

 const index=({className, cols,data, error,_edit,_delete, loading}) =>{
    if (!Array.isArray(data)) {
        return <p>No Table Data</p>;
      }
  const renderHeader=()=>{
   return (
    <thead>
    <tr>
    {cols.map(header=>{
     return(
         <th scope='col' key={header}> {header.toUpperCase().replace("_", ' ')}
         </th>
       );
    })}
    <th colSpan={2}>Actions</th>
    </tr>
  </thead>
   )
  }

  const renderBody=()=>{
    return (
        <tbody>
            {  
                data?.length===0? (
                    <tr><td colSpan={cols.length}>{`${error}`}</td></tr> 
                    ):(
                    data?.map((item)=>{
                    return(
                        <tr key={item.id}>
                            {cols.map((column)=>{
                            return (
                                <>
                                <td key={column}>{item[column]} </td>
                                </>
                            )
                            })}
                            <td> <i className=" fas fa-edit"    onClick={()=>_edit(item.id)  } style={{color:'green'}}></i>  </td>
                            <td > <i className='btn ' onClick={()=>_delete(item.id)}> <i className="fas fa-trash"  style={{color:'red'}}></i> </i></td>
                        </tr>
                    )
                    }))
            }  
     </tbody>
    )
  }



  return (
   <Table className={className}>
         {renderHeader()}
        {renderBody()}
       
   </Table>
  )
}
export default  index;
