import { AiOutlinePlusCircle, AiOutlineSearch, AiFillHome } from 'react-icons/ai'
import { BsPersonCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import extractSubFromToken from '../utils/extractSubFromToken'

function Footer({onCreate}) {
    const userId = extractSubFromToken(sessionStorage.token)

    return <footer className='fixed bg-[white] w-full h-[2rem] bottom-0 flex justify-around bg-white dark:bg-black text-black dark:text-white'>
        <Link to={'/'} ><AiFillHome size='1.5rem' /></Link>
        <button><AiOutlineSearch size='1.5rem' /></button>
        <button onClick={onCreate}><AiOutlinePlusCircle size='1.5rem' /></button>
        <Link to={`/profile/${userId}`}><BsPersonCircle size='1.5rem' /></Link>
    </footer>
}

export default Footer