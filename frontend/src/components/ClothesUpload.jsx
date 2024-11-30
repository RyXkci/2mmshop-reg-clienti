import { useState } from "react";
import {v4 as uuid} from "uuid";

import '../stylesheets/clothes-upload.css'

export default function ClothesUpload() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [clothesImages, setClothesImages] = useState([]);

  const [clothes, setClothes] = useState([]);

  const [clothesData, setClothesData] = useState({
    type: "",
    sex: "",
    size: "",
    images: [],
    price: "",
    discountedPrice: ""
  });

  const [image, setImage] = useState();
  const [images, setImages] = useState([]);

  const [status, setStatus] = useState("initial");


  const handleFileChange = (e) => {
    if (e.target.files) {
      let imageArr = [];
      setStatus("initial");
      setClothesImages(e.target.files);
      setClothesData((prevClothesData) => {
        return {
          ...prevClothesData,
          images: e.target.files
        }
      })
      for (let i = 0; i < e.target.files.length; i++) {
        imageArr.push(URL.createObjectURL(e.target.files[i]));
      }
      console.log(imageArr);
      setImages(imageArr);
    }
  };

  const handleChange = (e) => {
    setClothesData((prevClothesData) => {
      return {
        ...prevClothesData,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSave = (newClothes) => {
  console.log(newClothes)
    setClothes((prevClothes) => {
      return [
        ...prevClothes,
        newClothes
      ]
    })
  }

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

    // Prepare the array of objects
  //   const payload = clothes.map((item) => ({
  //     type: item.type,
  //     size: item.size,
  //     price: item.price,
  //     discountedPrice: item.discountedPrice,
  //     sex: item.sex,
  //     // images: Array.from(item.images || []).forEach((image, imgIndex) => {
  //     //   formData.append("images", image);
  //     // }) // Ensure images are an array
  //   }));
  // console.log("Payload is",payload)
  //   // Append the array as JSON
  //   formData.append("data", JSON.stringify(payload));
  //   console.log("FORM DATA BEFORE IMAGES IS:", formData)
  
  //   // Append all files
  //   clothes.forEach((item, index) => {
  //     const images = Array.from(item.images || []);
  //     images.forEach((image, imgIndex) => {
  //       formData.append("images", image);
  //     });
  //   });
  // console.log("FORMDATA AFTER IMAGES IS:", formData)
  // clothes.forEach((item, index) => {
  //   // Append the clothing object's metadata
  //   formData.append(`clothing[${index}][type]`, item.type);
  //   formData.append(`clothing[${index}][size]`, item.size);
  //   formData.append(`clothing[${index}][price]`, item.price);
  //   formData.append(`clothing[${index}][discountedPrice]`, item.discountedPrice);
  //   formData.append(`clothing[${index}][sex]`, item.sex);
  
  //   // Append each image for the current clothing object
  //   Array.from(item.images).forEach((image, imgIndex) => {
  //     formData.append(`clothing[${index}][images][${imgIndex}]`, image);
  //   });
  // });
  
  clothes.forEach((item, index) => {
    // Append the clothing object's metadata
    formData.append(`clothing[${index}][type]`, item.type);
    formData.append(`clothing[${index}][size]`, item.size);
    formData.append(`clothing[${index}][price]`, item.price);
    formData.append(`clothing[${index}][discountedPrice]`, item.discountedPrice);
    formData.append(`clothing[${index}][sex]`, item.sex);
  
    // Append each image for the current clothing object
    Array.from(item.images).forEach((image, imgIndex) => {
      formData.append(`clothing[${index}][images]`, image);

    });
  });
  console.log(formData)
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

      {clothes && (
          <button onClick={handleUpload} className="submit">
            Upload {clothesImages.length > 1 ? "files" : "a file"}
          </button>
        )}

      <section className="clothes-upload-section">
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
       <div className="clothes-details">
        <label htmlFor="clothesType">Tipo:</label>
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
       </div>
       <label htmlFor="discount">Sconto (%):</label>
      <input
        type="number"
        name="discount"
        onChange={handleDiscountChange}
        placeholder="Inserisci sconto"
      />

      <button onClick={() =>handleSave(clothesData)}>Salva</button>

        <div className="clothes-upload-container">
          <div className="input-group">
            <input id="file" type="file" multiple onChange={handleFileChange} />
          </div>
        </div>
      </section>
    </main>
  );
}
