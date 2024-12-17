import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ClothesPage() {


  const [searchParams, setSearchParams] = useSearchParams();

  const topSize = searchParams.get('top');
  const trouserSize = searchParams.get('tp');
  const shoeSize = searchParams.get('ts');
  const sex = searchParams.get('s');
  const id = searchParams.get('id')

  console.log('top size is:', topSize);
  console.log('waist is:', trouserSize);
  console.log('shoe size is:', shoeSize);
  console.log('sex is', sex);
  console.log('id is', id);

  const [clothes, setClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [clientName, setClientName] = useState('');
 

  useEffect(() => {
    const fetchClothes = async() => {
       const response = await fetch(`${apiUrl}/api/clothing`);
       const json = await response.json();
       console.log(json)
       setClothes(json);
      //  setFilteredClothes(json)
      applyFilters(json);
    }

    fetchClothes()
  }, [])

  // useEffect(() => {
  //   const fetchClientName = async() => {
  //     const response = await fetch(`${apiUrl}/api/clients/${id}`);
  //     const json = await response.json();
  //     setClientName(json);
      
  //   }

  //   fetchClientName()
  // })

  const applyFilters = (data) => {

    // const topSize = searchParams.get("topSize");
    // const trouserWaist = searchParams.get("trouserWaist");
    // const shoeSize = searchParams.get("shoeSize");
    // const sex = searchParams.get("sex")
    console.log(data)
  
    const filtered = data.filter((cloth) => {
      if (sex && cloth.sex !== sex) return false;
      if (cloth.type === "top" && topSize) return cloth.sizes.includes(topSize);
      // if (cloth.type === "trousers" && trouserWaist) return cloth.size === parseInt(trouserWaist, 10);
      if (cloth.type === "trousers" && trouserSize) return cloth.sizes.includes(parseInt(trouserSize))
      if (cloth.type === "shoes" && shoeSize) return cloth.sizes.includes(parseInt(shoeSize));
      return !topSize && !trouserSize && !shoeSize; // Include if no filters apply
    }).map((cloth) => {
      // Extract only the relevant size for the filtered item
      if (cloth.type === "top" && topSize) {
        return { ...cloth, sizes: [topSize] }; // Keep only the matching top size
      }
      if (cloth.type === "shoes" && shoeSize) {
        return { ...cloth, sizes: [parseInt(shoeSize, 10)] }; // Keep only the matching shoe size
      }
      if (cloth.type === "trousers" && trouserSize) {
        return {...cloth, sizes: [parseInt(trouserSize, 10)] }
      }
      // return cloth; // For trousers or unfiltered items, return as is
    });

    setFilteredClothes(filtered); // Update displayed data
    console.log("FILTERED CLOTHES ARE:", filteredClothes)
  };

  const filterClothes = (topSize, trouserWaist, shoeSize, sex) => {
    // Apply filters based on individual criteria for each type
    setFilteredClothes(
      clothes.filter((cloth) => {
        if (cloth.type === "top" && topSize) {
          return cloth.size === topSize;
        }
        if (cloth.type === "trousers" && trouserSize) {
          return cloth.size === trouserSize;
        }
        if (cloth.type === "shoes" && shoeSize) {
          return cloth.size === shoeSize;
        }
        // If no filter for this type, include the item
        return false;
      })
    );


    // Update URL parameters for each filter type
    setSearchParams((prevParams) => {
      if (topSize) prevParams.set("topSize", topSize);
      else prevParams.delete("topSize");

      if (trouserWaist) prevParams.set("trouserWaist", trouserSize);
      else prevParams.delete("trouserWaist");

      if (shoeSize) prevParams.set("shoeSize", shoeSize);
      else prevParams.delete("shoeSize");

      return prevParams;
    }, { replace: true });
  };

  const filterSize = (sizes, clientSize) => {
    console.log("SIZES ARE:",sizes, "CLIENT SIZE IS:", clientSize)
    // const filteredSize = sizes.filter((item) => item === clientSize)
    // console.log(filteredSize)
return sizes.filter((item) => item === clientSize)
  }

  
  
  return (
    
    <div>
    {clientName && <p>Ciao {clientName}!</p>}
      <ul>
        {filteredClothes.map((cloth) => {
          return (
            <li key={cloth.id}>
              <p>name: {cloth.category}</p>
              <p>type:{cloth.type}</p>
              <p>size: {cloth.sizes.join(',')}</p>
              {/* <p>size: {filterSize(cloth.sizes, topSize).join()}</p> */}
            
              <p>sex: {cloth.sex}</p>
              <p>price:{cloth.price}</p>
            </li>
          );
        })}
      </ul>
      <button onClick={() => filterClothes("m", null, null)}>Filter Tops - Size M</button>
      <button onClick={() => filterClothes(null, 42, null)}>Filter Trousers - Waist 42</button>
      <button onClick={() => filterClothes(null, null, 43)}>Filter Shoes - Size 43</button>
      <button onClick={() => filterClothes(null, 52, 40)}>Filter Shoes - Size 43 and trouser 52</button>
    </div>
  );
}



    // setFilteredClothes(
    //   clothes.filter((cloth) => {
    //     if (cloth.type === "top" && topSize) {
    //       return cloth.size === topSize;
    //     }
    //     if (cloth.type === "trousers" && trouserWaist) {
    //       return cloth.size === trouserWaist;
    //     }
    //     if (cloth.type === "shoes" && shoeSize) {
    //       return cloth.size === shoeSize;
    //     }
    //     // If no filter for this type, include the item
    //    return true;
    //   })
    // );