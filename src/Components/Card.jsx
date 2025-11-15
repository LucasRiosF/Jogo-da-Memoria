import React from "react";

export default function Card({ image, virada, onClick}) {
    return(
        <div
        onClick={onClick}
        style={{
            width:"140px",
            height:"196px",
            borderRadius:"10px",
            overflow:"hidden",
            border: "2px solid #900",
            backgroundColor: virada ? "#fff" : "red",
            cursor:"pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
        }>
            {virada && (
                <img 
                src={image}
                alt="card"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}
                />
            )}

        </div>
    )
}