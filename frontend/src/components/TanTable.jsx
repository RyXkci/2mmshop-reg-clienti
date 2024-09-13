import { useState, useMemo, useEffect} from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { COLUMNS } from "./columns";
 
 
 export default function TanTable() {
    const columns = useMemo(() => COLUMNS)
    const [data, setData] = useState([]);
    const [columnFilters, setColumnFilters] = useState([])

    useEffect(() => {
    const getData = async() => {
            const response = await fetch("http://localhost:4000/api/clients");
             const json = await response.json();

             const sortedUsers = json.sort((a, b) => {
              return new Date(b.time) - new Date(a.time);
          });
          console.log(sortedUsers)

             setData(sortedUsers)
    }
    getData()
    }, [])


    const tableInstance = useReactTable({ 
      columns, data, 
      state: {
        columnFilters
      },
      getCoreRowModel: getCoreRowModel(),
     
      getFilteredRowModel: getFilteredRowModel()
    })

    const {
        getHeaderGroups,
        getRowModel,
    } = tableInstance;

    const reset = () => {
      setColumnFilters([])
    }

const onFilterChange = (id, value) => setColumnFilters(
  prev => prev.filter(f => f.id !==id).concat({id, value})
)
   
    return (
      <main className="main">
        <button onClick={reset}>Reset</button>
        <table>
         <thead>
               {getHeaderGroups().map(headerGroup =>(
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th className={header.column.columnDef.meta?.className ?? ""} key={header.id}>
                        
                          {header.column.columnDef.meta.hasFilter === true ?
                          <><label htmlFor={header.id}>{flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}</label> 
                          <select name="header-options" id={header.id}>
                            <option value=""></option>
                          {header.column.columnDef.meta.selectOptions?.map((option) => {
                            return <option
                            key={option}
                            onClick={() => {onFilterChange(`${header.column.columnDef.id}`, `${option}`)}}>{option}
                            </option>
                          })} 
                          </select>
                         
                          </>: 
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                      //        flexRender(
                      //   header.column.columnDef.header,
                      //   header.getContext()
                      // )
                      }
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

        {/* <button
        onClick={() => {
          onFilterChange("tshirt", "s");
        }}
      >
        filter by tshirt s
      </button>
        <button
        onClick={() => {
          onFilterChange("sex", "f");
        }}
      >
        filter by sex f
      </button>
        <button
        onClick={() => {
          onFilterChange("trousers", "38");
        }}
      >
        filter by trousers 38
      </button>
        <button
        onClick={() => {
          onFilterChange("shoes", "42");
        }}
      >
        filter by shoes 42
      </button> */}

        
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