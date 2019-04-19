//import React from 'react'

const previevFiles = (data) => {

    const reader = new FileReader()
    reader.readAsDataURL(data[0])
    return reader
}
export default previevFiles