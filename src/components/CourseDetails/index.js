import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import './index.css'

const apiStatusContrants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {courseDetails: {}, apiStatus: apiStatusContrants.initial}

  componentDidMount() {
    this.getLanguageDetails()
  }

  getLanguageDetails = async () => {
    this.setState({apiStatus: apiStatusContrants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseDetails: updatedData,
        apiStatus: apiStatusContrants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContrants.failure})
    }
  }

  renderCourseDetails = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="course-details-container">
        <img src={imageUrl} alt={name} />
        <div className="course-details">
          <h1 className="name">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  renderApi = () => {
    this.getLanguageDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.renderApi}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#1e293b" width={50} height={50} />
    </div>
  )

  renderFinalCourseDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContrants.success:
        return this.renderCourseDetails()
      case apiStatusContrants.failure:
        return this.renderFailureView()
      case apiStatusContrants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderFinalCourseDetails()}
      </>
    )
  }
}
export default CourseDetails
