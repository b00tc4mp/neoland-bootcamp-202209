import { useState, useEffect } from 'react'
import retrieveMainAdventures from '../logic/retrieveMainAdventures'
import buttonBack from '../img/icon-back.png';
import buttonHome from '../img/icon-home.png';
import buttonCreateActive from '../img/button-create-active.png';
import buttonCreat from '../img/button-create.png';
import buttonDelete from '../img/icon-delete.png';
import adventureMainOne from '../img/adventure-main-one.png';
import { Link } from 'react-router-dom'
import extractSubFromToken from '../utils/extractSubFromToken'
import DeleteAdventure from '../components/DeleteAdventure'

function Adventures() {
    const userId = extractSubFromToken(sessionStorage.token)
    const [mainAdventures, setMainAdventures] = useState(null)
    const [hoverButtonCreate, setHoverButtonCreate] = useState(false)
    const [adventureIdToDelete, setAdventureIdToDelete] = useState()

    useEffect(() => {
        try {
            retrieveMainAdventures(sessionStorage.token)
                .then(adventures => {
                    setMainAdventures(adventures)
                })
                .catch(error => alert(error.message))

        } catch (error) { }
    }, [])

    const handleAdventureDeleted = () => {
        try {
            retrieveMainAdventures(sessionStorage.token)
                .then(adventures => {
                    setAdventureIdToDelete()
                    setMainAdventures(adventures)
                })
                .catch(error => alert(error.message))

        } catch (error) {
            alert(error.message)
        }
    }

    const openDeleteAdventure = adventureId => setAdventureIdToDelete(adventureId)
    const closeDeleteAdventure = () => setAdventureIdToDelete()

    return (
        <div className="min-h-screen flex flex-col bg-[#191919]">
            <div className="relative flex flex-grow font-alata h-full flex-col  justify-center items-center bg-[url('/src/img/bg-settings.jpg')] bg-no-repeat bg-center">
                <div className="flex flex-col justify-center w-96 h-[42rem] gap-[3.7rem] px-6 py-6">
                    <header className='text-white flex flex-col mt-[0.5rem] '>
                        <Link to="/">
                            <img
                                className='absolute z-10 -mt-[0.1rem] ml-[0.3rem] hover:ml-[0.1rem] duration-100 cursor-pointer'
                                src={buttonBack}
                                Settings
                                alt="back" />
                            <img
                                className='absolute -mt-[1rem] ml-[18.4rem] pt-1 cursor-pointer'
                                src={buttonHome}
                                alt="home" />
                        </Link>
                        <span className='text-[2rem] ml-[3rem] -mt-[1rem]'>Adventures</span>
                    </header>
                    <section className='flex flex-col items-center'>
                        {mainAdventures &&
                            <section className='flex flex-row justify-center'>
                                {mainAdventures.map(adventure =>
                                    [<div>
                                        {adventure.creator.id === userId &&
                                            <img
                                                className='absolute ml-[11.2rem] mt-[1.3rem] cursor-pointer'
                                                src={buttonDelete}
                                                Settings
                                                alt="delete"
                                                onClick={() => openDeleteAdventure(adventure.id)} />}
                                        <Link to={`/adventures/${adventure.id}`}>
                                            <img
                                                key={adventure.id}
                                                className='cursor-pointer'
                                                src={adventureMainOne}
                                                alt="home" />
                                        </Link>
                                    </div>
                                    ]
                                )}
                            </section>}
                    </section>
                    <section>
                        <div className='flex flex-col items-center'>
                            <button
                                onMouseEnter={() => setHoverButtonCreate(true)}
                                onMouseLeave={() => setHoverButtonCreate(false)}>
                                <img
                                    className='cursor-pointer'
                                    src={hoverButtonCreate ? buttonCreateActive : buttonCreat}
                                    alt="create" />
                            </button>
                        </div>
                        {adventureIdToDelete &&
                            <DeleteAdventure
                                adventureId={adventureIdToDelete}
                                onDeleted={handleAdventureDeleted}
                                onClose={closeDeleteAdventure} />}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Adventures