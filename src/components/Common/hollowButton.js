import { Link } from "react-router-dom";
import { AutoTextSize } from 'auto-text-size'
function HollowButton({IsLink, Url, Text, TailwindColor, Css, Style, MaxFontSize, onClick}){
    const cssClass=`uppercase py-2 px-4 rounded-lg bg-transparent border-2 
                    border-${TailwindColor}-500  text-${TailwindColor}-500 
                    dark:text-white  hover:bg-${TailwindColor}-500 
                    hover:text-white text-md ${Css || ""}`;
   
    const onButtonClick = () => (onClick && onClick());

    return(
        IsLink ?
        <Link to={Url} className={cssClass}>
            <AutoTextSize maxFontSizePx={MaxFontSize || null}>{Text}</AutoTextSize>
        </Link>
        :
        <button type="button" className={cssClass} onClick={onButtonClick} style={Style || {}}>
            <AutoTextSize mode='multiline' maxFontSizePx={MaxFontSize || null} style={{margin:'auto'}}>{Text}</AutoTextSize>
        </button>
    )
    
}

export default HollowButton;