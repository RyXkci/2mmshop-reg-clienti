import { useState } from "react";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
 deleteSingleClothing
} from "../fetches/clothesFetch";
import { v4 as uuid } from "uuid";

import { Link } from "react-router-dom";


export default function ClothingItem({ item }) {
  const baseUrl = import.meta.env.VITE_LOCAL_URL;


  const queryClient = useQueryClient();
  
  const [sending, setIsSending] = useState(false);

  const clothesSingleDeletionMutation = useMutation({
    mutationFn: deleteSingleClothing,
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

  const handleSingleDelete = () => {
    setIsSending(true);
    clothesSingleDeletionMutation.mutate();
  };


  return (
    <div key={uuid()} className="clothes-container">
      <div key={uuid()} className="clothes-images images-container">
        {console.log("ITEM IS", item)}
        <div className="clothes-details-images">
          <img src={item.images.featured.url} alt="Featured" />

          {/* Detail images */}
          {item.images.details.map((img, index) => (
            <img key={index} src={img.url} alt={`Detail ${index + 1}`} />
          ))}
        </div>
      </div>
      <div key={uuid()} className="clothes-details">
        <p key={uuid()} className="clothes-details-text type">
          <span className="clothes-details-text__title">Tipo: </span>{" "}
          {item.type}
        </p>
        {/* <p key={uuid()}  className="clothes-details-text size">
                        Taglia: {item.size}
                      </p> */}
        <p className="clothes-details-text category">
          <span className="clothes-details-text__title">Categoria: </span>
          {item.category}
        </p>
        <p className="clothes-details-text name">
          <span className="clothes-details-text__title">Nome: </span>
          {item.name}
        </p>
        <div className="clothes-sizes">
          <p className="clothes-details-text__title">Taglie: </p>
          {item.sizes.map((size) => (
            <p key={size} className="clothing-size">
              {size}
            </p>
          ))}
        </div>
        <p key={uuid()} className="clothes-details-text sex">
          <span className="clothes-details-text__title">Sesso: </span>{" "}
          {item.sex}
        </p>
        <p key={uuid()} className="clothes-details-text description">
          <span className="clothes-details-text__title">Descrizione: </span>{" "}
          {item.description}
        </p>
        <p key={uuid()} className="clothes-details-text price">
          <span className="clothes-details-text__title">Prezzo: </span>
          {item.price}
        </p>
        <p key={uuid()} className="clothes-details-text discounted-price">
          <span className="clothes-details-text__title">Sconto:</span>
          {item.discountedPrice}
        </p>
      </div>
      <div className="clothes-container-buttons">
        {/* <Link
          to={""}
          // to={`${baseUrl}/caricavestiti/modifica/${item._id}`}

        >
          Modifica
        </Link> */}

        {/* <button onClick={handleSingleDelete} className="clothes-container-delete-button">Elimina</button> */}
      </div>
    </div>
  );
}
