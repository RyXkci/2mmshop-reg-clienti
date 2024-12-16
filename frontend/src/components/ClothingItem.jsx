import { v4 as uuid } from "uuid";

export default function ClothingItem({ item }) {
  return (
    <div key={uuid()} className="clothes-container">
      <div key={uuid()} className="clothes-images images-container">
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
        <p key={uuid()} className="clothes-details-text type">
          <span className="clothes-details-text__title">Tipo:</span> {item.type}
        </p>
        {/* <p key={uuid()}  className="clothes-details-text size">
                        Taglia: {item.size}
                      </p> */}
        <p className="clothes-details-text name">
          <span className="clothes-details-text__title">Nome: </span>
          {item.category}
        </p>
        <div className="clothes-sizes">
          <p className="clothes-details-text__title">Taglie:</p>
          {item.sizes.map((size) => (
            <p className="clothing-size">{size}</p>
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
          <span className="clothes-details-text__title">Sconto:</span>{item.discountedPrice}
        </p>
      </div>
    </div>
  );
}
