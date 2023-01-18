import log from '../utils/coolog'
import { useEffect, useState } from 'react'
import retrieveMyUser from '../logic/retrieveMyUser'
import retrievePostsUser from '../logic/retrievePostsUser'
import CreatePost from '../components/CreatePost'
import DeletePost from '../components/DeletePost'
import EditPost from '../components/EditPost'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { AiOutlineEdit, AiOutlineDelete, AiOutlineLock } from 'react-icons/ai'

function MyProfile() {
    log.info('MyProfile -> render')

    const [user, setUser] = useState()
    const [posts, setPosts] = useState()
    const [postIdToEdit, setPostIdToEdit] = useState()
    const [postIdToDelete, setPostIdToDelete] = useState()
    const [createPostVisible, setCreatePostVisible] = useState(false)

    useEffect(() => {
        try {
            retrieveMyUser(sessionStorage.token, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }
                try {
                    retrievePostsUser(sessionStorage.token, (error, posts) => {
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
            retrievePostsUser(sessionStorage.token, (error, posts) => {
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
            retrievePostsUser(sessionStorage.token, (error, posts) => {
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
            retrievePostsUser(sessionStorage.token, (error, posts) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setPostIdToDelete()
                setPosts(posts)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return <main className='overflow-hidden bg-slate-600 dark:bg-black text-black dark:text-white h-full'>
        <Header userName={user?.name} />

        {posts && <div className='flex flex-col items-center gap-2 py-[2rem]'>
            {posts.map(post => <article key={post.id} className='bg-slate-300 shadow-slate-800 border-b-4 rounded-xl w-[50%] flex flex-col p-5'>
                <time className='flex justify-end'>{post.date}</time>
                <p  className='border-2 bg-slate-200 border-slate-400 rounded-xl'>{post.text}</p>
                <div className='flex self-end pb-0'>
                    <button onClick={() => openEditPost(post.id)}><AiOutlineEdit size='1rem' /></button>
                    <button onClick={() => openDeletePost(post.id)}><AiOutlineDelete size='1rem' /></button>
                    {post.visibility === 'private' && <p className='self-end'><AiOutlineLock /></p>}
                </div>
            </article>)}
        </div>}

        <Footer onCreate={openCreatePost} />

        {createPostVisible && <CreatePost onCreated={handlePostCreated} onClose={closeCreatePost} />}
        {postIdToEdit && <EditPost postId={postIdToEdit} onUpdated={handlePostUpdated} onClose={closeEditPost} />}
        {postIdToDelete && <DeletePost postId={postIdToDelete} onDeleted={handlePostDeleted} onClose={closeDeletePost} />}

    </main>

}

export default MyProfile 