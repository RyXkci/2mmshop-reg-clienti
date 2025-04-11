import '../stylesheets/spinner.css'

export default function Spinner({type}) {

 const getClassName = (type) => {
    switch (type) {
        case "dark":
          return "spinner-container-dark";
        case "light":
          return "spinner-container-light";
        default:
          return "spinner-container"; // fallback/default
      }
 }

 const className = getClassName(type)

    return (
        <div className={`spinner-container ${className}`}>
            <div className="spinner"></div>
            <div className="spinner-container__text">Attendi mentre elaboriamo i dati. Non chiudere questa finestra</div>
        </div>
    )
}