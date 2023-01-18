import deleteComment from '../logic/deleteComment'
import Button from './Button'

function DeleteComment({ commentId, onDeleted, onClose }) {
    const confirmDeleteComment = event => {
        event.preventDefault()

        try {
            // deletecomment(sessionStorage.token, commentId, error => {
            //     if (error) {
            //         alert(error.message)
            //         return
            //     }
            //     onDeleted()
            // })
            deleteComment(sessionStorage.token, commentId)
                .then(() => onDeleted())
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return <div className="bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden" onClick={onClose}>
        <div className="bg-[white] p-5 rounded-xl flex flex-col items-end gap-2" onClick={event => event.stopPropagation()}>
            <p>Are you sure you want to delete this comment?</p>
            <div className="flex gap-2" >
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={confirmDeleteComment}>Delete</Button>
            </div>
        </div>
    </div>
}

export default DeleteComment