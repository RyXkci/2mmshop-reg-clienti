
import { useState, useEffect } from "react";

  export default function Basic() {

    const [initialData, setInitialData] = useState([]);
   const [users, setUsers] = useState([])

    const getData = async () => {
      const response = await fetch("http://localhost:3000/users");
      const json = await response.json();
      setInitialData(json);
      setUsers(json)  //on each initial render all of them
      console.log(json);
    };
  
    useEffect(() => {
      getData();
    }, []);
  
  
  
    const filterBySize = (type, param) => {
      //filters rendered data by parameter without losing initial data. Can constantly filter by chosen param;
      let filteredUsers;
      switch(type) {
        case "tShirt":
          filteredUsers = initialData.filter((user) => user.sizes.tShirt === param)
          setUsers(filteredUsers);
          break;
          case "trousers":
          filteredUsers = initialData.filter((user) => user.sizes.trousers === param)
          setUsers(filteredUsers);
          break;
          case "shoes":
          filteredUsers = initialData.filter((user) => user.sizes.shoes === param)
          setUsers(filteredUsers);
          break;
  
  
  
      }
      
    
    }

    return(
      <>
      <ul>
        {users.map((user) => {
          return (
            <li>
              {user.name} - TSHIRT SIZE: {user.sizes.tShirt} TROUSER SIZE: {user.sizes.trousers} SHOE SIZE: {user.sizes.shoes}
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => {
          filterBySize("tShirt","s");
        }}
      >
        filter by tshirt s
      </button>
      <button
        onClick={() => {
          filterBySize("tShirt", "m");
        }}
      >
        filter by tshirt m
      </button>
      <button
        onClick={() => {
          filterBySize("tShirt", "l");
        }}
      >
        filter by tshirt l
      </button>

      <button
        onClick={() => {
          filterBySize("trousers", 32)}}
      >
        filter by trouser 32
      </button>

      <button
        onClick={() => {
          filterBySize("trousers", 36);
        }}
      >
        filter by trouser 36
      </button>

      <button
        onClick={() => {
          filterBySize("trousers", 38);
        }}
      >
        filter by trouser 38
      </button>
      <button
        onClick={() => {
          filterBySize("shoes", 39);
        }}
      >
        filter by shoes 39
      </button>
      <button
        onClick={() => {
          filterBySize("shoes", 44);
        }}
      >
        filter by shoes 44
      </button>
      <button
        onClick={() => {
          filterBySize("shoes", 46);
        }}
      >
        filter by shoes 46
      </button>
    </>
    )

  }


  
  