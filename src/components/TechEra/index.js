import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'
import Navbar from '../Navbar'

import './index.css'

const apiStatusContrants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TechEra extends Component {
  state = {courseList: [], apiStatus: apiStatusContrants.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusContrants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        courseList: updatedData,
        apiStatus: apiStatusContrants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContrants.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#1e293b" width={50} height={50} />
    </div>
  )

  renderCourses = () => {
    const {courseList} = this.state
    return (
      <div className="course-container">
        <h1 className="heading">Courses</h1>
        <ul className="course-list">
          {courseList.map(eachCourse => (
            <CourseItem courseDetails={eachCourse} key={eachCourse.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderApi = () => {
    this.getCourseDetails()
  }

  renderFailure = () => (
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

  renderAllCoursesView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContrants.success:
        return this.renderCourses()
      case apiStatusContrants.failure:
        return this.renderFailure()
      case apiStatusContrants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="tech-era-container">
        <Navbar />
        {this.renderAllCoursesView()}
      </div>
    )
  }
}

export default TechEra
