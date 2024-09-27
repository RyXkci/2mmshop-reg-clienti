import { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { COLUMNS } from "./columns";

import '../stylesheets/navbar.css'

import { getData } from "../utils/fetches";
// import { useLogin } from "./Login";

// import Login from "./Login";

import Navbar from "./Navbar";
import AccessDenied from './AccessDenied'

export default function TanTable() {
  const [admin, setAdmin] = useState(null)
  const columns = useMemo(() => COLUMNS);
  const [data, setData] = useState([]);

  const [columnFilters, setColumnFilters] = useState([]); //State for column filters. Initially empty
  const [selectValues, setSelectValues] = useState({}); // State to track selected values for each header

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin")); //checking auth
    const fetchData = async () => {
      const response = await getData(admin);
      if (!response.error) {
        setAdmin(admin)
        console.log(admin)
        setData(response);
      } else {
        return;
        // console.log(response)
      }
    };

    if (admin) {
      fetchData();
    }
  }, []);

  const tableInstance = useReactTable({
    columns,
    data,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
  });

  const { getHeaderGroups, getRowModel } = tableInstance;

  const onFilterChange = (id, event) => {
    const value = event.target.value; // Get the value from the event
    setColumnFilters(
      (prev) =>
        prev
          .filter((f) => f.id !== id) // Remove existing filter with the same id
          .concat({ id, value }) // Add the new filter
    );
    setSelectValues((prev) => ({ ...prev, [id]: value }));
  };

  const reset = () => {
    setColumnFilters([]); //reset all filters to empty
    setSelectValues({}); //reset all select dropdowns to empty
  };

  const logOut = () => {
    localStorage.removeItem('admin');
    setAdmin(null)
  }

  return (
    <main className="main">
      {admin ? (
        <>
        <Navbar
        reset={reset} 
        logOut={logOut}/>
        {/* <nav className="navbar">
          <div className="navbar-inner">
          <button className="nav-button nav-button-light" onClick={reset}>Reset</button>
          <button className="nav-button nav-button-danger" onClick={logOut}>Log out</button>
          </div>
        </nav> */}
  
  <table>
    <thead>
      {getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            //dynamically add classes for background based on metadata
            <th
              className={header.column.columnDef.meta?.className ?? ""}
              key={header.id}
            >
              {header.column.columnDef.meta.hasFilter === true ? ( //checks if columns has filter in metadata. Not all columns should be filterable
                <>
                  <label htmlFor={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </label>
                  <select
                    name="header-options"
                    value={selectValues[header.id] || ""} //changes value to header.id to easily revert to empty
                    id={header.id}
                    onChange={(event) => {
                      onFilterChange(header.id, event);
                    }}
                  >
                    <option value=""></option> //inital empty option //
                    mapping over filterable columns to make options for
                    dropdown based on metadata
                    {header.column.columnDef.meta.selectOptions?.map(
                      (option) => {
                        return (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        );
                      }
                    )}
                  </select>
                </> //non filterable columns just render headers with no select dropdown
              ) : (
                flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
      {getRowModel().rows.map((row) => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
  </>
      ) : (
        <AccessDenied/>
      )}
    
    </main>
  );
}
