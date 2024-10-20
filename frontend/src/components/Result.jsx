import "../stylesheets/result.css";

import Logo from "./Logo";

export default function Result({ content, clickFunc }) {
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

        <Logo
        size="bg"
        />
       
        {/* <section className="logo-container-circle bg">
          <h1 className="logo__title">
            <span className="logo__title-large">2</span>
            <span className="logo__title-small">mm</span>
            <span className="logo-title-break">shop</span>
          </h1>
          <p className="logo__subtitle">MyStyleBox</p>
        </section> */}
          <button className="btn-fill has-top-border-shadow" onClick ={clickFunc}>{content.button}</button>

      </div>
    </main>
  );
}
