import style from "./SearchPanel.module.css"
import SearchIcon from "./img/SearchIconNew.svg"

const SearchPanel = ({title}) =>{
    return (
        <div className={style.SearchPanelBox}>
            <img src={SearchIcon} className={style.SearchIcon} />
            <input placeholder={title} className={style.SearchInput}></input>
        </div>
    )
}

export default SearchPanel;