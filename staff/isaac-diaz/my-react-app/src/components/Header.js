import log from '../utils/coolog'
import { AiOutlineLogout } from 'react-icons/ai'
import { IoInvertModeOutline } from 'react-icons/io5'
import Context from './Context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import extractSubFromToken from '../utils/extractSubFromToken'


export default function({ userName }) {
    log.info('Header -> render')

   const { logout } = useContext(Context)

//    const switchMode = () => document.querySelector('html').classList.toggle('dark')

   const userId = extractSubFromToken(sessionStorage.token)

    return <header className='fixed bg-[white] w-full h-[2rem] top-0 flex justify-center items-center gap-2 dark:bg-black text-black dark:text-white'>
        <Link to={`/profile/${userId}`}>{userName}</Link>

        <button onClick={logout}><AiOutlineLogout /> </button>
        {/* <button onClick={switchMode}><IoInvertModeOutline /></button> */}
        </header>
} 