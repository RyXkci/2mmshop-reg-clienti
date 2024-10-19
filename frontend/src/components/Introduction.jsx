import "../stylesheets/introduction.css";

export default function Introduction() {
  return (
    <main className="intro-main">
      <div className="intro-container">
        <section className="intro-container-circle bg">
          <h1 className="intro__title">
            <span className="intro__title-large">2</span>
            <span className="intro__title-small">mm</span>
            <span className="intro-title-break">shop</span>
          </h1>
          <p className="intro__subtitle">MyStyleBox</p>
        </section>
      </div>
    </main>
  );
}
