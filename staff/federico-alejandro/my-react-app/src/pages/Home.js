import log from '../utils/coolog'
import { useEffect, useState } from 'react'
import retrieveUser from '../logic/retrieveUser'

import retrievePublicPosts from '../logic/retrievePublicPosts'
import CreatePost from '../components/CreatePost'
import DeletePost from '../components/DeletePost'
import EditPost from '../components/EditPost'

// import retrievePublicComments from '../logic/retrievePublicComments'
// import CreateComment from '../components/CreateComment'
// import DeleteComment from '../components/DeleteComment'
// import EditComment from '../components/EditComment'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import extractSubFromToken from '../utils/extractSubFromToken'

import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
// import { FaRegComment } from 'react-icons/fa'


function Home() {
    log.info('home -> render')

    const [user, setUser] = useState()
    const [posts, setPosts] = useState()
    
    const [createPostVisible, setCreatePostVisible] = useState(false)
    const [postIdToEdit, setPostIdToEdit] = useState()
    const [postIdToDelete, setPostIdToDelete] = useState()
    
    // const [comment, setComment] = useState()
    // const [createCommentVisible, setCreateCommentVisible] = useState(false)
    // const [commentIdToEdit, setCommentIdToEdit] = useState()
    // const [commentIdToDelete, setCommentIdToDelete] = useState()

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

                // try {
                //     retrievePublicComments(sessionStorage.token, (error, comment) => {
                //         if (error) {
                //             alert(error.message)

                //             return
                //         }
                //         setUser(user)
                //         setComment(comment)

                //     })
                // } catch (error) {
                //     alert(error.message)
                // }

            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    // const openCreateComment = () => setCreateCommentVisible(true)

    // const closeCreateComment = () => setCreateCommentVisible(false)

    // const handleCommentCreated = () => {
    //     try {
    //         retrievePublicComments(sessionStorage.token, (error, comment) => {
    //             if (error) {
    //                 alert(error.message)

    //                 return
    //             }
    //             setCreateCommentVisible(false)
    //             setComment(comment)
    //         })
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }

    // const openEditComment = commentId => setCommentIdToEdit(commentId)

    // const closeEditComment = () => setCommentIdToEdit()

    // const handleCommentUpdated = () => {
    //     try {
    //         retrievePublicComments(sessionStorage.token, (error, comment) => {
    //             if (error) {
    //                 alert(error.message)

    //                 return
    //             }
    //             setCommentIdToEdit()
    //             setComment(comment)
    //         })
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }

    // const openDeleteComment = commentId => setCommentIdToDelete(commentId)

    // const closeDeleteComment = () => setCommentIdToDelete()

    // const handleCommentDeleted = () => {
    //     try {
    //         retrievePublicComments(sessionStorage.token, (error, comment) => {
    //             if (error) {
    //                 alert(error.message)

    //                 return
    //             }

    //             setCommentIdToDelete()
    //             setComment(comment)
    //         })
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }

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

    return <main className='h-full overflow-hidden bg-slate-600 dark:bg-black text-black dark:text-white'>
        <Header userName={user?.name} />

        {posts && <div className='flex flex-col items-center gap-4 py-[3rem] '>
            {posts.map(post => <article key={post.id} className='bg-slate-300 rounded-xl w-[50%] flex flex-col p-5'>
                <div className='flex justify-between '><Link to={`/profile/${post.user.id}`}><strong>{post.user.name}</strong></Link>
                    <time>{post.date}</time>
                </div>
                <p className='border-2 bg-slate-200 border-slate-400 rounded-xl'>{post.text}</p>
                {post.user.id === userId && <div className='flex justify-between'>
                    <div>
                        <button onClick={() => openEditPost(post.id)}><AiOutlineEdit size='1rem' /></button>
                        <button onClick={() => openDeletePost(post.id)}><AiOutlineDelete size='1rem' /></button>
                    </div>
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