import "../stylesheets/logo.css";


export default function Logo({size}) {

    return(
        <section className={`logo-container-circle ${size}`}>
        <h1 className="logo__title">
          <span className="logo__title-large">2</span>
          <span className="logo__title-small">mm</span>
          <span className="logo-title-break">shop</span>
        </h1>
        <p className="logo__subtitle">MyStyleBox</p>
      </section>
    )
}