import { v4 as uuid } from "uuid";

export default function ClothingItem({item}) {

    return (
        <div key={uuid()} className="clothes-container">
                    <div
                      key={uuid()}
                      className="clothes-images images-container"
                    >
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
                      <p key={uuid()}  className="clothes-details-text type">
                        Tipo: {item.type}
                      </p>
                      <p key={uuid()}  className="clothes-details-text size">
                        Taglia: {item.size}
                      </p>
                      <p key={uuid()}  className="clothes-details-text sex">
                        Sesso: {item.sex}
                      </p>
                      <p key={uuid()}  className="clothes-details-text price">
                        Prezzo: {item.price}
                      </p>
                      <p key={uuid()}  className="clothes-details-text discounted-price">
                        Sconto: {item.discountedPrice}
                      </p>
                    </div>
                    </div>
    )
}