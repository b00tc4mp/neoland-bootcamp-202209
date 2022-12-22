import log from "../utils/coolog";
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { errors } from "com";
import retrieveUser from "../logic/retrieveUser";
import retrieveLists from "../logic/retrieveLists";
import Context from "../components/Context";
import Header from "../components/Header";
import DeleteList from "../components/DeleteList";
import CreateList from "../components/CreateList";
import { MdDelete } from "react-icons/md";
import BackgroundEmpty from "../components/BackgroundEmpty"
const { FormatError, AuthError, LengthError, NotFoundError } = errors;

export default function Home() {
  log.info("Home -> render");

  const [user, setUser] = useState();
  const [lists, setLists] = useState();
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [listIdToDelete, setListIdToDelete] = useState();

  const { showAlert } = useContext(Context);

  useEffect(() => {
    try {
      retrieveUser(sessionStorage.token)
        .then((user) => {
          setUser(user)
        
          return retrieveLists(sessionStorage.token)
        })
        .then((lists) => setLists(lists))
        .catch((error) => {
          if (
            error instanceof TypeError ||
            error instanceof FormatError ||
            error instanceof LengthError
          )
            showAlert(error.message, "warn");
          else if (error instanceof AuthError || error instanceof NotFoundError)
            showAlert(error.message, "error");
          else showAlert(error.message, "fatal");
        });
    } catch (error) {
      if (
        error instanceof TypeError ||
        error instanceof FormatError ||
        error instanceof LengthError
      )
        showAlert(error.message, "warn");
      else showAlert(error.message, "fatal");
    }
  }, []);

  const toggleCreateListView = () => {
    setCreateOpen(!isCreateOpen);
  };

  const handleCreatedList = () => {
    retrieveLists(sessionStorage.token)
      .then((lists) => {
        setLists(lists);

        toggleCreateListView();
    });
  };

  const openDeleteList = (listId) => {
    setListIdToDelete(listId)
  }

  const closeDeletePost = () => setListIdToDelete()

  const handleListDeleted = () => {
    try {
      retrieveLists(sessionStorage.token)
      .then((lists) => {setLists(lists);

            setListIdToDelete()
        })
    } catch (error) {
        alert(error.message)
    }
}


  return (
    <>
      {isCreateOpen && (<CreateList onListCreated={handleCreatedList} onClose={toggleCreateListView} />)}
      {listIdToDelete && (<DeleteList listId={listIdToDelete} onClose={closeDeletePost} onDeleted={handleListDeleted} />)}

      {user && <Header userName={user.name} />}
      <main className="mt-[3rem] flex flex-col gap-2 items-center">
      {lists == '' && <BackgroundEmpty />}
        {lists &&
          lists.map((list) => (
            <article className="mt-1 bg-blue-300 h-12 w-3/5 rounded-lg flex items-center justify-between px-3 text-lg">
              <Link to={`/list/${list.id}`}><strong>{list.title}</strong></Link>
              <button className="h-10 w-10 flex justify-center items-center bg-slate-400" onClick={() => openDeleteList(list.id)}>
                <MdDelete size="1.3rem" />
              </button>
            </article>
          ))}
      </main>
      <footer className="z-10 fixed bottom-0 h-[4rem] flex justify-center items-center w-full bg-gray-200">
        <button
          className=" bg-blue-400 h-[3rem] w-2/5 text-white text-xl p-2 flex justify-center items-center rounded-lg"
          onClick={toggleCreateListView}
        >
          + Crear lista
        </button>
      </footer>
    </>
  );
}
