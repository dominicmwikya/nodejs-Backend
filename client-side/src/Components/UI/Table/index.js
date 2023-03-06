import React from 'react'
import { Table } from 'react-bootstrap';
 const index=({className, cols,data, error, loading}) =>{
    if (!Array.isArray(data)) {
        return <p>You must be logged in to access this data! Please loggin</p>;
      }
  
  return (
   <Table className={className}>
         <thead>
           <tr>
           {cols.map(header=>{
            return(
                <th scope='col' key={header}> {header.toUpperCase().replace("_", ' ')}
                </th>
            );
           })}
           </tr>
         </thead>
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
                                <td key={column}>{item[column]} </td>
                            )
                            })}
                        </tr>
                    )
                    }))
            }  
         </tbody>
   </Table>
  )
}
export default  index;
