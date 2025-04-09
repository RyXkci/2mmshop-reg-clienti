import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import "../stylesheets/clothes-upload.css";

import ClothingPicker from "./ClothingPicker";
import ClothingItem from "./ClothingItem";
import Spinner from "./Spinner";

import ClothesForm from "./ClothesForm";
import {
  clothesOptions,
  clothesValues,
  clothesSizes,
  clothesCategories,
  registerOptions,
} from "../utils/clothesFormUtils";

export default function ClothesUpload() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [clothesImages, setClothesImages] = useState([]);

  const [clothingSelector, setClothingSelector] = useState(false);

  // const [clothes, setClothes] = useState(getInitialClothes);

  // cont [clothesChoices, setClothesChoices] = useState(clothesOptions)

  const [sizeOptions, setSizeOptions] = useState([]);

  const [clothesType, setClothesType] = useState("");

  const [categories, setCategories] = useState([]);

  const [formType, setFormType] = useState(""); //state to determine whether form will be clothes or accessory, as accessory doesn't have sizes.

  const [isToggled, setIsToggled] = useState(false);

  const [hasStarted, setHasStarted] = useState(false); // state for initial button render, sets to true tomake first buttons dissapear

  const [formPreviewImages, setFormPreviewImages] = useState([]);

  const [status, setStatus] = useState("initial");

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem('clothes',JSON.stringify(clothes))
  // }, [clothes])

  // BEGIN SAVE STUFF
  const handleUpload = async (clothes) => {
    setIsLoading(true);
    const price = parseFloat(clothes.price);
    const discount = parseFloat(clothes.discount);
    clothes.discountedPrice = price - (price * discount) / 100;
    const formData = new FormData();
    console.log("CLOTHES IN UPLOAD:", clothes);

    // Append the clothing object's metadata
    formData.append("type", clothes.type);
    formData.append("category", clothes.category);
    formData.append("name", clothes.name);
    formData.append("price", clothes.price);
    formData.append("discountedPrice", clothes.discountedPrice);
    formData.append("description", clothes.description);
    clothes.sizes.forEach((size) => {
      formData.append("sizes", size);
    });
    formData.append("sex", clothes.sex);

    // Append featured image (one file per clothing item)
    if (clothes.featuredImage) {
      formData.append("featured", clothes.featuredImage[0]);
    }

    // Append each image for the current clothing object
    Array.from(clothes.detailsImages).forEach((image, imgIndex) => {
      formData.append("details", image);
    });

    console.log(formData);

    try {
      const response = await fetch(`${apiUrl}/api/clothing`, {
        method: "POST",

        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setIsLoading(false);
      setIsToggled(false);
      setHasStarted(false);
      console.log("Response:", result);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  //END SAVE STUFF

  // DELETE STUFF    ALL THIS WILL BE MOVED WHEN I HAVE TIME

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/clothing/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("Deleted", result);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  // console.log(clothesOptions);

  const [clothesData, setClothesData] = useState({
    type: "",
    sex: "",
    size: "",
    images: [],
    price: "",
    discountedPrice: "",
  });

  const handleFormRender = (type, category) => {
    // console.log("AFTER CLICK I GET:", type);
    // console.log("I ALSO GET", category);
    setSizeOptions(clothesSizes[type]);
    console.log(clothesSizes);
    clothesValues.type = type;
    clothesValues.category = category;
    // console.log("VALUES ARE", clothesValues);
    setIsToggled(!isToggled);
    setClothingSelector(!clothingSelector);
  };

  const handleToggle = (type) => {
    // console.log("TYPE IN HANDLE TOGGLE IS:", type);
    setCategories(clothesOptions[type].categories);
    setClothesType(type);
    setFormType(type);
    // only removes is toggled status IF form has already rendered in case user makes mistake
    // if the isToggled short-circuit isn't there it toggles both the form and the clothesPicker causing an overlay.
    isToggled && setIsToggled(!isToggled);
    setClothingSelector(!clothingSelector);
    setHasStarted(true);
    // console.log(clothesSizes[type])
    // setCategories(clothesCategories[type])
    // setSizeOptions(clothesSizes[type])
    // setClothingSelector(!clothingSelector)
  };

  return (
    <main className="main">
      {isLoading && <Spinner />}

      {clothingSelector && (
        <ClothingPicker
          clothesOptions={clothesOptions}
          clothesType={clothesType}
          // clothingArr = {categories}
          handleClick={handleFormRender}
        />
      )}

      <section className="clothes-upload-main">
        <h1 className="clothes-upload-main__title">
          Ciao Giordano! Inizia a caricare la promo del mese!
        </h1>
        
        <button 
        onClick={handleDelete}
        className="clothes-delete-btn">Inizia un mese nuovo</button>

        {!hasStarted && (
          <section className="clothes-upload-buttons">
            <button
              className="clothes-upload-button btn-top"
              onClick={() => handleToggle("top")}
            >
              Carica top
            </button>
            <button
              className="clothes-upload-button btn-trouser"
              onClick={() => handleToggle("trousers")}
            >
              Carica pantalone
            </button>
            <button
              className="clothes-upload-button btn-shoe"
              onClick={() => handleToggle("shoes")}
            >
              Carica scarpe
            </button>

            <button
              className="clothes-upload-button btn-accessory"
              onClick={() => handleToggle("accessories")}
            >
              Carica accessorio
            </button>
          </section>
        )}

        <section className="clothes-upload-section">
          <div className="clothes-upload-details">
            {isToggled && (
              <>
                <h2 className="clothes-details__title">Inizia a caricare!</h2>
                {/* {images.length > 1 && (
                  <div className="images-container">
                    {images.map((image) => {
                      return (
                        <img
                          src={image}
                          alt=""
                      
                          key={uuid()}
                        />
                      );
                    })}
                  </div>
                )} */}
                <ClothesForm
                  formType={formType}
                  sizes={sizeOptions}
                  values={clothesValues}
                  categories={categories}
                  // imgPreviews={images}
                  registerOptions={registerOptions}
                  // handleFileChange={handleFileChange}
                  handleSave={handleUpload}
                  formPreviewImages={formPreviewImages}
                />
              </>
            )}
          </div>
        </section>

        {/* {clothes && (
          <section className="clothes-section">
            <h1 className="clothes-section__title">Vestiti caricati:</h1>
            {clothes.map((item) => {
              return <ClothingItem item={item} />;
            })}
          </section>
        )} */}
      </section>
      {/* <button className="clothes-upload-save-btn" onClick={handleUpload}>Salva tutto</button> */}
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

{
  /* <form className="clothes-form">
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
          </form> */
}

{
  /* <label htmlFor="clothesType">Tipo:</label>
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
      /> */
}

// const [image, setImage] = useState();
// const [images, setImages] = useState([]);

// const handleToggle = (formType, type) => {
//   console.log(formType)
//   // console.log(type)
//   if (formType === "accessory") {
//     console.log(type)
//     setSizeOptions(['all']);
//     clothesValues.type = "accessorio"
//     clothesValues.name = type
//     setCategories(clothesCategories.accessories)
//     setFormType('accessory');
//     setIsToggled(!isToggled)
//   } else if (formType === "clothing") {
//     console.log(type);
//     // setFormType('clothes');
//     setSizeOptions(clothesSizes[type]); //SETS SIZE OPTIONS ACCORDING TO WHICH BUTTON IS PRESSED TO RENDER FORM DYNAMICALLY
//     console.log(sizeOptions);
//     clothesValues.type = type; //SETS THE TYPE IN HOOK FORM DEFAULT VALUES ACCRDING TO WHICH BUTTON IS PRESSED TO PRE-FILL FORM
//     console.log(clothesValues);
//     setFormType('clothing')
//     setCategories(clothesCategories[type])
//     console.log(categories)
//     setIsToggled(!isToggled);
//     // console.log(sizeOptions)
//   }

// };

// const handleFileChange = (files) => {
//   const imageUrls = Array.from(files).map((file) =>
//     URL.createObjectURL(file)
//   );
//   setImages(imageUrls); // Update preview state
// };

//  const handleFileChange = (e) => {
//   console.log(e)
//   if (e.target.files) {
//     let imageArr = [];
//     setStatus("initial");
//     for (let i = 0; i < e.target.files.length; i++) {
//       imageArr.push(URL.createObjectURL(e.target.files[i]));
//     }
//     console.log(imageArr);
//     setImages(imageArr);
//   }
// };

{
  /* <div className="accessory-picker">
        {clothesCategories.accessories.map((accessory) => {
          return <button onClick={() => handleToggle('accessory', accessory)} key={accessory}>{accessory}</button>
        })}
      </div> */
}
