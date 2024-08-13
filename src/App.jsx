import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
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



  const filterBySize = (param) => {
    //filters rendered data by parameter without losing initial data. Can constantly filter by chosen param;
    const filteredUsers = initialData.filter((user) => user.sizes.tShirt === param)
    setUsers(filteredUsers);
  }


  console.log('users:', users)

  return (
    <>
      <ul>
        {users.map((user) => {
          return (
            <li>
              {user.name} - t-shirt size: {user.sizes.tShirt}
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => {
          filterBySize("s");
        }}
      >
        filter by s
      </button>
      <button
        onClick={() => {
          filterBySize("m");
        }}
      >
        filter by m
      </button>
      <button
        onClick={() => {
          filterBySize("l");
        }}
      >
        filter by l
      </button>
    </>
  );
}

export default App;
