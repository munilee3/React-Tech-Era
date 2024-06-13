import {Link} from 'react-router-dom'
import './index.css'

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="logo-link">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="website-logo"
      />
    </Link>
  </nav>
)

export default Navbar
