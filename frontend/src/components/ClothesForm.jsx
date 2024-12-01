import { useForm } from "react-hook-form";

export default function ClothesForm({sizes, values, registerOptions, handleSave}) {

// const sizeOptions = sizes.top;
console.log("SIZES IN FORM:", sizes)

const testData = (data) => {
    console.log("DATA IS:", data)
}

const {
    register,
    control,
    handleSubmit,
    reset,
    setFocus,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: values,
  });

    return (
        <section className="clothes-upload-section">
        <div className="clothes-details" onSubmit={handleSubmit(testData)}>
          <form className="clothes-form">
            <div className="image-input">
              <input
                id="file"
                type="file"
                multiple
                {...register("images", registerOptions.images)}
                // onChange={handleFileChange}
              />
            </div>
            {/* {images && (
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

            <div className="clothes-type-input">
              <label htmlFor="clothesType">Tipo:</label>
              <input
                type="text"
                id="clothesType"
                name="type"
                {...register('type', registerOptions.type)}
                // value={clothesData.type}
                // onChange={handleChange}
              />
            </div>
            <div className="clothes-size-input">
              <label htmlFor="clothesSize">Misura</label>
              <select
                name="size"
                // value={clothesData.size}
                // onChange={handleChange}
                id="clothesSize"
                {...register('size', registerOptions.size)}
              >
                {sizes.map(size => {
                    return <option key={size} value={size}>{size}</option>
                })}
              </select>
            </div>
            <div className="clothes-sex-input">
              <label htmlFor="clothesSex">Sesso:</label>
              <select
                name="sex"
                // value={clothesData.sex}
                // onChange={handleChange}
                id="clothesSex"
                {...register('sex', registerOptions.sex)}
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
                // value={clothesData.price}
                // onChange={handleChange}
                {...register('price',registerOptions.price)}
              />
              <label htmlFor="discount">Sconto (%):</label>
              <input
                type="number"
                name="discount"
                // onChange={handleDiscountChange}
                placeholder="Inserisci sconto"
                {...register('discount', registerOptions.discount)}
              />
            </div>
            {/* <button onClick={() => handleSave(clothesData)}>Salva</button> */}
            <button type="submit">Salva</button>
          </form>
          </div>

          </section>
    )
}