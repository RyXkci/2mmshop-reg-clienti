import "../stylesheets/result.css";

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
       
        <section className="intro-container-circle bg">
          <h1 className="intro__title">
            <span className="intro__title-large">2</span>
            <span className="intro__title-small">mm</span>
            <span className="intro-title-break">shop</span>
          </h1>
          <p className="intro__subtitle">MyStyleBox</p>
        </section>
          <button className="btn-fill has-top-border-shadow" onClick ={clickFunc}>{content.button}</button>

      </div>
    </main>
  );
}
