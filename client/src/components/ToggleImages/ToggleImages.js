import React from "react";
import Active from "../ToggleImages/heart-fill.png";
import Inactive from "../ToggleImages/heart-empty.png";
import "./ToggleImages.css";

function ToggleImages({ active, handleChangeActive}) {
    return (
        <div>
        {/* <h1>Toggle images - 테스트</h1> */}
        <div className="toggle-wrapper">
            {active ? (
                <img 
                    className="active"
                    src={Active}
                    alt="red heart"
                    onClick={() => handleChangeActive()}
                />
            ) : (
                <img
                    className="inactive"
                    src={Inactive}
                    alt="thin heart"
                    onClick={() => handleChangeActive()} 
                />
            )}
        </div>
        </div>
    )
}

export default ToggleImages;