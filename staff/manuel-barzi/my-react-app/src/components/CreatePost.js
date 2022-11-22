import createPost from '../logic/createPost'
import Button from './Button'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function ({ onCreated, onClose }) {
    const handleCreatePost = event => {
        event.preventDefault()

        const { text: { value: text }, visibility: { value: visibility } } = event.target

        try {
            createPost(window.userId, text, visibility, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                alert('Post saved')

                event.target.reset()

                onCreated()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return <div className="bg-[#aaaa] absolute top-0 h-full w-full flex flex-col justify-center items-center">
        <div className="bg-[white] p-10 rounded-xl flex flex-col items-end">
            <AiOutlineCloseCircle size="1.5rem" onClick={onClose} className="cursor-pointer" />
            <form className="flex flex-col gap-2" onSubmit={handleCreatePost}>
                <label htmlFor="text">Text</label>
                <textarea type="text" name="text" id="text" placeholder="input a text"></textarea>
                <label htmlFor="visibility">Visibility</label>
                <select id="visibility" name="visibility">
                    <option value="public">public</option>
                    <option value="private">private</option>
                </select>
                <Button>Create</Button>
            </form>
        </div>
    </div>
}