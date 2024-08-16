import { useState, useEffect } from "react";

export default function Table() {
  const [initialData, setInitialData] = useState([]);
  const [users, setUsers] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:3000/users");
    const json = await response.json();
    setInitialData(json);
    setUsers(json); //on each initial render all of them
    console.log(json);
  };

  useEffect(() => {
    getData();
  }, []);

  const filterBySize = (type, param) => {
    //filters rendered data by parameter without losing initial data. Can constantly filter by chosen param;
    let filteredUsers;
    switch (type) {
      case "tShirt":
        filteredUsers = initialData.filter(
          (user) => user.sizes.tShirt === param
        );
        setUsers(filteredUsers);
        break;
      case "trousers":
        filteredUsers = initialData.filter(
          (user) => user.sizes.trousers === param
        );
        setUsers(filteredUsers);
        break;
      case "shoes":
        filteredUsers = initialData.filter(
          (user) => user.sizes.shoes === param
        );
        setUsers(filteredUsers);
        break;
    }
  };

  return (
<main className="main">

    <table className="table">
        <thead>
            <tr>
                <th className="th-dark">Nome</th>
                <th className="th-dark">Telefono</th>
                <th className="th-light">Maglietta</th>
                <th className="th-light">Pantaloni</th>
                <th className="th-light">Scarpe</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => {
                return <tr>
                    <td data-cell="nome">{user.name}</td>
                    <td data-cell="telefono">{user.number}</td>
                    <td data-cell="maglietta">{user.sizes.tShirt}</td>
                    <td data-cell="pantaloni">{user.sizes.trousers}</td>
                    <td data-cell="scarpe">{user.sizes.shoes}</td>
                </tr>
            })}
        </tbody>
    </table>

    <button
        onClick={() => {
          filterBySize("tShirt","s");
        }}
      >
        filter by tshirt s
      </button>
</main>
  )
}
