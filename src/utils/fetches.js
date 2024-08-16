const getData = async () => {
    const response = await fetch("http://localhost:3000/users");
    const json = await response.json();
    if (response.ok) {
        return json
    }
    // setInitialData(json);
    // setUsers(json); //on each initial render all of them
    // console.log(json);
  };

  export {getData}