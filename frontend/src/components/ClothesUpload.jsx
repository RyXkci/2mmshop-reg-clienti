import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import "../stylesheets/clothes-upload.css";

import {
  getClothes,
  postClothes,
  deleteClothes,
} from "../fetches/clothesFetch";

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

  const queryClient = useQueryClient();

  const clothes = useQuery({
    queryKey: ["clothes"],
    queryFn: getClothes,
  });

  console.log(clothes.data);

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

  const [isSending, setIsSending] = useState(false);

  // BEGIN SAVE STUFF

  const clothesMutation = useMutation({
    mutationFn: postClothes,
    onSuccess: (clothes) => {
      queryClient.invalidateQueries({
        queryKey: ["clothes"],
      }),
        setIsSending(false);
      setIsToggled(false);
      setHasStarted(false);
      console.log("Response:", result);
    },
  });

  const onSubmit = (formData) => {
    setIsSending(true);
    clothesMutation.mutate(formData);
  };

  const clothesDeletionMutation = useMutation({
    mutationFn: deleteClothes,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clothes"],
      });
      setIsSending(false);
      console.log("Clothing item deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting clothing item:", error);
    },
  });

  const handleDelete = () => {
    setIsSending(true);
    clothesDeletionMutation.mutate();
  };

  //END SAVE STUFF

  // const [clothesData, setClothesData] = useState({
  //   type: "",
  //   sex: "",
  //   size: "",
  //   images: [],
  //   price: "",
  //   discountedPrice: "",
  // });

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
  };

  return (
    <main className="main">
      {isSending && <Spinner type="dark" />}

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

        {isToggled && (
          <section className="clothes-upload-section">
            <div className="clothes-upload-details">
              <>
                <h2 className="clothes-details__title">Inizia a caricare!</h2>
                <ClothesForm
                  formType={formType}
                  sizes={sizeOptions}
                  values={clothesValues}
                  categories={categories}
                  // imgPreviews={images}
                  registerOptions={registerOptions}
                  // handleFileChange={handleFileChange}
                  handleSave={onSubmit}
                  formPreviewImages={formPreviewImages}
                />
              </>
            </div>
          </section>
        )}

        {clothes.data && clothes.data.length > 0 && (
          <section className="clothes-section">
            <h1 className="clothes-section__title">Vestiti caricati:</h1>
            {clothes.data?.map((item) => {
              return <ClothingItem key={item.id} item={item} />;
            })}
            <button className="clothes-upload-save-btn">Invia messaggi!</button>
            {/* <button className="clothes-upload-save-btn" onClick={handleDelete}>
              Inizia un mese nuovo
            </button> */}
            
          </section>
        )}
      </section>
    </main>
  );
}
