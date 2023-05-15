export function AppHeader() {

    return (
        <header className="header-main full">
            <div className="header-sub">
                <a href="/" className='a-logo'><img src={require(`../assets/img/new-logo.png`)} alt="trello logo" className="header-nav-logo" /></a>
                <div className="header-nav-btns">
                    <a href="/login-signup" className="a-login fs18-5">Log in</a>
                    <a href="/workspace" className="a-try fs18">Get TaskedIn now!</a>
                </div>
            </div>
        </header>
    )
}