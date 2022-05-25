import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageFilterId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
    reposList: [],
  }

  componentDidMount() {
    this.getRepositoryItems()
  }

  getRepositoryItems = async () => {
    const {activeLanguageFilterId} = this.state

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`

    // const options = {
    //   method: 'GET',
    // }

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch(apiUrl)
    // console.log(response)
    const data = await response.json()
    // console.log(data)

    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))

      this.setState({
        reposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRepositoriesSuccessView = () => {
    const {reposList} = this.state

    return (
      <>
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </>
    )
  }

  renderRepositoriesFailureView = () => (
    <li>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </li>
  )

  renderRepositoriesLoadingView = () => (
    <div testid="loader" className="loading-view">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  changeLanguageFilter = activeLanguageFilterId => {
    this.setState({activeLanguageFilterId}, this.getRepositoryItems)
  }

  render() {
    const {activeLanguageFilterId, apiStatus} = this.state

    let renderTypeOfView
    switch (apiStatus) {
      case apiStatusConstants.success:
        renderTypeOfView = this.renderRepositoriesSuccessView()
        break
      case apiStatusConstants.failure:
        renderTypeOfView = this.renderRepositoriesFailureView()
        break
      case apiStatusConstants.inProgress:
        renderTypeOfView = this.renderRepositoriesLoadingView()
        break
      default:
        renderTypeOfView = null
        break
    }

    return (
      <div className="bg-container">
        <div className="container">
          <h1 className="popular-repos-heading">Popular</h1>
          <ul className="filter-items-container">
            {languageFiltersData.map(eachFilter => (
              <LanguageFilterItem
                key={eachFilter.id}
                isActive={activeLanguageFilterId === eachFilter.id}
                filterItem={eachFilter}
                changeLanguageFilter={this.changeLanguageFilter}
              />
            ))}
          </ul>
          <ul className="repositories-container">{renderTypeOfView}</ul>
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
