import log from '../utils/coolog'
import { useParams } from 'react-router-dom'
import getOnePublication from '../logic/getOnePublication'
import { useEffect, useState } from 'react'
import LandingNavbar from '../components/LandingNavbar'
import SearchBar from '../components/SearchBar'
import RecentNews from '../components/RecentNews'
import CarouselLastNews from '../components/CarouselLastNews'
import Advertiser from '../components/Advertiser'
import Footer from '../components/Footer'
import 'tw-elements'


function Article() {
    log.info('Article -> render')

    const { postId } = useParams()

    const [title, setTitle] = useState()
    const [resume, setResume] = useState()
    const [text, setText] = useState()
    const [topic, setTopic] = useState()
    const [img, setImg] = useState()


    useEffect(() => {
        try {
            getOnePublication(sessionStorage.userId, postId, (error, post) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setTitle(post.title)
                setResume(post.resume)
                setText(post.text)
                setTopic(post.topic)
                setImg(post.img)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    return (

        
        <main className="mx-auto bg-[#ECF0F5]">
            <nav>
                <LandingNavbar onNavigateToCreateNewsNavbar />
            </nav>
            <div className="flex flex-wrap container mx-auto">
                <section className="flex basis-9/12 p-5 justify-start items-end">
  {/* <!-- Navbar --> */}
  {/* <!-- Navbar --> */}

  <img src={img} className="max-w-full h-auto rounded-xl" alt="..." />
  <div className="p-4 text-center absolute">
    <h2 className="flex font-semibold text-4xl mb-4 text-white">{title}</h2>
    <h4 className="flex font-semibold text-xl mb-2 text-white">{resume}</h4>
  </div>
                </section>
                <section className="flex flex-wrap basis-3/12 p-5 justify-center">
                    <SearchBar />
                    <RecentNews />
                </section>
                <section className="flex flex-wrap basis-9/12 p-5">
                <div className="flex">
                    <div className="flex flex-col p-6 rounded-lg shadow-lg bg-white">
                    <h1 className="pr-20 pl-20 flex justify-center text-4xl font-bold mt-0 mb-6">{title}</h1>
                    <h3 className="pr-20 pl-20 text-xl font-bold mb-8 ">{resume}</h3>
                    <p className="pr-20 pl-20 text-justify text-gray-700 text-base mb-4">{text}</p>
                    <span class="flex mx-auto text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">{topic}</span>
                    </div>
                    </div>
                </section>
                <section className="flex flex-wrap basis-3/12 p-5 justify-center">
                    <Advertiser />
                </section>
                <section className="flex flex-wrap basis-9/12 p-5 justify-center">
                    <CarouselLastNews />
                </section>
                <section className="flex flex-wrap basis-3/12 p-5 justify-center">
                    <Advertiser />
                </section>
                <section className="flex flex-wrap basis-9/12 p-5">

                </section>
                <section className="flex flex-wrap basis-3/12 p-5 justify-center">

                </section>
                <section className="flex flex-wrap basis-9/12 p-5 justify-center">
                 
                </section>
                <section className="flex flex-wrap basis-3/12 p-5 justify-center">

                </section>
            </div>  
            <footer className="flex flex-wrap basis-12/12 justify-center">
                <Footer />
            </footer>
        </main>
    )
}

export default Article