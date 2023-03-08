import React, {useState}from 'react'
import { Table } from 'react-bootstrap';

 const Index=({className, cols,data, error,_edit,_delete}) =>{
    const [currentPage, setCurrentPage] = useState(1);
    const[currentIndex, setCurrentIndex]=useState(1);
    const [rowsPerPage] = useState(6);
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <p>No data available.</p>;
      }

 const columns = Object.keys(data[0]);
 const indexOfLastRow = currentPage * rowsPerPage;
 const indexOfFirstRow = indexOfLastRow - rowsPerPage;
 const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

 const totalPages = Math.ceil(data.length / rowsPerPage);
 const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const newIndex = (pageNumber - 1) * rowsPerPage + 1;
    setCurrentIndex(newIndex);
  };

 const renderHeader=()=>{
   return (
    <thead>
    <tr>
        <th>#ID</th>
    {columns.map((column) => (
            <th key={column}>{column.toLocaleUpperCase().replace("_", '  ')}</th>
          ))}
    <th colSpan={2}>Actions</th>
    </tr>
  </thead>
   )
  }

  const renderBody=()=>{
    return (
        <tbody>
             {currentRows.map((row, index) => (
          <tr key={index}>
            <td>#{currentIndex+ index}</td>
            {columns.map((column) => (
               <td key={column}>{row[column]}  </td>
            ))}
             
              <td> <i className=" fas fa-edit"    onClick={()=>_edit(row.id)  } style={{color:'green'}}></i>  </td>
              <td > <i className='btn ' onClick={()=>_delete(row.id)}> <i className="fas fa-trash"  style={{color:'red'}}></i> </i></td>
          </tr>
        ))}
     </tbody>
    )
  }



  return (
<>
<Table className={className}>
         {renderHeader()}
        {renderBody()}
        
   </Table>
   <div>
   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
     <button key={page} onClick={() => handlePageChange(page)}>
       {page}
     </button>
   ))}
 </div>
</>
  )
}
export default  Index;
