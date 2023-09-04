import { useState } from "react";


import ButtonTheme from "./ButtonTheme";


const Main=()=>{
    return(
    <>
        <div>
        <input className="input_search" type="text" />
        <button className="btn_search">Поиск</button>
        </div>
        <ButtonTheme/>
        <div className="container">
            
        </div>
    </>
        
    )
}

export default Main;