import { useEffect, useRef } from "react";
import BlazeSlider from "blaze-slider";

import { v4 as uuid } from "uuid";
import { useBlazeSlider } from "../hooks/useBlazeSlider";

import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill, scale} from "@cloudinary/url-gen/actions/resize";

import "blaze-slider/dist/blaze.css";
import  "../stylesheets/cloth-carousel.css"

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dkhzi5hj9'
  }
});

export default function ClothCarousel({ images }) {
  console.log(images);

  const elRef = useBlazeSlider({
    all: {
      slidesToShow: 1,
      slidesToScroll: 3,
      enablePagination: true
    },
  });

  return (
    <div className="blaze-slider" ref={elRef}>
      <div className="blaze-container">
        <div className="blaze-track-container">
          <div className="blaze-track">
            {images.map((image) => {
              const cldImage = cld.image(image.filename).format('auto').quality('auto').resize(scale().width(400))
              return (
                <div key={uuid()} className="cloth-page-slide-container">
                  <AdvancedImage cldImg={cldImage} />
                </div>
              );
            })}
          </div>
          
      <div className="my-pagination-container">
        <div className="blaze-pagination"></div>
      </div>
          {/* <button className="blaze-prev carousel-btn carousel-btn-prev">Prev</button>
          <button className="blaze-next carousel-btn carousel-btn-next">Next</button> */}
        </div>
      </div>
    </div>
  );
}
