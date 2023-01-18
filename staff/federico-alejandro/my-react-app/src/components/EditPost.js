import updatePost from '../logic/updatePost'
import Button from './Button'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import retrievePost from '../logic/retrievePost'
import { MdOutlineVisibility } from 'react-icons/md'

function EditPost({ onUpdated, onClose, postId }) {
    const [post, setPost] = useState()
    const [visibility, setVisibility] = useState()

    useEffect(() => {
        try {
            retrievePost(sessionStorage.token, postId, (error, post) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setPost(post)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const submitUpdatePost = event => {
        event.preventDefault()

        const { text: { value: text }, visibility: { value: visibility } } = event.target

        try {
            updatePost(sessionStorage.token, postId, text, visibility, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onUpdated()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const changeVisibility = event => setVisibility(event.target.value)

    return <div className='bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden' onClick={onClose}>
        <div className='p-5 rounded-xl flex flex-col items-end bg-white dark:bg-black text-black dark:text-white' onClick={event => event.stopPropagation()}>
            <AiOutlineCloseCircle size='1.5rem' onClick={onClose} className='cursor-pointer' />

            <form className='flex flex-col gap-2' onSubmit={submitUpdatePost}>
                <label htmlFor='text'>Text</label>
                <textarea className='text-black border-black resize-y rounded-md' type='text' name='text' id='text' placeholder='input a text' defaultValue={post?.text}></textarea>
                <label htmlFor='visibility'><MdOutlineVisibility /></label>
                <select className='text-black' id='visibility' name='visibility' value={visibility} onChange={changeVisibility}>
                    <option value='public'>public</option>
                    <option value='private'>private</option>
                </select>
                <Button>Update</Button>
            </form>
        </div>
    </div>
}
export default EditPost
