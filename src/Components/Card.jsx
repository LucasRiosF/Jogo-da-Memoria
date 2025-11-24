import React from "react";

export default function Card({ image, virada, acerto, erro, onClick}) {
    return(
        <div className={`card ${virada ? "virada" :  ""} ${acerto ? "acerto" : ""} ${erro ? "erro" : ""}` } onClick={onClick}> 
        <div className="interior-carta">
        <div className="frente-carta">
            <img src={image}/>
        </div>
        <div className="atras-carta">
            
        </div>
        </div>
        </div>
         );
        }
