import React, { useState } from 'react';
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import './Navbar.css'

const {Search} = Input;
const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);
    };
    const onSearch = (value) => console.log(value) //확인용-나중에 삭제

    {/*box-sizing: border-box;, height: '30px', borderRadius: '30px', padding: '0 15px' */}

    const styledSearch = styled(Search)`
        height: 30px;
        border-radius: 30px;
        padding: 0 15px;
    `

    return (
        
        <div className='search_bar'>
            <Search   
                placeholder='Search here...' 
                allowClear
                style={{ width: '250px', height: '30px'}} 
                onSearch={onSearch}
                enterbutton='Search'
            />
        
        </div>
        
    )

}

export default SearchBar;