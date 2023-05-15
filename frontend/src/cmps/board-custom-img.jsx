import { useState } from "react"
import { uploadService } from "../services/upload.service"
import { updateBoard } from "../store/board.actions"
import { FiPlus } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr"
import { FastAverageColor } from 'fast-average-color'
import tinycolor from "tinycolor2";
import { setAppTheme } from "../store/system.actions";

export function BoardCustomImg({ board }) {
    const [isUploading, setIsUploading] = useState(false)
    const [selectedImg, setSelectedImg] = useState(null)
    const getAverageColor = new FastAverageColor()

    async function uploadImg(ev) {
        setIsUploading(true)
        const img = await uploadService.uploadImg(ev)
        if (!board.customBgs) board.customBgs = []
        board.customBgs.push(img)
        updateBoard(board)
        onSetStyle(img.secure_url)
        setIsUploading(false)
    }

    async function onSetStyle(imgUrl) {
        let boardToSet = JSON.parse(JSON.stringify(board))
        boardToSet.style = {
            backgroundImage: `url('${imgUrl}')`,
            backgroundSize: 'cover',
        }
        const headerColor = await getAverageColor.getColorAsync(imgUrl)
        boardToSet.headerStyle = { backgroundColor: headerColor.rgba }
        updateBoard(boardToSet)


        // const appTheme = tinycolor(headerColor.rgba).isDark() ? 'dark' : 'light'
        // setAppTheme(appTheme)
    }

    async function onRemoveImg(ev) {
        ev.stopPropagation()
        board.customBgs = board.customBgs.filter(img => img.public_id !== selectedImg.public_id)
        updateBoard(board)
        setSelectedImg(null)
    }

    function onSetSelectedImg(ev, img) {
        ev.stopPropagation()
        setSelectedImg(img)
    }

    return (
        <section className="board-custom-img">
            <span>Custom</span>
            <div className="content">
                <div className="img-uploader">
                    {!isUploading && <label className="btn-custom" ><FiPlus />
                        <input type="file" onChange={uploadImg} accept="img/*" className="img-upload" />
                    </label>}
                    {isUploading && <div className="loader-container">
                        <img width='100px' src={require(`../assets/img/upload-loader.gif`)} />
                    </div>}
                </div>

                {board.customBgs && board.customBgs.map(img => {
                    return (
                        <div className="custom-img-item" key={img.public_id} onClick={() => onSetStyle(img.secure_url)}>
                            <img src={img.secure_url} />
                            <a onClick={(event) => onSetSelectedImg(event, img)}>Remove</a>

                            {selectedImg?.public_id === img.public_id && <div className="remove-modal">
                                <div className="modal-header">
                                    <span> Delete background?</span>
                                    <button className="btn-close-modal" onClick={() => setSelectedImg(null)}><GrFormClose /></button>
                                </div>
                                <hr />
                                <div className="modal-content">
                                    <p>Deleting a background is permanent. There is no undo.</p>
                                    <button className="btn-remove-bg" onClick={onRemoveImg}>Delete</button>
                                </div>

                            </div>}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}