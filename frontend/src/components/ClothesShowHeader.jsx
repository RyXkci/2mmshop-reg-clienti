import "../stylesheets/clothes-show-header.css";

import logoBlack from "../assets/logos/2mm-logo-black.png";

// import introImage from '../../public/intro-images/gm-top-1.jpeg'

export default function ClothesShowHeader({intro, name}) {
  return (
    <div className="clothes-show-header">
      <div className="clothes-show-header__logo">
        <img src={logoBlack} alt="" />
        <p>dal 1973</p>
        <h1 className="clothes-show-header-logo__text">Manfredi Giordano</h1>
      </div>
      <div className="clothes-show-header__title">
        <p>Il piacere di indossare ciò che vi rende <span className="clothes-show-header-title__accent">unici</span>!</p>
      </div>
      {/* {intro && <div className="clothes-show-header__intro">
        <div className="clothes-show-header-intro__inner">   <p>
          Ciao, {name}! Ecco la tua selezone di capi su misura, con un prezzo riservato solo per te. Scoprila ora!
        </p></div>
     
      </div>} */}
      {intro && <div className="clothes-show-header__intro">
        <div className="clothes-show-header-intro__inner">   <p>
          Ciao, {name}! Ecco la tua selezone di capi su misura, con un prezzo riservato solo per te. Scoprila ora!
        </p></div>
     
      </div>}
    </div>
  );
}
