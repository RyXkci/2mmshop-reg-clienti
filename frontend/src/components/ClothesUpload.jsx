import { useState } from "react";

import '../stylesheets/clothes-upload.css'

export default function ClothesUpload() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [clothesImages, setClothesImages] = useState([]);
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

  const testImages = [];

  const handleFileChange = (e) => {
    if (e.target.files) {
      let imageArr = [];
      setStatus("initial");
      setClothesImages(e.target.files);
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
    if (clothesImages) {
      setStatus("uploading");

      const formData = new FormData();
      [...clothesImages].forEach((image) => {
        formData.append("files", image);
      });
      console.log(formData);
      try {
        const result = await fetch(`${apiUrl}/api/clothing`, {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };
  return (
    <main className="main">
      <h1 className="title">
        Ciao Giordano! Inizia a caricare la promo del mese!
      </h1>

      {/* {clothesImages && (
          <button onClick={handleUpload} className="submit">
            Upload {clothesImages.length > 1 ? "files" : "a file"}
          </button>
        )} */}

      <section className="clothes-upload-section">
        {images && (
          <div className="images-container">
            {images.map((image) => {
              return (
                <img
                  src={image}
                  alt=""
                  style={{ width: "100px", display: "block" }}
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

        <div className="clothes-upload-container">
          <div className="input-group">
            <input id="file" type="file" multiple onChange={handleFileChange} />
          </div>
        </div>
      </section>
    </main>
  );
}
