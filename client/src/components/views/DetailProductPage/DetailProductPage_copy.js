import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Row, Col} from 'antd';
import ToggleImages from "../../ToggleImages/ToggleImages.js"
import Swal from 'sweetalert2';
import "./Sections/DetailProductPage.css"
import RecommendedProduct from './Sections/RecommendedProducts';
import ProductMoreInfo from './Sections/ProductMoreInfo';
import { Route, Switch, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addToCart} from "../../../_actions/user_actions"

function DetailProductPage(props) {

    const productId = props.match.params.productId // 제품의 유니크id

    const [Product, setProduct] = useState({})

    useEffect(() => {
        // 하나의 상품 정보만 가져오기
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => { // 결과값
                console.log('response.data', response.data) // 결과값 확인용 - 나중에 삭제
                setProduct(response.data[0])
            })
            .catch(err => alert(err))
    }, [])
    


    /* 추가 부분 - HEEJEONG*/
    const [count, setCount] = useState(0); /* 수량버튼에 사용할 것  padding: '3rem 4rem'*/
    //const [totalPrice, setTotalPrice] = useState(0) /* 수량버튼 결과에 따른 가격 변화 */ 
    const onPlus = () => {
        setCount(count + 1);
    }
    const onMinus = () => {
        setCount((count) => (count <= 0 ? 0 : count - 1));
    }

    const [active, setActive] = useState(false); /** 하트 좋아요에 이용 */
    const handleChangeActive = () => {
        setActive((previousHeart) => {
            return !previousHeart;
        });
    };

    
    const dispatch = useDispatch(); // addToCart 사용하려고 만듦 - tmp

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
                //dispatch(addToCart(props.detail._id)) // 장바구니에 넣어주기
                window.location.href="/user/cart"; // 장바구니 페이지로 바꿔주기
                
            }
            else {
                //dispatch(addToCart(props.detail._id)) // 장바구니에 넣어주기
            }
        })
    };
    

    
    return (
        <div style={{ width: '100%', margin: '0 auto', padding:'8em 0' }}> {/*padding: '3rem 4rem' padding:'8em 0'*/}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
                <h2>테스트</h2>
                <h2>DetailProductPage 페이지</h2>
            </div>

            <br />

            <div style={{width:'80%', margin: '0 auto'}}>
                <div>홈 > 시리즈 ..sort 추가하기</div>
                {/*L: 제품 사진 ,R: 제품 정보,가격  */}
                <div className='product_info_container' style={{display:'flex'}}>
                    <div className='product_img' style={{width:'60%',margin:'0 auto', backgroundColor:'beige', padding:'1em 1em'}}>
                        <h2>사진 부분</h2>
                        {/* ProductImage */}
                        {/* <ProductImage detail={Product}/> */}
                    </div>
                    <div className='product_description' style={{width:'40%', margin:'0 auto', padding:'1em 1em'}}>  {/**backgroundColor:'skyblue' */}
                        <h2>설명 부분</h2>
                        <h2>{Product.title}</h2>
                        {/* ProductInfo - 태그,이름, 시리즈 로고 */}
                        {/* <ProductInfo detail={Product} /> Price, description */}
                        <div>가격위치<span>원</span></div> {/* 가격 위치 {props.detail.price} */}

                        {/* 수량 +/- 버튼 */}
                        <div className='product_count'>
                            <button className='count_plus' onClick={onPlus}>+</button>
                            <span className='count_result'>{count}</span>
                            <button className='count_minus' onClick={onMinus}>-</button>
                        </div>
                        
                        {/* 구매, 장바구니 버튼 */}
                        <div className='product_btn_container' style={{display:'flex', margin:'10px 0'}}>
                            <button className='product_btn'>바로구매</button>
                            <button className='product_btn' onClick={addCartAlert} >장바구니 추가</button>
                            {/* Heart Icon 추가하기 */}
                            <div className='product_heart'><ToggleImages active={active} handleChangeActive={handleChangeActive} /></div>

                        </div>

                        {/*배송 및 반품 */}
                        <div></div>

                        {/*조립 설명서 */}
                        <div></div>


                    </div>

    
                </div>

                {/* 제품 상세정보 */}
                <ProductMoreInfo />
            
                {/* 추천 제품 띄우기 - 4개 2개 1개 */}
                <RecommendedProduct />


                <Row gutter={[10, 10]} style={{backgroundColor:'beige'}}>
                    <Col lg={12} sm={24} style={{backgroundColor:'Gold'}}>
                        1열
                        
                    </Col>
                    <Col lg={12} sm={24} style={{backgroundColor: 'tomato'}}>
                        2열
                        
                    </Col>
                </Row>


            </div>


            {/*}
            <Row gutter={[16, 16]} >
                <Col lg={12} sm={24}>
                    {/* ProductImage *}
                    <ProductImage detail={Product}/>
                </Col>
                <Col lg={16} sm={21} >
                    {/* ProductInfo }
                    <ProductInfo detail={Product} /> {/* Price, description }

                    {/* 수량 +/- 버튼 }
                    <div className='product_count' style={{display:'flex'}}>
                        <button className='count_plus' onClick={onPlus}>+</button>
                        <h2 className='count_result'>{count}</h2>
                        <button className='count_minus' onClick={onMinus}>-</button>
                    </div>
                    
                    <div className='product_btn_container' style={{display:'flex'}}>
                        <button className='product_btn'>바로구매</button>
                        <button className='product_btn' onClick={addCartAlert} >장바구니 추가</button>
                        {/* Heart Icon 추가하기 }
                        <div className='product_btn'><ToggleImages active={active} handleChangeActive={handleChangeActive} /></div>

                    </div>
                </Col>
                
            </Row>
            */}


            
        </div>
        
        
    )
}

export default DetailProductPage
