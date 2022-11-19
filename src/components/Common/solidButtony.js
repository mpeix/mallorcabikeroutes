import { Link } from "react-router-dom";
import { AutoTextSize } from 'auto-text-size'

function SolidButton({IsLink, Url, Text, TailwindColor, Css, Style, MaxFontSize, onClick}){
    const cssClass = `uppercase py-2 px-4 rounded-lg border-transparent
                      text-white text-md mr-4 border-2 
                      bg-${TailwindColor}-500 hover:bg-${TailwindColor}-400 ${Css || ""}`;
    
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

export default SolidButton;