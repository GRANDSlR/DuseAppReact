
import style from './CollegePreloader.module.css';


const CollegePreloader = () => {

    return (
        <div className={style.MainBox}>
            <div className={`${style.Elem} ${style.Title}`}></div>
            <div className={`${style.Elem} ${style.Grade}`}></div>
            <div className={`${style.Elem} ${style.Body}`}></div>
            <div className={`${style.Elem} ${style.Button}`}></div>
        </div>
    );
}

export default CollegePreloader;