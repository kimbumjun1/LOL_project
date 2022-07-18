import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Row, Col} from 'antd';


function DetailProductPage(props) {

    const productId = props.match.params.productId

    const [Product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })
            .catch(err => alert(err))
    }, [])


    return (
        <div style={{ width: '100%', margin: '0 auto', paddingTop: '8em'  }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
                <h2>테스트</h2>
                <h2>DetailProductPage 페이지</h2>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} sm={24}>
                    {/* ProductImage */}
                    <ProductImage detail={Product}/>
                </Col>
                <Col lg={16} sm={21}>
                    {/* ProductInfo */}
                    <ProductInfo detail={Product} />
                </Col>
                
            </Row>
            
        </div>
        
        
    )
}

export default DetailProductPage
