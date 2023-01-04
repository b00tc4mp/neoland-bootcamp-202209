import createEvent from '../logic/createEvent'
import getMonthNumberByName from '../utils/getMonthNumberByName'

export default function ({ closeCreate, onCreated, monthName}) {
    const submitCreateEvent = event => {
        event.preventDefault()

        const {title: { value: title }, body: { value: body }, requirement: { value: requirement }, capacity: { value: capacity }, date: { value: date }, inscription: { value:inscription }, image: {value: image} } = event.target
        
        const _date = new Date(date)

        if (_date.getMonth() !== getMonthNumberByName(monthName) - 1) {
            alert(`please, choose a date that is inside month`)

            return
        }

        try {
            createEvent(sessionStorage.token, title, body, requirement, Number(capacity), _date , inscription, image)
                .then(() => onCreated())
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return <div className="bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden"
        >
        <div className="p-5 rounded-xl flex flex-col items-center bg-white dark:bg-black text-black dark:text-white" onClick={event => event.stopPropagation()}>
            <button size="1.5rem" onClick={closeCreate} className="cursor-pointer"> -X-</button>
            <form className="flex flex-col gap-2" onSubmit={submitCreateEvent}>
                <label htmlFor="title">Title</label>
                <input className="text-black pl-2" type="text" name="title" id="title" placeholder="input a title"></input>
                
                <label htmlFor="body">Body</label>
                <textarea className="text-black pl-2" type="text" name="body" id="body" placeholder="input the notice"></textarea>
                
                <label htmlFor="requirement">Requirements</label>
                <input className="text-black pl-2" type="text" name="requirement" id="requirement" placeholder="input the requirements"></input>
                
                <label htmlFor="capacity">Capacity</label>
                <input className="text-black pl-2" type="number" name="capacity" id="capacity" placeholder="input de capacity"></input>
                
                <label htmlFor="date">Date</label>
                <input className="text-black pl-2" type="date" name="date" id="date" placeholder="input the date"></input>
                
                <label htmlFor="inscription">Inscription</label>                
                <select className="text-black" id="iscription" name="inscription">
                    <option value="close">close</option>
                    <option value="open">open</option>
                </select>

                <label htmlFor="image">Imagen</label>
                <input className="text-black pl-2" type="text" name="image" id="image" placeholder="input the link"></input>
                

                <button className="border-2 border-black p-1 cursor-pointer m-1">Create</button>
            </form>
        </div>
    </div>
}
