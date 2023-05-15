import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import { MainHeaderColorPicker } from "./main-header-color-picker";
import { BoardColorPicker } from "./board-color-picker";
import { BoardImgPicker } from "./board-img-picker";
import { BoardCustomImg } from "./board-custom-img";
import { BsArchive } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr"
import { removeBoard } from "../store/board.actions";
import { useNavigate } from "react-router-dom";

export function SideMenu({ board, isSideMenuOpen, setIsSideMenuOpen }) {
    const [isBgColorPickerOpen, setIsBgColorPickerOpen] = useState(false)
    const [isBgColorPickerMenuOpen, setIsBgColorPickerMenuOpen] = useState(false)
    const [isBgImgPickerMenuOpen, setIsBgImgPickerMenuOpen] = useState(false)
    const [isRemoveOpen, setIsRemoveOpen] = useState(false)
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
    const [title, setTitle] = useState('Menu')
    const navigate = useNavigate()

    function onReturn() {
        if (isBgColorPickerMenuOpen || isBgImgPickerMenuOpen) {
            setIsBgColorPickerMenuOpen(false)
            setIsBgImgPickerMenuOpen(false)
            setIsBgColorPickerOpen(true)
        } else {
            setIsBgColorPickerOpen(false)
        }
    }

    function toggleRemoveBtn() {
        setIsRemoveOpen(prevState => !prevState)
    }

    async function onRemoveBoard() {
        try {
            await removeBoard(board._id)
            navigate(`/workspace`)
        } catch (error) {
            console.log('Cannot remove board')
        }
    }

    useEffect(() => {
        if (!isBgColorPickerOpen && !isBgColorPickerMenuOpen && !isBgImgPickerMenuOpen) setTitle('Menu')
        if (isBgColorPickerOpen) setTitle('Change background')
        if (isBgColorPickerMenuOpen) setTitle('Board colors')

    }, [isBgColorPickerOpen, isBgColorPickerMenuOpen, isBgImgPickerMenuOpen])

    function onArchive() {
        toggleRemoveBtn()
        if (isRemoveModalOpen) setIsRemoveModalOpen(false)
    }

    function onBtnBg(){
        setIsBgColorPickerOpen(true)
        setIsRemoveModalOpen(false)
        setIsRemoveOpen(false)
    }

    return (
        <section className={`side-menu ${isSideMenuOpen ? 'open' : ''}`}>
            <div className="side-menu-header">
                {!isBgImgPickerMenuOpen && <span className="title">{title}</span>}
                {isBgImgPickerMenuOpen && <span className="title">Photos by <a href={`https://unsplash.com`} target="_blank">Unsplash</a></span>}
                <button onClick={() => setIsSideMenuOpen(false)} className="btn-close-menu"><AiOutlineClose /></button>
                {(isBgColorPickerOpen || isBgImgPickerMenuOpen) && <button onClick={onReturn} className="btn-return-menu"><AiOutlineLeft /></button>}
            </div>
            <hr />
            <div className="menu-content">
                {!(isBgColorPickerOpen || isBgImgPickerMenuOpen) && <div className="btn-background" onClick={onBtnBg}>
                    <div style={board.style} className="preview"></div>
                    <span>Change background</span>
                </div>}

                {!(isBgColorPickerOpen || isBgImgPickerMenuOpen) && <div onClick={onArchive} className={`btn-archive ${isRemoveOpen ? 'open' : ''}`}>
                    <BsArchive />
                    <span>Archive</span>
                </div>}
                {!(isBgColorPickerOpen || isBgImgPickerMenuOpen) && isRemoveOpen && <div onClick={() => setIsRemoveModalOpen(true)} className={`btn-remove-board`}>
                    <RiDeleteBin6Line />
                    <span>Delete Board</span>
                </div>}
                {!(isBgColorPickerOpen || isBgImgPickerMenuOpen) && isRemoveModalOpen && <div className="remove-modal">
                    <div className="modal-header">
                        <span> Delete board?</span>
                        <button className="btn-close-modal" onClick={() => setIsRemoveModalOpen(false)}><GrFormClose /></button>
                    </div>
                    <hr />
                    <div className="modal-content">
                        <p>Deleting a board is <span>permanent</span>. There is <span>no undo</span>. are you sure?</p>
                        <button className="btn-remove-board" onClick={onRemoveBoard}>Delete</button>
                    </div>

                </div>}



                <div className={`bg-change-menu ${isBgColorPickerOpen && !isBgColorPickerMenuOpen ? 'open' : ''}`}>
                    <div className="set-pickers">
                        <div className="bg-photos">
                            <img src={require(`../assets/img/bg-photos.png`)} onClick={() => { setIsBgImgPickerMenuOpen(true); setIsBgColorPickerOpen(false) }} />
                            <span>Photos</span>
                        </div>
                        <div className="bg-colors">
                            <img src={require(`../assets/img/bg-colors.png`)} onClick={() => setIsBgColorPickerMenuOpen(true)} />
                            <span>Colors</span>
                        </div>
                    </div>
                    <hr />
                    <BoardCustomImg board={board} />
                </div>
                <BoardImgPicker board={board} isBgImgPickerMenuOpen={isBgImgPickerMenuOpen} />
                <BoardColorPicker board={board} isBgColorPickerMenuOpen={isBgColorPickerMenuOpen} />
            </div>
        </section>
    )
}