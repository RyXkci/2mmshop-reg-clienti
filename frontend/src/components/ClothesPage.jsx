import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ClothesPage() {


  const [searchParams, setSearchParams] = useSearchParams();

  const topSize = searchParams.get("topSize");
  const trouserWaist = searchParams.get("trouserWaist");
  const shoeSize = searchParams.get("shoeSize");

  console.log(topSize);

  const [clothes, setClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([])
 

  useEffect(() => {
    const fetchClothes = async() => {
       const response = await fetch(`${apiUrl}/api/clothing`);
       const json = await response.json();
       setClothes(json);
      //  setFilteredClothes(json)
      applyFilters(json);
    }

    fetchClothes()
  }, [])

  const applyFilters = (data) => {

    const topSize = searchParams.get("topSize");
    const trouserWaist = searchParams.get("trouserWaist");
    const shoeSize = searchParams.get("shoeSize");
    const sex = searchParams.get("sex")
  
    const filtered = data.filter((cloth) => {
      if (sex && cloth.sex !== sex) return false;
      if (cloth.type === "top" && topSize) return cloth.size === topSize;
      if (cloth.type === "trousers" && trouserWaist) return cloth.size === parseInt(trouserWaist, 10);
      if (cloth.type === "shoes" && shoeSize) return cloth.size === parseInt(shoeSize, 10);
      return !topSize && !trouserWaist && !shoeSize; // Include if no filters apply
    });

    setFilteredClothes(filtered); // Update displayed data
  };

  const filterClothes = (topSize, trouserWaist, shoeSize, sex) => {
    // Apply filters based on individual criteria for each type
    setFilteredClothes(
      clothes.filter((cloth) => {
        if (cloth.type === "top" && topSize) {
          return cloth.size === topSize;
        }
        if (cloth.type === "trousers" && trouserWaist) {
          return cloth.size === trouserWaist;
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

      if (trouserWaist) prevParams.set("trouserWaist", trouserWaist);
      else prevParams.delete("trouserWaist");

      if (shoeSize) prevParams.set("shoeSize", shoeSize);
      else prevParams.delete("shoeSize");

      return prevParams;
    }, { replace: true });
  };

  

  
  return (
    <div>
      <ul>
        {filteredClothes.map((cloth) => {
          return (
            <li key={cloth.id}>
              <p>type:{cloth.type}</p>
              <p>size: {cloth.size}</p>
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