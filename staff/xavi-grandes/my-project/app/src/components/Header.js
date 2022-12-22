import log from '../utils/coolog'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import Menu from './Menu'

export default function Header({ userName, listName } ) {
    log.info('Header -> render')

    const [show, setShow] = useState('close')
    const showMenu = event => {
        event.preventDefault()
    
        setShow(show === 'close'? 'menu': 'close')
    }

    return <header className="z-20 fixed w-full h-[3rem] top-0 flex items-center gap-8 bg-gray-100">
        <button className='p-2 ml-1 flex items-center cursor-pointer' onClick={showMenu}><AiOutlineMenu className='h-[20px] w-[20px]'/></button>
    { show === 'menu' && <Menu onClose={showMenu}/>}

        <p>{listName? listName: userName}</p>

    </header>
}