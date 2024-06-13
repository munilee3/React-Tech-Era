import Navbar from '../Navbar'
import './index.css'

const NotFound = () => (
  <>
    <Navbar />
    <div className="loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="failure-heading">Page Not Found</h1>
      <p className="failure-description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
