import React, {useState} from 'react'
import "./UserCardBlock.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";

function UserCardBlock(props) {

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }


    // const renderItems = () => (
    //     props.products && props.products.map((product, index) => (
    //         <tr key={index}>
    //             <td>
    //                 <img style={{ width: '70px' }} alt="product"
    //                     src={renderCartImage(product.images)} />
    //             </td>
    //             <td>
    //                 {product.quantity} EA
    //             </td>
    //             <td>
    //                 $ {product.price}
    //             </td>
    //             <td>
    //                 <button onClick={() => props.removeItem(product._id)}>
    //                     Remove 
    //                 </button>
    //             </td>
    //         </tr>


    //     ))
    // )

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <div key={index}>
                <div>
                    <img style={{ width: '70px' }} alt="product"
                        src={renderCartImage(product.images)} />
                </div>
                <div>
                    {product.quantity} EA
                </div>
                <div>
                    $ {product.price}
                </div>
                <div>
                    <button onClick={() => props.removeItem(product._id)}>
                        Remove 
                    </button>
                </div>
            </div>


        ))
    )

    const [count, setCount] = useState(0); /* 수량버튼에 사용할 것  padding: '3rem 4rem'*/
    const onPlus = () => {
        setCount(count + 1);
    }
    const onMinus = () => {
        setCount((count) => (count <= 0 ? 0 : count - 1));
    }


    return (
        <div style={{padding:'1em 1em'}}>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
                <input type='checkbox' /><FontAwesomeIcon icon={faTrashCan} />
                {/* {renderItems()} */}
            </div>
            <div style={{display:'flex'}}>
                <div>
                    이미지
                </div>
                <div>
                    <div>이름</div>
                    <div className='product_count'>
                        <button className='count_plus' onClick={onPlus}>+</button>
                        <span className='count_result'>{count}</span>
                        <button className='count_minus' onClick={onMinus}>-</button>
                    </div>
                    <div>가격</div> {/*count 곱한 결과 보여주기 */}
                </div>
            </div>

            {/* {renderItems()} */}

            {/* <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table> */}


        </div>
    )
}

export default UserCardBlock
