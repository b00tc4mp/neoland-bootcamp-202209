import { AiOutlinePlusCircle } from "react-icons/ai"

export default function ({ onCreate }) {
return <footer className="fixed w-full h-[2rem] bottom-0 flex justify-center bg-white dark:bg-black text-black dark:text-white">
    <button onClick={onCreate}><AiOutlinePlusCircle size="1.5rem" />
    </button>
</footer>
}