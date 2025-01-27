import { Link } from "react-router-dom";

export default function ClothItem({ item }) {
    
   const baseUrl = import.meta.env.VITE_LOCAL_URL;
    console.log(baseUrl)
  return (
 
    <div className="clothes-card">
      <div className="clothes-card-img">
        <img src={item.images.featured} alt="" />
      </div>
      <div className="clothes-card-details">
        {" "}
        <h2 className="clothes-card-details__title">{item.name}</h2>
        <p className="clothes-card-details__price">
          <span>{item.price}€</span> {item.discountedPrice}€
        </p>
        {/* <a href="" className="clothes-card-details__btn">
          Vedi di più
        </a> */}
        <Link to={`${baseUrl}/promo/${item._id}`} className="clothes-card-details__btn">Scopri</Link>
      </div>
    </div>
  );
}
