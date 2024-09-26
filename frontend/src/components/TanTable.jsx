import { useState, useMemo, useEffect} from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { COLUMNS } from "./columns";
 
import { getData } from "../utils/fetches";
 
 export default function TanTable() {
    const columns = useMemo(() => COLUMNS)
    const [data, setData] = useState([]);
    const [columnFilters, setColumnFilters] = useState([])

    useEffect(() => {
      const admin = JSON.parse(localStorage.getItem("admin"));
      console.log(admin) 
      const fetchData = async() => {
        const response = await getData(admin)
        if (!response.error) {
          setData(response)
        } else {
          console.log(response)
        }
      }

      if (admin) {
        fetchData()
      }
    
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

// const onFilterChange = (id, value) => setColumnFilters(
//   prev => prev.filter(f => f.id !==id).concat({id, value})
// )

const onFilterChange = (id, event) => {
  const value = event.target.value; // Get the value from the event
  setColumnFilters(prev => 
    prev.filter(f => f.id !== id) // Remove existing filter with the same id
       .concat({ id, value })      // Add the new filter
  );
};

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
                          <select 
                          name="header-options" 
                          id={header.id}
                          onChange={(event) => {onFilterChange(header.id, event)}}
                          >
                            <option value=""></option>
                            
                          {header.column.columnDef.meta.selectOptions?.map((option) => {
                            return <option
                            key={option}
                            value={option}
                            >{option}
                            </option>
                          })} 
                          </select>
                         
                          </>: 
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
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


        
        </main>

    )

 }