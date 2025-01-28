import "../stylesheets/clothes-show-header.css";

import logoBlack from "../assets/logos/2mm-logo-black.png";

export default function ClothesShowHeader({intro}) {
  return (
    <div className="clothes-show-header">
      <div className="clothes-show-header__logo">
        <img src={logoBlack} alt="" />
        <p>dal 1973</p>
        <h1 className="clothes-show-header-logo__text">Manfredi Giordano</h1>
      </div>
      <div className="clothes-show-header__title">
        <p>Il piacere di indossare ciò che vi rende unici!</p>
      </div>
      {intro && <div className="clothes-show-header__intro">
        <p>
          Ciao utente. Ecco la selezone di capi in promozione esclusivi della
          tua taglia!
        </p>
      </div>}
    </div>
  );
}
