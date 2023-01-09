import { useState, useEffect } from 'react'
import logoHeader from '../img/trellologo.png';
import logoMenu from '../img/headermenupanelbotton.png';
import retrieveUser from '../logic/retrieveUser';
import { Link } from 'react-router-dom'
import Context from './Context'
import { useContext } from 'react'

function Header() {
    const { logout } = useContext(Context)

    const [toggleMenuComponent, setToggleMenuComponent] = useState('open')
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            retrieveUser(sessionStorage.token)
                .then(user => setUser(user))
                .catch(error => alert(error.message))

        } catch (error) {
        }
    }, [])

    // TOGGLE MENU OPEN & CLOSE
    const handleToggleMenu = () => {
        setToggleMenuComponent(toggleMenuComponent === "open" ? "close" : "open");
    }

    return (
        <>
            {/* HEADER */}
            <header className="flex flex-row z-0 items-center px-3 py-2 bg-[#0066a0]">
                <Link to="/">
                    <img
                        src={logoHeader}
                        alt="logoHeader"
                        className="w-40 cursor-pointer" />
                </Link>
                <img
                    src={logoMenu}
                    alt="logoMenu"
                    className="w-14 cursor-pointer ml-auto invert"
                    onClick={handleToggleMenu} />
            </header>
            {/* TOGGLE MENU */}
            {toggleMenuComponent === "close" && (
                <div className="flex justify-end right-0 absolute">
                    <div className="flex flex-col items-end content-end z-10 w-56 p-4 rounded-sm gap-2 bg-sky-100 border-sky-700 border-b-2 border-l -mt-1">
                        <p className="text-black pr-1">{user ? user.email : 'home'}</p>
                        <hr className="w-full border-sky-700 mx-auto my-2" />
                        <Link to="/community"
                            className="text-black pr-1 hover:font-semibold cursor-pointer"
                        >
                            Community
                        </Link>
                        <Link to="/settings-account"
                            className="text-black pr-1 hover:font-semibold">
                            Settings
                        </Link>
                        <Link to="/login"
                            className="text-black pr-1 hover:font-semibold"
                            onClick={logout}>
                            Logout
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header