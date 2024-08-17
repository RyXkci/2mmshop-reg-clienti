import { useState, useMemo, useEffect} from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { COLUMNS } from "./columns";
 
 
 export default function TanTable() {
    const columns = useMemo(() => COLUMNS)
    const [data, setData] = useState([]);

    useEffect(() => {
    const getData = async() => {
            const response = await fetch("http://localhost:3000/users");
             const json = await response.json();
             setData(json)
    }
    getData()
    }, [])


    const tableInstance = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })
    const {
       
        getHeaderGroups,
        getRowModel,
    } = tableInstance;

    console.log(data)
    return (
      <main className="main">
        <table>
            <thead>
               {getHeaderGroups().map(headerGroup =>(
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th className={header.column.columnDef.meta?.className ?? ""} key={header.id}>
                            {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                        </th>
                    ))}
                </tr>
               ))}
            </thead>
            <tbody>
              {getRowModel().rows.map(row => {
                 return <tr key={row.id}>
                 {row.getVisibleCells().map((cell) => (
                   <td key={cell.id}>
                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
                   </td>
                 ))}
               </tr>
              })}
            </tbody>
        </table>
        </main>
        // <table>
        //     <thead>
        //         {headerGroups.map((headerGroup)=>(
        //             <tr {...headerGroup.getHeaderGroupProps()}>
        //                 {headerGroup.headers.map((column)=>(
        //                     <th {...column.getHeaderProps()}>{column.render('Header')}</th>
        //                 ))}
        //             </tr>
        //         ))}
        //     </thead>
        //     <tbody {...getTableBodyProps()}>
        //        {rows.map(row => {
        //         prepareRow(row)
        //         return (
        //             <tr {...row.getRowProps()}>
        //                 {row.cells.map(cell => {
        //                     return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
        //                 })}
        //             </tr>
        //         )
        //        })}
        //     </tbody>
        // </table>

    )

 }