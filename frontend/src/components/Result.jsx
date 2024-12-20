import "../stylesheets/result.css";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

const instaIcon = <FontAwesomeIcon icon={faInstagram} />;
const facebookIcon = <FontAwesomeIcon icon={faFacebook} />;

console.log(instaIcon);
console.log(facebookIcon);

import Logo from "./Logo";

export default function Result({ content, clickFunc, isSuccess }) {
  console.log(isSuccess);
  return (
    //   <div className="result-page">
    //   <div className={`result-page-inner ${content.class}`}>
    //     <h1 className="result-page__title">{content.title}</h1>
    //     <p className="result-page__subtitle">{content.body}</p>
    //     <button className="btn-fill-dark has-top-border-shadow" onClick ={clickFunc}>{content.button}</button>
    //   </div>
    // </div>

    <main className="result-page">
      <div className="result-container">
        <section className={`result-content ${content.class}`}>
          <h1 className="result-page__title">{content.title}</h1>
          <p className="result-page__subtitle">{content.body}</p>
        </section>

        <Logo size="bg" />

        {/* <section className="logo-container-circle bg">
          <h1 className="logo__title">
            <span className="logo__title-large">2</span>
            <span className="logo__title-small">mm</span>
            <span className="logo-title-break">shop</span>
          </h1>
          <p className="logo__subtitle">MyStyleBox</p>
        </section> */}
        {/* <button className="btn-fill has-top-border-shadow" onClick ={clickFunc}>{content.button}</button> */}

        {isSuccess && (
          <div className="result-page__icon-container">
            <h2 className="result-page__icon-container__title result-page__title">
              Seguici su:
            </h2>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/2mmshop.it?igsh=MWdocndzNmducXhoaA=="
                target="blank"
                className="social-icon insta-icon"
              >
                {instaIcon}
              </a>
              <a
                href="https://www.facebook.com/share/18UGQqBDn5/"
                target="blank"
                className="social-icon fb-icon"
              >
                {facebookIcon}
              </a>
            </div>
          </div>
        )}
        {/* <span>{instaIcon}</span>
          <span>{facebookIcon}</span>
          <a href="">Hello</a> */}
      </div>
    </main>
  );
}
