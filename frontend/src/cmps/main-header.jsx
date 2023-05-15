import React, { useState } from 'react'
import { BiSearch } from "react-icons/bi"
import { SiTrello } from 'react-icons/si'
import { AiOutlineDown, AiOutlineHome } from "react-icons/ai"
import { BoardStarredList } from './board-starred-list'
import { BoardAdd } from './board-add'
import { BoardSearchList } from './board-search-list'
import { useEffect } from 'react'
import { BoardRecentList } from './board-recent-list'
import { useSelector } from 'react-redux'
import { FiPlus } from "react-icons/fi";
import { userService } from '../services/user.service'
import { MemberModal } from './member-Modal'

export function MainHeader() {
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const appTheme = useSelector((storeState) => storeState.systemModule.appTheme)
  const [isStarredListOpen, setIsStarredListOpen] = useState(false)
  const [isSearchListOpen, setIsSearchListOpen] = useState(false)
  const [isRecentListOpen, setIsRecentListOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(null)
  const [modalLoc, setmodalLoc] = useState(null)
  const [hideHeader, setHideHeader] = useState(false)

  useEffect(() => {
    console.log('path:',window.location.pathname)
    if (window.location.href === 'http://localhostt:3000/' || window.location.href === 'http://localhostt:3000/login-signup' ||
      window.location.pathname === '/login-signup' || window.location.pathname === '/') {
      setHideHeader(true)
      
    } else {
      setHideHeader(false)
    }
  }, [window.location.href])


  function toggleStarredList(ev) {
    const BoundingClientRect = ev?.target.getBoundingClientRect()
    const modalLocToSet = {
      left: `${BoundingClientRect?.left}px`,
      top: `${BoundingClientRect?.bottom}px`
    }
    setIsStarredListOpen(prevState => !prevState)
    setmodalLoc(modalLocToSet)
  }

  function toggleSearchList(ev) {
    const BoundingClientRect = ev?.target.getBoundingClientRect()
    const modalLocToSet = {
      left: `${BoundingClientRect?.right - 500}px`,
      //top: `${BoundingClientRect?.bottom}px`,
    }
    setIsSearchListOpen(prevState => !prevState)
    setmodalLoc(modalLocToSet)
  }

  function toggleRecentList(ev) {
    const BoundingClientRect = ev?.target.getBoundingClientRect()
    const modalLocToSet = {
      left: `${BoundingClientRect?.left}px`,
      top: `${BoundingClientRect?.bottom}px`
    }
    setIsRecentListOpen(prevState => !prevState)
    setmodalLoc(modalLocToSet)
  }

  function onToggleCreateBoardModal(ev) {
    const BoundingClientRect = ev?.target.getBoundingClientRect()
    const modalLocToSet = {
      left: `${BoundingClientRect?.left}px`,
      top: `${BoundingClientRect?.bottom + 16}px`
    }
    setIsCreateModalOpen(prevState => !prevState)
    setmodalLoc(modalLocToSet)
  }

  function getMemberImg() {
    const user = userService.getLoggedinUser()
    const defualtImg = 'https://res.cloudinary.com/dlhh3aon3/image/upload/v1674333627/trello-profile-pics/T043N4KE97B-U0436HRD15K-ed7a82d2139d-512_xrimhd.jpg'
    if (!user || !user.imgUrl) return defualtImg
    return user.imgUrl
  }

  return (
    <div>
      {!hideHeader && <div style={board.headerStyle} className={`main-header ${appTheme}`}>
        <div className='left-container'>

          <a className='logo' href="/">
            <AiOutlineHome /></a>
          <a className='logo' href="/workspace">TaskedIn</a>
          <div className='btn-recent' onClick={(event) => toggleRecentList(event)}>
            Recent
            <AiOutlineDown />
          </div>
          <div className='btn-starred' onClick={(event) => toggleStarredList(event)}>
            Starred
            <AiOutlineDown />
          </div>
          <div className='btn-create' onClick={(event) => onToggleCreateBoardModal(event)}> <span>Create</span><FiPlus /> </div>
        </div>
        <div className='right-container'>
          <div className='search-container' onClick={(event) => toggleSearchList(event)}>
            <BiSearch /> <span>Search</span>
          </div>
          <img onClick={() => setIsMemberModalOpen(true)} width='26px' style={{ borderRadius: '50%' }} src={getMemberImg()} alt="" />
        </div>

        {isStarredListOpen && <BoardStarredList toggleStarredList={toggleStarredList} modalLoc={modalLoc} />}
        {isRecentListOpen && <BoardRecentList toggleRecentList={toggleRecentList} modalLoc={modalLoc} />}
        {isCreateModalOpen && <BoardAdd addModalLoc={modalLoc} onToggleAddBoardModal={onToggleCreateBoardModal} fromHeader={true} />}
        {isSearchListOpen && <BoardSearchList toggleSearchList={toggleSearchList} modalLoc={modalLoc} />}
        {isMemberModalOpen && <MemberModal setIsMemberModalOpen={setIsMemberModalOpen} />}
      </div>}
    </div>
  )
}
