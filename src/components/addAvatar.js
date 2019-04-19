import React, { useEffect, useState } from 'react'
import './components Css/AddAvatar.css'
import handleDroppedFiles from '../functions/handleDroppedFiles'
import previevFiles from '../functions/previevFile'
import PrevImg from './PrevImg'
import copyData from '../functions/copyData'
const AddAvatar = (props) => {
    const { userId, setAvatar, closeAvatar } = props
    const [droppedFile, setDroppedFile] = useState()
    const [isFile, setIsFile] = useState(false)
    const [prevurl, setPrevUrl] = useState([])
    const [isUploaded, setIsUploaded] = useState(false)
    const [isDownloaded, setIsDownloaded] = useState(false)
    const [isOnDraggedArea, setIsOnDraggedArea] = useState(false)


    const dragHandler = e => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter") {
            setIsOnDraggedArea(true)
        } else if (e.type === "dragleave") {
            setIsOnDraggedArea(false)

        } else if (e.type === "dragover") {
            setIsOnDraggedArea(true)
        } else if (e.type === "drop") {
            setIsOnDraggedArea(false)
            const dt = e.dataTransfer
            const file = dt.files


            setDroppedFile(file)
            const reader = previevFiles(file)
            // console.log(reader, 'reader z addAvatar');
            reader.onloadend = () => {
                const src = reader.result
                //console.log(src, 'src z reader onload')
                setPrevUrl(src)
                setIsFile(true)
            }

        }
    }
    const handleInput = e => {
        e.preventDefault()
        const file = e.target.files
        setDroppedFile(file)
        const reader = previevFiles(file)
        reader.onloadend = () => {
            const src = reader.result
            //console.log(src, 'src z reader onload')
            setPrevUrl(src)
            setIsFile(true)
        }


    }
    const handleClick = e => {
        handleDroppedFiles(droppedFile).then(res => {
            if (res.status === 200) {
                setIsUploaded(true)

                setTimeout(() => {
                    closeAvatar()
                    setAvatar(prevurl)
                }, 1000)
            }
        })
    }
    console.log(prevurl, 'prevUrl z addAVatar');

    return (
        <div className='uploud-avatar-wrapper'>
            <div className={`dragg-area ${isOnDraggedArea ? 'highlight' : null}`} onDragEnter={dragHandler} onDragLeave={dragHandler} onDragOver={dragHandler} onDrop={dragHandler}>
                {isUploaded ? <p className="drop-desc">Zdjęcie zostało wysłane</p> : <> <p className="drop-desc">Przeciągnij tutaj Plik</p>
                    <p className="drop-desc">Albo Wybierz z listy </p><i className="fas fa-arrow-down"></i>
                    <form action="">
                        <label className="avatar-input-label btn-rec" htmlFor="avatar-input">Wybierz avatar</label>
                        <input onChange={handleInput} type="file" id="avatar-input" name="avatar"
                            accept="image/png, image/jpeg" />
                    </form> </>}

                {isFile ? <div className="previev-galery">
                    <PrevImg url={prevurl} />
                    <button onClick={handleClick} className="send-avatar-button">Wyślij zdjęcie</button>
                </div> : null}
            </div>

        </div>
    );
}

export default AddAvatar;