import deletePost from '../logic/deletePost'
import Button from './Button'

export default function ({ onDeleted, onClose, postId }) {
    const confirmDeletePost = event => {
        event.preventDefault()

        try {
            deletePost(sessionStorage.token, postId, error => {
            if (error) {
                alert(error.messsage)

                return
            }

            onDeleted()
        })
        } catch (error) {
            alert(error.message)
        }
    }

    return <div className="bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden" onClick={onClose}>
            <div className="bg-[white] p-5 rounded-xl flex flex-col items-end" onClick={(event) => event.stopPropagation()}>                
                <p>You are deleting post with id {postId} <br /> Are you sure? </p>
                <div className="flex gap-2">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={confirmDeletePost}>Delete</Button>
                </div>
            </div>
        </div>    
}