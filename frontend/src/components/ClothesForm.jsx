import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

export default function ClothesForm({
  formType,
  sizes,
  values,
  imgPreviews,
  categories,
  registerOptions,
  handleFileChange,
  handleSave,
}) {
  console.log(formType);

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

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    setValue("images", files); // Update react-hook-form state
    handleFileChange(files); // Call parent's handler to update external state
  };

  return (
    <form className="clothes-form" onSubmit={handleSubmit(handleSave)}>
      <div className="image-input">
        <label className="img-upload-btn" htmlFor="imgUpload">
          Carica immagini
        </label>
        <input
          id="imgUpload"
          type="file"
          name="images"
          multiple
          {...register("images")}
          onChange={handleFileInputChange}
        />
        {errors?.images && (
          <div className="form-danger"> {errors.images.message}</div>
        )}
      </div>

      {imgPreviews.length > 1 && (
        <div className="images-container">
          {imgPreviews.map((img) => {
            return <img src={img} alt="" key={uuid()} />;
          })}
        </div>
      )}

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
      <button className="clothes-form__btn" type="submit">
        Salva
      </button>
    </form>
  );
}
