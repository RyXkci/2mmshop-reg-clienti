import { useForm } from "react-hook-form";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import { v4 as uuid } from "uuid";

import Spinner from "./Spinner";

import "../stylesheets/voucher-upload.css";

const apiUrl = import.meta.env.VITE_API_URL;

import useImagePreviews from "../hooks/useImagePreviews";

export default function FlyerUpload() {
  const [isSending, setIsSending] = useState(false);
  const [messageText, setMessageText] = useState(null);

  const registerOptions = {
    flyerImage: {
      required: "L'immagine è obbligatoria",
    },
    sex: {
      required: "Questo campo è obbligatorio",
    },
  };

  const handleSave = async (formData) => {
    console.log("FORM ClICKED");
    console.log(formData);
    setIsSending(true);

    const flyerData = new FormData();

    flyerData.append("sex", formData.sex);

    if (formData.flyerImage) {
      flyerData.append("flyerImage", formData.flyerImage[0]);
    }

    console.log("DATA TO SEND:", flyerData);

    try {
      const response = await fetch(`${apiUrl}/api/flyer`, {
        method: "POST",

        body: flyerData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.messaggio);
      setMessageText(result.messaggio);
      setIsSending(false);

      return result;
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const flyerImage = watch("flyerImage");
  const previewImage = useImagePreviews(flyerImage);

  return (
    <main className="main">
      <section className="voucher-upload-section">
        <form className="flyer-form" onSubmit={handleSubmit(handleSave)}>
          <div className="images-input">
            <label
              className="img-upload-btn featured-img-btn"
              htmlFor="flyerImgUpload"
            >
              Carica volantino
            </label>
            <input
              id="flyerImgUpload"
              type="file"
              name="flyerImage"
              // onChange={handleFileChange}

              {...register("flyerImage", registerOptions.flyerImage)}
            />
            {errors?.featuredImage && (
              <div className="form-danger"> {errors.featuredImage.message}</div>
            )}
          </div>

          {errors?.flyerImage && (
            <div className="form-danger"> {errors.flyerImage.message}</div>
          )}

          {previewImage.length > 0 && (
            <div>
              {previewImage.map((img) => {
                return <img src={img} alt="" key={uuid()} />;
              })}
            </div>
          )}

          {previewImage.length > 0 && (
            <div className="clothes-input clothes-sex-input">
              <label htmlFor="clothesSex">Sesso:</label>
              <select
                name="sex"
                id="clothesSex"
                {...register("sex", registerOptions.sex)}
              >
                <option value="m">m</option>
                <option value="f">f</option>
                <option value="all">entrambi</option>
              </select>
            </div>
          )}
          {previewImage.length > 0 && (
            <button className="clothes-form__btn" type="submit">
              Invia
            </button>
          )}

          {isSending && <Spinner type="dark" />}
          {messageText && <h3 className="flyer-success">{messageText}</h3>}
        </form>
      </section>
    </main>
  );
}
