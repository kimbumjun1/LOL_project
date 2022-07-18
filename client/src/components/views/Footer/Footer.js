import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem', backgroundColor:'rgba(255, 215, 0, 0.4)'
        }}>
           <p> KIM & JANG </p>
           <div className='people-info' style={{display:'flex'}}>
                <div className='person' style={{margin:'0 1em'}}>
                    <span>김범준</span>
                </div>
                <div className='person' style={{margin:'0 1em'}}>
                    <span>김 진</span>
                </div>
                <div className='person' style={{margin:'0 1em'}}>
                    <span>장희정</span>
                </div>
           </div>
        </div>
    )
}

export default Footer
