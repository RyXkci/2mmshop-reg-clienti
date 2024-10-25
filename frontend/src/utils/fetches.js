const apiUrl = import.meta.env.VITE_API_URL;
// import { useLogout } from '../hooks/useLogout'

//  GETS

const getData = async (admin) => {
  // const {logout} = useLogout(setAdmin);
  try {
    const response = await fetch(`${apiUrl}/api/clients`, {
      headers: {
        'Authorization': `Bearer ${admin.token}`
      }
    });
 
    if(!response.ok) {
      localStorage.removeItem("admin");
    setAdmin(null);
      throw new Error('error');
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
        const response = await fetch(`${apiUrl}/api/clients`, {
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
        console.log(error)
      return {error}
      }
  }

  export {getData, postData}