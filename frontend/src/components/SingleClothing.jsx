import { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import ClothesShowHeader from "./ClothesShowHeader";

import { useClient } from "../hooks/useClient";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const phoneIcon = <FontAwesomeIcon icon={faPhone} />;
const locationIcon = <FontAwesomeIcon icon={faLocationDot} />;

import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

import "../stylesheets/cloth-single.css";

import ClothCarousel from "./ClothCarousel";

export default function SingleClothing() {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const { name, changeName } = useClient();
  const { lastName, changeLastName } = useClient();
  const { clientSex, changeClientSex } = useClient();

  const size = searchParams.get("cs");
  console.log(name);
  console.log(lastName);
  console.log(clientSex);

  const fullName = `${name} ${lastName}`;

  const messageVariation = (sex) => {
    let variation;
    switch (sex) {
      case "m":
        variation = "interessato";
        return variation;
      case "f":
        variation = "interessata";
        return variation;
    }
  };

  // WHATSAPP STUFF;
  const wappNumber = "+393791032653";

  const pageUrl = window.location.href;
  console.log(pageUrl);

  const shareOnWhatsApp = () => {
    const pageUrl = window.location.href;
    const message =
      encodeURIComponent(`Ciao, sono ${fullName} e sono ${messageVariation(
        clientSex
      )} in questo articolo! 
${pageUrl}`);
    const whatsappUrl = `https://wa.me/${wappNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  const [cloth, setCloth] = useState({});
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchCloth = async () => {
      const response = await fetch(`${apiUrl}/api/clothing/${id}`);
      const json = await response.json();
      setCloth(json);

      const images = json.images?.featured
        ? [json.images.featured, ...(json.images.details || [])]
        : json.images?.details || [];

      setCarouselImages(images);
    };

    fetchCloth();
  }, []);

  return (
    <>
      <ClothesShowHeader intro={false} />
      <section className="cloth-single-section">
        {/* <ClothCarousel images={cloth} /> */}
        <div className="cloth-single-section__carousel">
          {" "}
          {cloth.images?.details && <ClothCarousel images={carouselImages} />}
        </div>
        <h1 className="cloth-single-section__title">{cloth.name}</h1>
        <div className="cloth-single-section__details">
          <p className="cloth-details__size">
            Taglia: <span className="cloth-details-bg">{size}</span>
          </p>
          <p className="cloth-details__price">
            Prezzo:{" "}
            <span className="cloth-details-bg cloth-details-price-span">
              {cloth.price}€{" "}
            </span>
            <span className="cloth-details-discount">
              {Math.ceil(cloth.discountedPrice)}€
            </span>
          </p>
          <div className="cloth-details-description-container">
            <p className="cloth-details-description">{cloth.description}</p>
          </div>
        </div>
        <div className="clothes-single-section__contact">
          <div className="clothes-single-section-contact__buttons">
            <button
              onClick={shareOnWhatsApp}
              className="clothes-single-contact-wapp"
            >
              Mi interessa
            </button>
            {/* <Link className="clothes-single-contact-back">Vedi altro</Link> */}
          </div>
          <div className="clothes-single-section-contact__icons">
            <a
              className="clothes-single-contact-phone"
              href="tel:+393937038337"
            >
              <span>{phoneIcon}</span>Chiamaci
            </a>
            <a
              className="clothes-single-contact-address"
              href="https://maps.app.goo.gl/BpHdePvMQ44tVgFd9?g_st=aw"
            >
              <span>{locationIcon}</span>Vieni a trovarci
            </a>
          </div>
        </div>

        {/* {cloth && <ClothCarousel images={cloth.images.details} />} */}
      </section>
    </>
  );
}
