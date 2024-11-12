import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ClothesPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    type: "",
    size: "",
  });



  const [clothes, setClothes] = useState([
    {
      id: 1,
      type: "top",
      size: "m",
      sex: "m",
      price: 50,
    },
    {
      id: 2,
      type: "trouser",
      size: 42,
      sex: "f",
      price: 50,
    },
    {
      id: 3,
      type: "top",
      size: "s",
      sex: "m",
      price: 50,
    },
    {
      id: 4,
      type: "shoes",
      size: 43,
      sex: "f",
      price: 50,
    },
  ]);

  const type = searchParams.get("type");
  const size = searchParams.get("size");

  const initializeFilteredClothes = () => {
    return clothes.filter(
      (cloth) =>
        (type ? cloth.type === type : true) &&
        (size ? cloth.size === size : true)
    );
  };

  const [filteredClothes, setFilteredClothes] = useState(initializeFilteredClothes);

  const filterClothes = (type, size) => {
    setFilteredClothes((prevClothes) => {
      return prevClothes.filter((cloth) => cloth.type === type);
    });
    setSearchParams(
      (prevParams) => {
        prevParams.set("type", type);
        prevParams.set("size", size);
        return prevParams;
      },
      { replace: true }
    );
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
      <button onClick={() => filterClothes("top", "m")}>filter by top</button>
    </div>
  );
}
