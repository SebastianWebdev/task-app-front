import React from 'react'
const prevImg = (props) => {
    const { url } = props
    return (
        <div className='prev-img-container'>
            <img className='prev-img' src={url} alt="" />
        </div>
    );
}

export default prevImg;