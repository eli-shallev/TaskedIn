import { useEffect } from "react"
import { GrFormClose } from "react-icons/gr"
import { useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"
import { logout } from "../store/user.actions"

export function MemberModal({ setIsMemberModalOpen }) {
    const member = userService.getLoggedinUser() || {
        fullname: 'Guest',
        imgUrl: 'https://res.cloudinary.com/dlhh3aon3/image/upload/v1674333627/trello-profile-pics/T043N4KE97B-U0436HRD15K-ed7a82d2139d-512_xrimhd.jpg'
    }

    const navigate = useNavigate()

    function onLogout() {
        logout()
        setIsMemberModalOpen(false)
        navigate('/')
    }

    return (
        <div className="member-modal">
            <div className="member-info">
                <img src={member.imgUrl} alt="" />
                <span className="member-name">{member.fullname}</span>
            </div>
            {member.fullname !== 'Guest' && <div onClick={onLogout} className="btn-member">Logout</div>}
            <button className="btn-close-modal" onClick={() => setIsMemberModalOpen(false)}><GrFormClose /></button>
        </div>
    )
}