import { useState } from "react";
import { v4 as uuid } from "uuid";

import "../stylesheets/clothes-upload.css";

import ClothesForm from "./ClothesForm";
import {
  clothesValues,
  clothesSizes,
  registerOptions,
} from "../utils/clothesFormUtils";

export default function ClothesUpload() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [clothesImages, setClothesImages] = useState([]);

  const [clothes, setClothes] = useState([]);

  const [sizeOptions, setSizeOptions] = useState([]);

  const [isToggled, setIsToggled] = useState(false)

  // const [clothesData, setClothesData] = useState({
  //   type: "",
  //   sex: "",
  //   size: "",
  //   images: [],
  //   price: "",
  //   discountedPrice: "",
  // });

  // const [image, setImage] = useState();
  const [images, setImages] = useState([]);

  const [status, setStatus] = useState("initial");

  // const handleFileChange = (e) => {
  //   if (e.target.files) {
  //     let imageArr = [];
  //     setStatus("initial");
  //     setClothesImages(e.target.files);

  //     // setClothesData((prevClothesData) => {
  //     //   return {
  //     //     ...prevClothesData,
  //     //     images: e.target.files,
  //     //   };
  //     // });
  //     for (let i = 0; i < e.target.files.length; i++) {
  //       imageArr.push(URL.createObjectURL(e.target.files[i]));
  //     }
  //     console.log(imageArr);
  //     setImages(imageArr);
  //   }
  // };

  // const handleChange = (e) => {
  //   setClothesData((prevClothesData) => {
  //     return {
  //       ...prevClothesData,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };

  const handleToggle = (type) => {
    console.log(type)
setSizeOptions(clothesSizes[type]);
console.log(sizeOptions)
clothesValues.type = type
console.log(clothesValues)
setIsToggled(!isToggled)
// console.log(sizeOptions)
  }


  const handleSave = (newClothes) => {
    console.log(newClothes);
    setClothes((prevClothes) => {
      return [...prevClothes, newClothes];
    });
  };

  const handleDiscountChange = (e) => {
    const discount = parseFloat(e.target.value) || 0; // Treat input as a number
    const price = parseFloat(clothesData.price) || 0; // Ensure price is a number

    const newDiscountedPrice = price - (price * discount) / 100;

    setClothesData((prevData) => ({
      ...prevData,
      discountedPrice: newDiscountedPrice.toFixed(2), // Format to 2 decimal places
    }));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    clothes.forEach((item, index) => {
      // Append the clothing object's metadata
      formData.append(`clothing[${index}][type]`, item.type);
      formData.append(`clothing[${index}][size]`, item.size);
      formData.append(`clothing[${index}][price]`, item.price);
      formData.append(
        `clothing[${index}][discountedPrice]`,
        item.discountedPrice
      );
      formData.append(`clothing[${index}][sex]`, item.sex);

      // Append each image for the current clothing object
      Array.from(item.images).forEach((image, imgIndex) => {
        formData.append(`clothing[${index}][images]`, image);
      });
    });
    // console.log(formData)
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      const response = await fetch(`${apiUrl}/api/clothing`, {
        method: "POST",

        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response:", result);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <main className="main">
      <h1 className="title">
        Ciao Giordano! Inizia a caricare la promo del mese!
      </h1>

      <section className="clothes-upload-buttons">
        <button onClick={() => handleToggle('top')}>Carica top</button>
        <button onClick={() => handleToggle('trousers')}> Carica pantalone</button>
        <button onClick={() => handleToggle('shoes')}>Carica scarpe</button>
      </section>

      {/* {clothes && (
        <button onClick={handleUpload} className="submit">
          Invia {clothesImages.length > 1 ? "files" : "file"}
        </button>
      )} */}

      <section className="clothes-upload-section">
        <div className="clothes-details">
          {isToggled && (
            <ClothesForm
              sizes={sizeOptions}
              values={clothesValues}
              registerOptions={registerOptions}
              handleSave={handleSave}
            />
          )}

          {/* <form className="clothes-form">
            <div className="image-input">
              <input
                id="file"
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </div>
            {images && (
          <div className="images-container">
            {images.map((image) => {
              return (
                <img
                  src={image}
                  alt=""
                  style={{ width: "100px", display: "block" }}
                  key={uuid()}
                />
              );
            })}
          </div>
        )}

            <div className="clothes-type-input">
              <label htmlFor="clothesType">Tipo:</label>
              <input
                type="text"
                id="clothesType"
                name="type"
                value={clothesData.type}
                onChange={handleChange}
              />
            </div>
            <div className="clothes-size-input">
              <label htmlFor="clothesSize">Misura</label>
              <select
                name="size"
                value={clothesData.size}
                onChange={handleChange}
                id="clothesSize"
              >
                <option value="xs">xs</option>
                <option value="s">s</option>
                <option value="m">m</option>
              </select>
            </div>
            <div className="clothes-sex-input">
              <label htmlFor="clothesSex">Sesso:</label>
              <select
                name="sex"
                value={clothesData.sex}
                onChange={handleChange}
                id="clothesSex"
              >
                <option value="m">m</option>
                <option value="f">f</option>
              </select>
            </div>
            <div className="clothes-price-input">
              <label htmlFor="price">Prezzo</label>
              <input
                type="number"
                name="price"
                value={clothesData.price}
                onChange={handleChange}
              />
              <label htmlFor="discount">Sconto (%):</label>
              <input
                type="number"
                name="discount"
                onChange={handleDiscountChange}
                placeholder="Inserisci sconto"
              />
            </div>
            <button onClick={() => handleSave(clothesData)}>Salva</button>
          </form> */}

          {/* <label htmlFor="clothesType">Tipo:</label>
        <input type="text" id="clothesType" name="type" value={clothesData.type} onChange={handleChange}/>
        <label htmlFor="clothesSize">Misura</label>
       <select name="size" value={clothesData.size} onChange={handleChange} id="clothesSize">
        <option value="xs">xs</option>
        <option value="s">s</option>
        <option value="m">m</option>
       </select>
       <label htmlFor="clothesSex">Sesso:</label>
       <select name="sex" value={clothesData.sex} onChange={handleChange} id="clothesSex">
        <option value="m">m</option>
        <option value="f">f</option>
       </select>
       <label htmlFor="price">Prezzo</label>
       <input type="number" name="price" value={clothesData.price} onChange={handleChange} />
       <label htmlFor="discount">Sconto (%):</label>
      <input
        type="number"
        name="discount"
        onChange={handleDiscountChange}
        placeholder="Inserisci sconto"
      /> */}
        </div>

        <div className="clothes-upload-container">
          {/* <div className="input-group">
            <input id="file" type="file" multiple onChange={handleFileChange} />
          </div> */}
        </div>
        {/* 
        {images && (
          <div className="images-container">
            {images.map((image) => {
              return (
                <img
                  src={image}
                  alt=""
                  style={{ width: "100px", display: "block" }}
                  key={uuid()}
                />
              );
            })}
          </div>
        )} */}
      </section>
    </main>
  );
}
