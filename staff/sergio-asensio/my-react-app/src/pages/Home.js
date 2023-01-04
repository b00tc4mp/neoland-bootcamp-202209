import log from '../utils/coolog'
import { useEffect, useState } from 'react'
import retrieveUser from '../logic/retrieveUser'
import retrievePublicPosts from '../logic/retrievePublicPosts'
import CreatePost from '../components/CreatePost'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import EditPost from '../components/EditPost'
import DeletePost from '../components/DeletePost'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import extractSubFromToken from '../utils/extractSubFromToken'

function Home() {
    log.info('Home -> render')

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
                    retrievePublicPosts(sessionStorage.token, (error, posts) => {
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
            retrievePublicPosts(sessionStorage.token, (error, posts) => {
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
            retrievePublicPosts(sessionStorage.token, (error, posts) => {
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
            retrievePublicPosts(sessionStorage.token, (error, posts) => {
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

    const userId = extractSubFromToken(sessionStorage.token)

    return <main className="overflow-hidden bg-white dark:bg-black text-black dark:text-white">
        <Header userName={user?.name} />
    

        {posts && <div className="flex flex-col items-center gap-2 py-[2rem]">
            {posts.map(post => <article key={post.id} className="border rounded-xl w-[50%] flex flex-col p-5">
                <Link to={`/profile/${post.user.id}`}><strong>{post.user.name}</strong></Link>
                <p>{post.text}</p>
                <time>{post.date}</time>
                {post.user.id === userId && <div className="flex self-end">
                    <button onClick={() => openEditPost(post.id)}><AiOutlineEdit size="1rem" /></button>
                    <button onClick={() => openDeletePost(post.id)}><AiOutlineDelete size="1rem" /></button>
                </div>}
            </article>)}
        </div>}

        <Footer onCreate={openCreatePost} />

        {createPostVisible && <CreatePost onCreated={handlePostCreated} onClose={closeCreatePost} />}

        {postIdToEdit && <EditPost postId={postIdToEdit} onUpdated={handlePostUpdated} onClose={closeEditPost} />}
        {postIdToDelete && <DeletePost postId={postIdToDelete} onDeleted={handlePostDeleted} onClose={closeDeletePost} />}
    </main>
}

export default Home