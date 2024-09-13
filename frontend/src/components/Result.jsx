import '../stylesheets/success.css'

export default function Result({content, clickFunc}) {
    return (
        <div className="result-page">
        <div className={`result-page-inner ${content.class}`}>
          <h1 className="result-page__title">{content.title}</h1>
          <p className="result-page__subtitle">{content.body}</p>
          <button className="btn-fill-dark has-top-border-shadow" onClick ={clickFunc}>{content.button}</button>
        </div>
      </div>
    )

}