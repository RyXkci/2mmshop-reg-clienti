//  GETS

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

  // POSTS
  const postData = async(newClient) => {
    try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "Application/JSON",
          },
          body: JSON.stringify(newClient),
        });
        const json = await response.json()
        if(!response.ok) {
            throw new  Error("server error")
        }
          return json
      } catch (error) {
      return {error}
      }
  }

  export {getData, postData}