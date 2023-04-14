import { useContext } from "react";
import { Global } from "./Global";

function Nav() {

    const { route, setRoute, authName, logOut } = useContext(Global);

    return (

        <header className="header">
            <nav className="navbar">
                <span onClick={_ => setRoute('home')} className={'nav-link' + (route === 'home' ? ' active' : '')}>Home</span>
                {
                    authName ? <span onClick={_ => setRoute('admin')} className={'nav-link' + (route === 'admin' ? ' active' : '')}>Admin panel</span> : null
                }
                {
                    authName ? <span className="nav-link" onClick={logOut}>Logout</span> : <span onClick={_ => setRoute('login')} className="nav-link">Login</span>
                }
            </nav>
        </header>
    );

}

export default Nav;