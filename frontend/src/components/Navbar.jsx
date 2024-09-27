import '../stylesheets/navbar.css'

export default function Navbar({reset, logOut}) {

    return (
        <nav className="navbar">
        <div className="navbar-inner">
        <button className="nav-button nav-button-light" onClick={reset}>Reset</button>
        <button className="nav-button nav-button-danger" onClick={logOut}>Log out</button>
        </div>
      </nav>
    )
  
}