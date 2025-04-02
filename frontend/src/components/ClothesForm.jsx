import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import useImagePreviews from "../hooks/useImagePreviews";

export default function ClothesForm({
  formType,
  sizes,
  values,
  // imgPreviews,
  categories,
  registerOptions,
  // handleFileChange,
  handleSave,
}) {
  // console.log(formType);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setFocus,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: values,
  });
  // console.log(handleFileChange)
  const testData = (formData) => {
    console.log("FORDATA IS:".formData);
  };



  const featuredImage= watch('featuredImage');
  const detailsImages = watch('detailsImages');
  const previewImages = useImagePreviews(featuredImage, detailsImages);

  console.log(featuredImage)

//   useEffect(() => {
// console.log("IN EFFECT", featuredImage)

// const imageUrls = Array.from(featuredImage).map((img) =>
//           URL.createObjectURL(img)
//         );
//         setPreviewImages(((prevImages) => {
//           return [
//             ...prevImages,
//             imageUrls
//           ]
//         }))
//         console.log(imageUrls)

//   }, [featuredImage, detailsImages])



  return (
    <form className="clothes-form" onSubmit={handleSubmit(handleSave)}>
      <div className="images-input">
        <label className="img-upload-btn featured-img-btn" htmlFor="featuredImgUpload">
          Carica immagine in evidenza
        </label>
        <input
          id="featuredImgUpload"
          type="file"
          name="featuredImage"
          // onChange={handleFileChange}
  
          {...register("featuredImage", registerOptions.featuredImage)}
         

        />
        {errors?.featuredImage && (
          <div className="form-danger"> {errors.featuredImage.message}</div>
        )}

        <label className="img-upload-btn details-img-btn" htmlFor="detailsImgUpload">
          Carica immagini dettagli
        </label>
        <input
          id="detailsImgUpload"
          type="file"
          name="detailsImages"
          multiple
          {...register("detailsImages")}
          // onChange={handleFileInputChange}
        />
        {errors?.detailsImages && (
          <div className="form-danger"> {errors.detailsImages.message}</div>
        )}
      </div>

     


      {previewImages.length > 0 && (
        <div className="clothes-form-images-container">
          {previewImages.map((img) => {
            return <img src={img} alt="" key={uuid()} />;
          })}
        </div>
      )}
      
      <div className="clothes-form-details">
      <div className="clothes-input clothes-type-input">
        <label htmlFor="clothesType">Tipo:</label>
        <input
          type="text"
          id="clothesType"
          name="type"
          {...register("type", registerOptions.type)}
        />
      </div>

      {/* <div className="clothes-input clothes-category-input">
        <label htmlFor="clothesCategory">Nome</label>
        <select
          name="category"
          id="clothesCategory"
          {...register("category", registerOptions.category)}
        >
          {categories.map((category) => {
            return <option key={category}>{category}</option>;
          })}
        </select>
      </div> */}

      <div className="clothes-input clothes-category-input">
        <label htmlFor="clothesCategory">Categoria:</label>
        <input
          type="text"
          id="clothesCategory"
          name="category"
          {...register("category", registerOptions.category)}
        />
      </div>

      <div className="clothes-input clothes-category-input">
        <label htmlFor="clothesName">Nome:</label>
        <input
          type="text"
          id="clothesCategory"
          name="name"
          {...register("name", registerOptions.name)}
        />
      </div>

      <div className="clothes-input clothes-description-container">
        <label htmlFor="clothesDescription">Descrizione</label>
        <textarea
          id="clothesDescripton"
          name="description"
          cols="30"
          rows="10"
          {...register("description", registerOptions.description)}
        />
        {errors?.description && (
          <div className="form-danger"> {errors.description.message}</div>
        )}
      </div>

      {/* <label htmlFor="clothesSize">Misura</label>
        
        {/* <select
                name="size"
                id="clothesSize"
                {...register('size', registerOptions.size)}
              >
                {sizes.map(size => {
                    return <option key={size} value={size}>{size}</option>
                })}
              </select> */}

      {formType !== "accessories" && (
        <div className="clothes-input clothes-size-input">
          <fieldset>
            <legend>Taglie</legend>
            <div className="size-checkboxes">
              {sizes.map((size) => {
                return (
                  <div key={uuid()} className="size-checkbox">
                    <label htmlFor="{size}">{size}</label>
                    <input
                      id={size}
                      type="checkbox"
                      key={size}
                      value={size}
                      {...register("sizes", registerOptions.sizes)}
                    />
                  </div>
                );
              })}
            </div>
          </fieldset>
        </div>
      )}

      <div className="clothes-input clothes-sex-input">
        <label htmlFor="clothesSex">Sesso:</label>
        <select
          name="sex"
          id="clothesSex"
          {...register("sex", registerOptions.sex)}
        >
          <option value="m">m</option>
          <option value="f">f</option>
        </select>
      </div>
      <div className="clothes-input clothes-price-input">
        <label htmlFor="price">Prezzo</label>
        <input
          type="number"
          name="price"
          {...register("price", registerOptions.price)}
        />
        <label htmlFor="discount">Sconto (%):</label>
        <input
          type="number"
          name="discount"
          // onChange={handleDiscountChange}
          placeholder="Inserisci sconto"
          {...register("discount", registerOptions.discount)}
        />
      </div>
      {/* <button onClick={() => handleSave(clothesData)}>Salva</button> */}
        
      </div>
     
      <button className="clothes-form__btn" type="submit">
        Salva
      </button>
    </form>
  );
}
