import '../stylesheets/navbar.css'

import { useLogout } from '../hooks/useLogout'

export default function Navbar({reset, setAdmin}) {

    const {logout} = useLogout(setAdmin);

    return (
        <nav className="navbar">
        <div className="navbar-inner">
        <button className="nav-button nav-button-light" onClick={reset}>Reset</button>
        <button className="nav-button nav-button-danger" onClick={logout}>Log out</button>
        </div>
      </nav>
    )
  
}