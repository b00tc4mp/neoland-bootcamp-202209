import log from "../utils/coolog"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import retrieveUser from "../logic/retrieveUser"
import retrievePosts from "../logic/retrievePosts"
import Footer from "../components/Footer"
import CreatePost from "../components/CreatePost"
import EditPost from "../components/EditPost"
import DeletePost from "../components/DeletePost"
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLock } from "react-icons/ai"

export default function MyProfile () {
    log.info('MyProfile -> render')

    const [user, setUser] = useState()
    const [posts, setPosts] = useState()
    const [createPostVisible, setCreatePostVisible] = useState(false)
    const [postIdToEdit, setPostIdToEdit] = useState()
    const [postIdToDelete, setPostIdToDelete] = useState()

    useEffect(() => {
        try {
            retrieveUser(sessionStorage.token, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }

                try {
                    retrievePosts(sessionStorage.token, (error, posts) => {
                        if (error) {
                            alert(error.message)

                            return
                        }

                        setUser(user)
                        setPosts(posts)
                    })

                } catch (error) {
                    alert(error.message)
                }
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const openCreatePost = () => setCreatePostVisible(true)

    const closeCreatePost = () => setCreatePostVisible(false)

    const handlePostCreated = () => {
        try {
            retrievePosts(sessionStorage.token, (error, posts) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setCreatePostVisible(false)
                setPosts(posts)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const openEditPost = postId => setPostIdToEdit(postId)

    const closeEditPost = () => setPostIdToEdit()

    const handlePostUpdated = () => {
        try {
            retrievePosts(sessionStorage.token, (error, posts) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setPostIdToEdit()
                setPosts(posts)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const openDeletePost = postId => setPostIdToDelete(postId)

    const closeDeletePost = () => setPostIdToDelete()

    const handlePostDeleted = () => {
        try {
            retrievePosts(sessionStorage.token, (error, posts) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setPostIdToDelete()
                setPosts(posts)
            })
        } catch (error) {
            alert(error.mesage)
        }
    }

    return <main className='overflow-hidden bg-white dark:bg-black text-black dark:text-white'>
        <Header userName={user?.name} />

        {posts && <div className='flex flex-col items-center gap-2 py-[2rem]'>
            {posts.map(post => <article key={post.id} className='border rounded-xl w-[50%] flex flex-col p-5'>
                {post.visibility === 'private' && <p className='self-end'><AiOutlineLock /></p>}
                <p>{post.text}</p>
                <time>{post.date}</time>
                <div className='flex self-end'>
                    <button onClick={() => openEditPost(post.id)}><AiOutlineEdit size='1rem' /></button>
                    <button onClick={() => openDeletePost(post.id)}><AiOutlineDelete size='1rem' /></button>
                </div>
            </article>)}
        </div>}

        <Footer onCreate={openCreatePost} />

        {createPostVisible && <CreatePost onCreated={handlePostCreated} onClose={closeCreatePost} />}

        {postIdToEdit && <EditPost postId={postIdToEdit} onUpdated={handlePostUpdated} onClose={closeEditPost} />}

        {postIdToDelete && <DeletePost postId={postIdToDelete} onDeleted={handlePostDeleted} onClose={closeDeletePost} /> }
    </main>
}