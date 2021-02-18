import React,{Component} from 'react';
import {useTable} from 'react-table';
import {Table} from 'reactstrap';



export default class OrderTable extends Component{
    constructor(props){
        super(props);
        this.props=props; 
    }
    
    
    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     rows,
    //     prepareRow,
    //   } = useTable({
    //     columns,
    //     data,
    //   })
    //   console.log("data is: ",data);
  
    //   const getOrderDetail =(row) =>{
    //     console.log("clickeed");
    //     console.log("row details:",row)
      
    //   }

    // <table {...getTableProps()}>
    //   <thead>
    //     {headerGroups.map(headerGroup => (
    //       <tr {...headerGroup.getHeaderGroupProps()}>
    //         {headerGroup.headers.map(column => (
    //           <th  {...column.getHeaderProps()}>{column.render('Header')}</th>
    //         ))}
    //       </tr>
    //     ))}
    //   </thead>
    //   <tbody {...getTableBodyProps()} className="TableBody">
    //   {console.log("rows",rows)}
    //     {rows.map(
    //       (row, i) => {
    //         prepareRow(row);
    //         return (
    //           <tr  {...row.getRowProps()}>
    //             {row.cells.map(cell => {
    //               return (
    //                   <td onClick={()=>{getOrderDetail(row.cells)}} {...cell.getCellProps()}><a>{cell.render('Cell')}</a></td>)
    //             })}
              
    //           </tr>
    //         )}
    //     )}
    //   </tbody>
    // </table>
 
    render(){
    return(

<Table>
      <thead>
        <tr>
          <th>OrderNo</th>
          <th>Status</th>
          <th>EnterpriseCode</th>
          <th>DocumentType</th>
        </tr>
      </thead>
      <tbody>
       {/* {this.renderTableData()} */}
      </tbody>
    </Table>

    );
}
}