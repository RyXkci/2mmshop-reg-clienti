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

  const [isToggled, setIsToggled] = useState(false);

  const [clothesData, setClothesData] = useState({
    type: "",
    sex: "",
    size: "",
    images: [],
    price: "",
    discountedPrice: "",
  });

  // const [image, setImage] = useState();
  const [images, setImages] = useState([]);

  const [status, setStatus] = useState("initial");

  const handleFileChange = (e) => {
    if (e.target.files) {
      let imageArr = [];
      setStatus("initial");
      for (let i = 0; i < e.target.files.length; i++) {
        imageArr.push(URL.createObjectURL(e.target.files[i]));
      }
      console.log(imageArr);
      setImages(imageArr);
    }
  };


  const handleToggle = (type) => {
    console.log(type);
    setSizeOptions(clothesSizes[type]);
    console.log(sizeOptions);
    clothesValues.type = type;
    console.log(clothesValues);
    setIsToggled(!isToggled);
    // console.log(sizeOptions)
  };

  const handleSave = (newClothes) => {
    console.log("Clothes are", newClothes);
    // CALCULATING AND SAVING THE DISCOUNTED PROCE
    const price = parseFloat(newClothes.price);
    const discount = parseFloat(newClothes.discount);
    newClothes.discountedPrice = price - (price * discount) / 100;

    //ADDING IMAGE PREVIEW ARR
    let imageArr = [];
    setStatus("initial");
    for (let i = 0; i < newClothes.images.length; i++) {
      imageArr.push(URL.createObjectURL(newClothes.images[i]));
    }
    console.log(imageArr);
    newClothes.imgPreviews = imageArr;
    // ADDING THE NEW OBJECT TO CLOTHES STATE
    setClothes((prevClothes) => {
      return [...prevClothes, newClothes];
    });
    // SETTING THE INITIAL PREVIEW BACK TO EMPTY ARRAY
    setImages([]);

    // REMOVING AND EMPTYING FORM
    setIsToggled(false);
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
      <section className="clothes-upload-section">
      <h1 className="title">
        Ciao Giordano! Inizia a caricare la promo del mese!
      </h1>

      <section className="clothes-upload-buttons">
        <button onClick={() => handleToggle("top")}>Carica top</button>
        <button onClick={() => handleToggle("trousers")}>
          {" "}
          Carica pantalone
        </button>
        <button onClick={() => handleToggle("shoes")}>Carica scarpe</button>
      </section>


      <section className="clothes-upload-section">
        {images.length > 1 && (
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
        <div className="clothes-details">
          {isToggled && (
            <ClothesForm
              sizes={sizeOptions}
              values={clothesValues}
              registerOptions={registerOptions}
              handleFileChange={handleFileChange}
              handleSave={handleSave}
            />
          )}
          </div>
          </section>

          {clothes && (
            <section className="clothes-section">
              <h1>Vestiti caricati:</h1>
              {clothes.map((item) => {
                return (
                  <div key={uuid()} className="clothes-container">
                    <div
                      key={uuid()}
                      className="clothes-images images-container"
                    >
                      {console.log("ITEM IS", item)}
                      {item.imgPreviews.map((img) => (
                        <img
                          src={img}
                          alt=""
                          style={{ width: "100px", display: "block" }}
                          key={uuid()}
                        />
                      ))}
                    </div>
                    <div key={uuid()} className="clothes-details">
                      <p className="clothes-details-text type">
                        Tipo: {item.type}
                      </p>
                      <p className="clothes-details-text size">
                        Taglia: {item.size}
                      </p>
                      <p className="clothes-details-text sex">
                        Sesso: {item.sex}
                      </p>
                      <p className="clothes-details-text price">
                        Prezzo: {item.price}
                      </p>
                      <p className="clothes-details-text discounted-price">
                        Sconto: {item.discountedPrice}
                      </p>
                    </div>
                    </div>
                );
              })}
            </section>
          )}
      </section>
    </main>
  );
}

  // const handleDiscountChange = (e) => {
  //   const discount = parseFloat(e.target.value) || 0; // Treat input as a number
  //   const price = parseFloat(clothesData.price) || 0; // Ensure price is a number

  //   const newDiscountedPrice = price - (price * discount) / 100;

  //   setClothesData((prevData) => ({
  //     ...prevData,
  //     discountedPrice: newDiscountedPrice.toFixed(2), // Format to 2 decimal places
  //   }));
  // };

  // const handleChange = (e) => {
  //   setClothesData((prevClothesData) => {
  //     return {
  //       ...prevClothesData,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };

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
