//  GETS

const getData = async (admin) => {
  try {
    const response = await fetch("http://localhost:4000/api/clients", {
      headers: {
        'Authorization': `Bearer ${admin.token}`
      }
    });
 
    if(!response.ok) {
      throw new Error('testing error msg');
    }
    const json = await response.json();
    return json;

  } catch (error) {
    console.log({error})
    return {error}
  }
  
  };

  // POSTS
  const postData = async(newClient) => {
    try {
        const response = await fetch("http://localhost:4000/api/clients", {
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