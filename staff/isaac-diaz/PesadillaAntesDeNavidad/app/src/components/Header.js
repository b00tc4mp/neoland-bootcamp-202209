import log from '../utils/coolog'
import { AiOutlineLogout } from 'react-icons/ai'
import { IoInvertModeOutline } from 'react-icons/io5'
import Context from './Context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

export default function Header({ userName }) {
    log.info('Header -> render')

    const { logout } = useContext(Context)

    const switchMode = () => document.querySelector('html').classList.toggle('dark')

    return <header className='fixed w-screen h-16 mb-4 top-0 flex justify-center items-center gap-2 bg-yellow-500 dark:bg-black text-black dark:text-white'>
        <div className='flex'>
            <Link to='/'>
                <img className='w-5 h-5' src='https://www.muycomputer.com/wp-content/uploads/2019/02/secuela-pesadilla-antes-de-navidad-1-1.jpg' />
            </Link>
        </div>
        <p>{userName}</p>

        <button onClick={logout}><AiOutlineLogout /></button>

        <button onClick={switchMode}><IoInvertModeOutline /></button>
    </header>
}