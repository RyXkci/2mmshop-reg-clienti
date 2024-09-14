import { useState, useMemo, useEffect} from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { COLUMNS } from "./columns";
 
import { getData } from "../utils/fetches";
 
 export default function TanTable() {
    const columns = useMemo(() => COLUMNS)
    const [data, setData] = useState([]);
    const [columnFilters, setColumnFilters] = useState([])

    useEffect(() => {
      const fetchData = async() => {
        const response = await getData()
        if (!response.error) {
          setData(response)
        } else {
          console.log(response)
        }
      }
      fetchData()
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