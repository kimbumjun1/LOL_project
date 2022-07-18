import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

function ProductMoreInfo() {

    const [folding, setFolding] = useState(false);
    const clickInfo = (e) => {
        setFolding(prevState => prevState ? false : true);
    }
    const InfoResult = () => (
        <div>
            <p>dfsfdfsfd상세 정보 설명 추가하기</p>
            <p>dfsfdfsfd상세 정보 설명 추가하기</p>
            <p>dfsfdfsfd상세 정보 설명 추가하기</p>
        </div>
    )


    return (
        <div style={{margin:'2em 0'}}> {/**style={{backgroundColor: 'tomato'}} */}
            <h1 >제품 상세 정보     <FontAwesomeIcon icon={faChevronDown} style={{cursor:'pointer'}} onClick={clickInfo}/> </h1>
            {folding ? <InfoResult /> : null}
            {/* <p>dfsfdfsfd상세 정보 설명 추가하기</p>

            <details>
                <summary></summary>
                <p>dfsfdfsfd상세 정보 설명 추가하기</p>
            </details> */}
            
        </div>
    )
}

export default ProductMoreInfo;