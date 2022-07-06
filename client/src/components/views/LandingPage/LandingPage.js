import React, { useEffect, useState } from 'react'
import { Icon, Col, Card, Row, Carousel } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import { FaCode } from "react-icons/fa";
import { auto } from 'async';
import { continents, price } from './Sections/Datas';
import axios from "axios";
import Meta from 'antd/lib/card/Meta';
import Checkbox from './Sections/CheckBox';
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import 'pure-react-carousel/dist/react-carousel.es.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import styled from 'styled-components';
import useHover from '../../../hooks/useHover';
import './Sections/LandingPage.css';


function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.")
                }
            })
    }




    const loadMoreHanlder = () => {

        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }

        getProducts(body)
        setSkip(skip)
    }


    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)

    }


    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log('filters', filters)

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)

    }

    {/* slider-bar - Carousel에 사용 - HEEJEONG*/ }
    const contentStyle = { 
        height: '320px',
        width: '100%'
      };

    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',

        responseive: [ //반응형 구현 옵션
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }            
        ]
    };

    const sliderStyle = {
        width:"80%", 
        height:"500px", 
        borderRadius:"20px", 
        boxShadow:"20px 20px 15px 2px rgb(199, 198, 198)",
        margin: "0 auto" // 슬라이더 내부 요소들 가운데 배치
    };

    const Wrap = styled.div`
        margin: 0 auto;
        margin-bottom: 10%;
        width: 100%;
        
        .slick-slide {
            margin: 1% auto;
        }
        .slick-list {
            margin: 0 5px;
        }
        
        .slick-prev:before {
            font-size: 30px;
            opacity: 0.3;
            color: grey;
            left: 0;
        }
        .slick-next:before {
            font-size: 30px;
            opacity: 0.3;
            color: grey;
        }
    `;

    const [ref, hover] = useHover();
    const [btnhide, setbtnHide] = useState(true); // 버튼숨기기
    
    return (
        <div style={{ width: '90%', margin: '0 auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h2>NEW - 아무말이나 <Icon type="rocket" /> </h2>
            </div>

            {/*Slider-bar-Carousel  - HEEJEONG*/}
            <Wrap >
            <Slider {...settings}>
                <div className='slider_item' /*onMouseEnter={() => {setbtnHide(false)}} onMouseLeave={() => {setbtnHide(true)}}*/>
                    <h3 style={{ textAlign: 'center' }}>1</h3>
                    <a href=''> 
                    <img 
                    style={sliderStyle} 
                    src='images/legoImg2.jpg' onmouseover='images/legoImg3.jpg' onmouseout= 'images/legoImg5.jpg'/>
                    </a>
                </div>
                
                <div className='slider_item'>
                    <h3 style={{ textAlign: 'center' }}>2</h3>
                    <img 
                    style={sliderStyle} 
                    src='images/legoImg2.jpg' />
                </div>
                <div className='slider_item'>
                    <h3 style={{ textAlign: 'center' }}>3</h3>
                    <img 
                    style={sliderStyle} 
                    src='images/legoImg2.jpg' />

                </div>
                <div className='slider_item'>
                    <h3 style={{ textAlign: 'center' }}>4</h3>
                    <img 
                    style={sliderStyle} 
                    src='images/legoImg2.jpg' />
                    
                </div>
                <div className='slider_item'>
                    <h3 style={{ textAlign: 'center' }}>5</h3>
                    <img 
                    style={sliderStyle} 
                    src='images/legoImg2.jpg' />

                </div>
                <div className='slider_item'>
                    <h3 style={{ textAlign: 'center' }}>6</h3>
                    <img 
                    style={sliderStyle} 
                    src='images/legoImg3.jpg' />

                </div>
            </Slider>
            </Wrap>

            <Carousel autoplay >
                <div >
                    <h3 style={{textAlign:'center'}}>1
                    <img style={contentStyle} src='images/Lego-banner2.JPG' />
                    </h3>
                </div>
                <div >
                    <h3 style={{textAlign:'center'}}>2
                    <img style={contentStyle} src='images/Lego-banner3.JPG' /></h3>
                </div>
                <div >
                    <h3 style={{textAlign:'center'}}>3
                    <img style={contentStyle} src='images/Lego-banner1.JPG' /></h3>
                </div>
                
            </Carousel>

            

        

           




         


            

        </div>
    )
}

export default LandingPage
