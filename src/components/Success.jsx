import '../stylesheets/success.css'

export default function Success({clickFunc}) {
    return (
        <div className="success-page">
        <div className="success-page-inner">
          <h1 className="success-page__title has-text-stroke-dark">Grazie! i tuoi dati sono stati inviati!</h1>
          <p className="success-page__subtitle has-text-stroke-dark">Attendi le promozioni mirate alle tue taglie!</p>
          <button className="btn-fill-dark has-top-border-shadow" onClick ={clickFunc}>Torna indietro</button>
        </div>
      </div>
    )

}