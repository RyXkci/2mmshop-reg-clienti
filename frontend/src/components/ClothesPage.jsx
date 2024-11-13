import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ClothesPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    topSize: "",
    trouserWaist: "",
    shoeSize: "",
  });

  const [clothes, setClothes] = useState([
    { id: 1, type: "top", size: "m", sex: "m", price: 50 },
    { id: 2, type: "trouser", size: 32, sex: "f", price: 55 },
    { id: 3, type: "top", size: "s", sex: "f", price: 45 },
    { id: 4, type: "shoes", size: 43, sex: "m", price: 60 },
    { id: 5, type: "trouser", size: 42, sex: "m", price: 70 },
    { id: 6, type: "top", size: "l", sex: "m", price: 55 },
    { id: 7, type: "top", size: "xl", sex: "f", price: 65 },
    { id: 8, type: "shoes", size: 39, sex: "f", price: 80 },
    { id: 9, type: "trouser", size: 30, sex: "m", price: 60 },
    { id: 10, type: "top", size: "m", sex: "f", price: 50 },
    { id: 11, type: "top", size: "s", sex: "m", price: 45 },
    { id: 12, type: "trouser", size: 36, sex: "f", price: 75 },
    { id: 13, type: "shoes", size: 42, sex: "m", price: 65 },
    { id: 14, type: "top", size: "l", sex: "f", price: 60 },
    { id: 15, type: "trouser", size: 38, sex: "m", price: 72 },
    { id: 16, type: "shoes", size: 40, sex: "f", price: 68 },
    { id: 17, type: "top", size: "xl", sex: "m", price: 70 },
    { id: 18, type: "top", size: "m", sex: "f", price: 52 },
    { id: 19, type: "trouser", size: 33, sex: "m", price: 65 },
    { id: 20, type: "shoes", size: 44, sex: "f", price: 85 },
  ]);

  const topSize = searchParams.get("topSize");
  const trouserWaist = searchParams.get("trouserWaist");
  const shoeSize = searchParams.get("shoeSize");

  const initializeFilteredClothes = () => {
    return clothes.filter((cloth) => {
      if (cloth.type === "top" && topSize) {
        return cloth.size === topSize;
      }
      if (cloth.type === "trouser" && trouserWaist) {
        return cloth.size === parseInt(trouserWaist, 10);
      }
      if (cloth.type === "shoes" && shoeSize) {
        return cloth.size === parseInt(shoeSize, 10);
      }
      // If no filter is applied for this type, include it
      return !topSize && !trouserWaist && !shoeSize;;
    });
  };

  const [filteredClothes, setFilteredClothes] = useState(
    initializeFilteredClothes
  );

  const filterClothes = (topSize, trouserWaist, shoeSize) => {
    // Apply filters based on individual criteria for each type
    setFilteredClothes(
      clothes.filter((cloth) => {
        if (cloth.type === "top" && topSize) {
          return cloth.size === topSize;
        }
        if (cloth.type === "trouser" && trouserWaist) {
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
      <button onClick={() => filterClothes(null, 42, 43)}>Filter Shoes - Size 43 and trouser 42</button>
    </div>
  );
}
