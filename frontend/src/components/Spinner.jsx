import '../stylesheets/spinner.css'

export default function Spinner() {

    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <div className="spinner-container__text">Attendi mentre elaboriamo i dati. Non chiudere questa finestra</div>
        </div>
    )
}