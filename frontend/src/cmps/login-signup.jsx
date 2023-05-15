import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"
import { login, signup } from "../store/user.actions"


export function LoginSignup() {
    const [userToSet, setUserToSet] = useState(userService.getEmptyUser())
    const [isSignUp, setIsSignUp] = useState(false)
    const navigate = useNavigate()


    function handleChange({ target }) {
        const { value, name: field } = target
        setUserToSet(prevUser => ({ ...prevUser, [field]: value }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        try {
            if (isSignUp) {
                await signup(userToSet)
            }
            else {
                delete userToSet.fullname
                await login(userToSet)
            }
            navigate('/workspace')
        } catch (err) {
            console.log('had a problame', err)
        }

    }

    function toggleLoginSignup() {
        setIsSignUp(prevState => !prevState)
    }



    return (
        <section className="login-signup">
            <img src={require(`../assets/img/new-logo.png`)} alt="trello logo" className="logo" />

            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-header">
                    <span className="title">Log in to TaskedIn</span>
                </div>
                <div className="form-content">
                    {isSignUp && <input type="text"
                        name="fullname"
                        required
                        placeholder="Enter full name"
                        value={userToSet?.fullname}
                        onChange={handleChange}
                    />}
                    <input type="text"
                        name="username"
                        required
                        placeholder="Enter user name"
                        value={userToSet?.username}
                        onChange={handleChange}
                    />
                    <input type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={userToSet?.password}
                        onChange={handleChange}
                    />
                    <button className="btn-login"> {isSignUp ? 'Sign up' : 'Continue'}</button>
                </div>
                <hr />
                <div className="form-footer">
                    <span onClick={toggleLoginSignup}>
                        {isSignUp ? 'Already have a account? Log in' : 'Sign up for an account'}
                    </span>
                </div>
            </form>

            <img className="left-img" src={require(`../assets/img/login-left-img.png`)} alt="" />
            <img className="right-img" src={require(`../assets/img/login-right-img.png`)} alt="" />
        </section>
    )
} 