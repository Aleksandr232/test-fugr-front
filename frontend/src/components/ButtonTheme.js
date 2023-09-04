import { useTheme } from "../hooks/useTheme";

import sun from '../assets/img/icon-sun.png';
import moon from '../assets/img/moon.png';


 const ButtonTheme=()=>{
    const { theme, setTheme } = useTheme();

    const ThemeClick = () => {
        theme === "light" ? setTheme("dark-theme") : setTheme("light");
        console.log("тема", theme);
      };

    return(
        <div onClick={ThemeClick} className="theme-btn flex-center">
        <img className="theme-sun" src={sun} alt="" />
        <img className="theme-moon" src={moon} alt="" />
      </div>
    )
}

export default ButtonTheme;