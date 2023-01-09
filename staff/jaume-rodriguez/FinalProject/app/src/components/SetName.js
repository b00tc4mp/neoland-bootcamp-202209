import { useState, useEffect } from 'react'
import retrieveUser from '../logic/retrieveUser';
import updateUserName from '../logic/updateUserName';
import bgSetCredentials from '../img/bg-set-credentials.png';
import buttonOk from '../img/button-ok.png';
import buttonOkActive from '../img/button-ok-active.png';
import { useContext } from 'react'
import Context from '../components/Context'
import { errors } from 'com'
const { FormatError, AuthError, LengthError, NotFoundError } = errors

function SetName({ onClose }) {
    const { showAlert } = useContext(Context)
    const [user, setUser] = useState()
    const [hoverButtonOk, setHoverButtonOk] = useState(false)

    useEffect(() => {
        try {
            retrieveUser(sessionStorage.token)
                .then(user => setUser(user))
                .catch(error => alert(error.message))

        } catch (error) {
        }
    }, [])

    // FORM SUBMITS
    const handleUserNameSubmit = (event) => {
        event.preventDefault();

        const { name: { value: newName } } = event.target

        try {
            updateUserName(newName, sessionStorage.token)
                .then(() => {
                    //alert('The user name has been changed successfully')
                    user.name = newName
                    onClose()
                })
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
            <div className="flex flex-col justify-center" onClick={event => event.stopPropagation()}>
                <form className="flex w-full flex-col justify-center" onSubmit={handleUserNameSubmit}>
                    <div className='flex '>
                        <span className='z-10 absolute ml-[8.7rem] mt-[0.3rem] text-white text-[1.05rem]'>Username</span>
                        <img
                            className=''
                            src={bgSetCredentials}
                            alt="setCredentials" />
                        <input
                            name='name'
                            type="text"
                            placeholder="Username"
                            id="updateName"
                            title="Please enter at least 1 character"
                            className="absolute ml-[3.55rem] mt-[4.3rem] z-10 pl-4 pr-4 h-9 w-[15rem] bg-inherit text-white text-center text-sm rounded-xl autofill:bg-black mr-1"
                            key={user}
                            defaultValue={user?.name}
                        />
                        <span className='z-20 absolute ml-[5rem] mt-[7.2rem] text-white text-[0.7rem]'>You can change your name at any time.</span>
                        <button
                            className='absolute z-10 ml-[7rem] mt-[10rem]'
                            onMouseEnter={() => setHoverButtonOk(true)}
                            onMouseLeave={() => setHoverButtonOk(false)}>
                            <img
                                className=''
                                src={hoverButtonOk ? buttonOkActive : buttonOk}
                                alt="ok" />
                        </button>
                    </div>
                </form>
            </div>
        </section >
    );
}

export default SetName