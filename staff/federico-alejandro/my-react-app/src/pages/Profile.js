import log from '../utils/coolog'
import { useEffect, useState } from 'react'
import retrieveAUser from '../logic/retrieveAUser'
import retrievePostsFromUser from '../logic/retrievePostsFromUser'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Profile() {
    log.info('Profile -> render')

    const [user, setUser] = useState()
    const [posts, setPosts] = useState()
    const { targetUserId } = useParams()
    

    useEffect(() => {
        try {
            retrieveAUser(sessionStorage.token, targetUserId, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }

                try {
                    retrievePostsFromUser(sessionStorage.token, targetUserId, (error, posts) => {
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

    

    return <main className='overflow-hidden bg-slate-600 dark:bg-black text-black dark:text-white h-full'>
        <Header userName={user?.name} />

        {posts && <div className='flex flex-col items-center gap-2 py-[2rem]'>
            {posts.map(post => <article key={post.id} className='bg-slate-300 shadow-slate-800 border-b-4 rounded-xl w-[50%] flex flex-col p-5'>
            <time className='flex justify-end'>{post.date}</time>
                <p>{post.text}</p>
            </article>)}
        </div>}

        <Footer />
    </main>
}

export default Profile