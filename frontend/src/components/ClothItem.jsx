import { Link } from "react-router-dom";

import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill, scale} from "@cloudinary/url-gen/actions/resize";

export default function ClothItem({ item }) {
    
   const baseUrl = import.meta.env.VITE_LOCAL_URL;
    // console.log(baseUrl)
    console.log("CLOTH ITEM IN clothItem IS", item)
    const size = item.sizes.join()
    // console.log("clientInfo is:", clientInfo)

    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dkhzi5hj9'
      }
    });



    const cldImage = cld
    .image(item.images.featured.filename)
    .format('auto')
    .quality('auto')
    .resize(scale().width(300))


  return (
 
    <div className="clothes-card">
      <div className="clothes-card-img">
        <AdvancedImage
        cldImg={cldImage} />
        
        {/* <img src={item.images.featured.url} alt="" /> */}
      </div>
      <div className="clothes-card-details">
        {" "}
        <h2 className="clothes-card-details__title">{item.name}</h2>
        <p className="clothes-card-details__price">
          <span>{item.price}€</span> {Math.ceil(item.discountedPrice)}€
        </p>
        {/* <a href="" className="clothes-card-details__btn">
          Vedi di più
        </a> */}
        <Link to={`${baseUrl}/club/${item._id}?cs=${size}`} className="clothes-card-details__btn">Scopri</Link>
      </div>
    </div>
  );
}
