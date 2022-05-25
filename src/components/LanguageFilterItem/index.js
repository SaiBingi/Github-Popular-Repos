import './index.css'

const LanguageFilterItem = props => {
  const {filterItem, isActive, changeLanguageFilter} = props
  const {id, language} = filterItem

  const activeLanguageFilterClassName = isActive
    ? 'active-language-filter-button'
    : ''

  const onClickLanguage = () => changeLanguageFilter(id)

  return (
    <li>
      <button
        type="button"
        className={`${activeLanguageFilterClassName} language-button`}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
