import React from "react";
import Swal from 'sweetalert2';
import "./RecommendedProducts.css";

function RecommendedProduct () {

    const productStyle = {
        width: '22%',
        height: '400px',
        // backgroundColor: 'beige',
        borderRadius:'15px',
        boxShadow: '2px 4px 12px rgba(0 0 0/8%)',
        // transition: 'all .3s cubic-bezier(0, 0, .5, 1)'
    }

    const btnStyle = {
        cursor: 'pointer',
        color: 'white',
        backgroundColor: 'cornflowerblue',
        border: 'none',
        borderRadius: '10px'

    }

    const addCartAlert = () => { // 장바구니 알림
        Swal.fire({
            title: "장바구니에 잘 담겼어요!", 
            icon: "success",
            showCancelButton: true,
            confirmButtonText:"장바구니 이동",
            cancelButtonText:"쇼핑 계속하기",
        })
        .then((result) => {
            if(result.isConfirmed){
                window.location.href="/user/cart"; // 장바구니 페이지로 바꿔주기
            }
        })
    };

    return (
        <div >
            <h1>추천제품</h1>
            <div className="recommend-product-container" style={{display: 'flex', justifyContent:'space-around', }}>
                <div className="recommend-product" style={productStyle}>
                    <div>제품 사진</div>
                    <div>제품 이름</div>
                    <div>제품 가격</div>
                    <button onClick={addCartAlert}>장바구니 추가</button>
                </div>
                <div className="recommend-product" style={productStyle}>
                    <div>제품 사진</div>
                    <div>제품 이름</div>
                    <div>제품 가격</div>
                    <button onClick={addCartAlert}>장바구니 추가</button>
                </div>
                <div className="recommend-product" style={productStyle}>
                    <div>제품 사진</div>
                    <div>제품 이름</div>
                    <div>제품 가격</div>
                    <button onClick={addCartAlert}>장바구니 추가</button>
                </div>
                <div className="recommend-product" style={productStyle}>
                    <div>제품 사진</div>
                    <div>제품 이름</div>
                    <div>제품 가격</div>
                    <button onClick={addCartAlert}>장바구니 추가</button>
                </div>
            </div>

        </div>
    )
}

export default RecommendedProduct;