import { useState, useEffect } from 'react'
import retrieveUser from '../logic/retrieveUser'
import createAdventure from '../logic/createAdventure';
import bgCreateAdventure from '../img/bg-create-adventure.png';
import buttonCreateAdventure from '../img/button-create-adventure.png';
import buttonCreateAdventureActive from '../img/button-create-adventure-active.png';
import buttonCancel from '../img/button-cancel.png';
import { useContext } from 'react'
import Context from '../components/Context'
import { errors } from 'com'
const { FormatError, AuthError, LengthError, NotFoundError } = errors

function SetName({ onClose, onCreated }) {
    const { showAlert } = useContext(Context)
    const [user, setUser] = useState(null)
    const [hoverButtonCreateAdventure, setHoverButtonCreateAdventure] = useState(false)

    useEffect(() => {
        try {
            retrieveUser(sessionStorage.token)
                .then(user => setUser(user))
                .catch(error => alert(error.message))

        } catch (error) { }
    }, [])

    // FORM SUBMITS
    const handleCreateAdventureSubmit = (event) => {
        event.preventDefault();

        let { title: { value: title }, isMainAdventure: { value: isMainAdventure } } = event.target

        try {
            createAdventure(sessionStorage.token, title, isMainAdventure, user.gold)
                .then(() => {
                    //alert('The adventure has been changed successfully')
                    onClose()
                })
                .then(() => onCreated())
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof AuthError || error instanceof NotFoundError)
                        showAlert(error.message, 'error')
                    else
                        showAlert(error.message, 'fatal')
                })

        } catch (error) {
            if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                showAlert(error.message, 'warn')
            else
                showAlert(error.message, 'fatal')
        }
    };


    return (
        <section className="bg-[#191919]/75 fixed left-0 top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden">
            <div className="flex flex-col items-center justify-center -mt-[1.5rem]" onClick={event => event.stopPropagation()}>
                <img
                    className=''
                    src={bgCreateAdventure}
                    alt="createAdventure" />
                <form className="flex flex-col items-center" onSubmit={handleCreateAdventureSubmit}>
                    <input
                        name='title'
                        type="text"
                        placeholder="Adventure title"
                        id="title"
                        title="Please enter at least 1 character"
                        className="pl-4 pr-4 h-9 w-[15rem] bg-inherit text-white text-center text-sm rounded-xl autofill:bg-black absolute -mt-[17.8rem]"
                    />
                    <select
                        id="isMainAdventure"
                        name="isMainAdventure"
                        className="text-white bg-[#2e293c] absolute -mt-[14.5rem] text-sm -ml-[10.3rem]">
                        <option value="main" className='bg-inherit '>Main</option>
                        <option value="world" className='bg-inherit '>World</option>
                    </select>
                    <span className='text-slate-300 w-60 text-sm text-center -mt-[11.5rem]'>Once the adventure is created, you will be able to add the steps inside the adventure itself.</span>
                    <section className='flex flex-row absolute justify-center gap-x-3 -mt-[5.5rem]'>
                        <img
                            className="cursor-pointer"
                            src={buttonCancel}
                            alt="buttonCancel"
                            onClick={onClose}
                        />
                        <button>
                            <img
                                onMouseEnter={() => setHoverButtonCreateAdventure(true)}
                                onMouseLeave={() => setHoverButtonCreateAdventure(false)}
                                className="cursor-pointer"
                                src={hoverButtonCreateAdventure ? buttonCreateAdventureActive : buttonCreateAdventure}
                                alt="buttonCreateAdventure" />
                        </button>
                    </section>
                </form>
            </div>
        </section >
    );
}

export default SetName