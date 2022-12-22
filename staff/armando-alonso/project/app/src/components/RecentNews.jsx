import log from '../utils/coolog'
import { useEffect, useState } from 'react'
import retrievePublicNews from '../logic/retrievePublicNews'
import { Link } from 'react-router-dom'

const News = () => {
  log.info('TablonClosed -> render')


    const [news, setNews] = useState()

    useEffect(() => {
      try {
          retrievePublicNews(sessionStorage.userId)
            .then(news => setNews(news))
            .catch(error => alert(error.message))
      } catch (error) {
          alert(error.message)
      }
}, [])

  return (
    <>
    <div className="flex flex-col w-full bg-[#FFF]">
      <div className="flex justify-center rounded bg-[#3E5062] shadow-lg">
        <div className="w-full p-2 flex flex-col">
          <h5 className="flex bg-[#3E5062] text-white text-m justify-center">Colaboracion Ciudadana</h5>
        </div>
      </div>
    

      {news && news.slice(news.length-5).reverse().map(notice => 
      <div key={notice.id} className="flex flex-col w-full">
        <div className="flex w-full justify-center">
          <img
            className="w-full p-2 md:h-16 object-cover md:w-20 rounded-t-lg md:rounded-none md:rounded-l-lg"
            src={notice.img}
            alt=""
          />
          <div className="w-full p-2 flex">
          <div className="flex flex-col basis-5/6">
            <Link to={`/article/${notice.id}`}><h5 className="flex text-gray-900 text-m">{notice.title}</h5></Link>
            <p className="flex text-gray-600 text-xs">{notice.resume}</p>
          </div>
          <div className="flex flex-col basis-1/6">
           <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded-full">{notice.topic}</span>
           <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded-full">{notice.user.name}</span>
          </div>
        </div>
        </div>
      </div>
      )}
    </div>
    </>
  );
};

export default News;
