import style from "./SearchPanel.module.css";
import SearchIcon from "./img/SearchIcon.png";

const SearchPanel = ({title, CollegeTitleInputHandler}) =>{

    return (
        <div className={style.SearchPanelBorder}>
            <div className={style.SearchPanelBox}>
                <img src={SearchIcon} className={style.SearchIcon} />
                <input placeholder={title} className={style.SearchInput} onChange={CollegeTitleInputHandler}></input>
            </div>
        </div>
    )
}

export default SearchPanel;