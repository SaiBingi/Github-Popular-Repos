import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoDetails

  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="avatar-url" />
      <h1 className="avatar-name">{name}</h1>
      <div className="icons-container">
        <div className="icon-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p>{starsCount}</p>
        </div>
        <div className="icon-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p>{forksCount}</p>
        </div>
        <div className="icon-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p>{issuesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
