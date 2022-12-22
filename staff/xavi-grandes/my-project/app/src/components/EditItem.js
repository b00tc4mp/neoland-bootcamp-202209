import log from "../utils/coolog";
import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { MdEuro } from "react-icons/md";
import deleteItem from "../logic/deleteItem";
import updateItem from "../logic/updateItem";

// const [suma, setSuma] = useState();

export default function ({ onClose, item, onDeleted, onUpdated }) {
  log.info("CreateList -> render");
  const [quantity, setQuantity] = useState(item.quantity);
  const [amount, setAmount] = useState(item.amount);

  const submitUpdateItem = (event) => {
    event.preventDefault();

    const {
      title: { value: title },
      quantity: { value: quantity },
      amount: { value: amount },
    } = event.target;

    const itemId = item.id;

    try {
      updateItem(itemId, title, quantity, amount);

      onUpdated();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteItem = (event) => {
    event.preventDefault();

    try {
      deleteItem(item.id)
        .then(() => onDeleted())
        .catch((error) => alert(error.message));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSumQuantity = () => setQuantity(quantity + 1);

  const handleChangeQuantity = (event) => {
    const newQuantity = event.target.value;

    setQuantity(newQuantity);
  };

  const handleRestQuantity = () => setQuantity(quantity - 1)

  // const handlePrice = (event) => {
  //   event.preventDefault();

  //   alert("suma o resta precio");
  // };

  const handleSumAmount = () => setAmount(amount + 0.5);

  const handleChangeAmount = (event) => {
    const newAmount = event.target.value;

    setAmount(newAmount);
  };

  const handleRestAmount = () => setAmount(amount - 0.5)

  return (
    <>
      <section
        className="absolute top-0 z-30 h-[100vh] w-full bg-[#64aaa464]"
        onClick={onClose}
      >
        <section
          className="fixed bottom-0 h-[45%] w-full bg-blue-400 flex flex-col items-center gap-4"
          onClick={(event) => event.stopPropagation()}
        >
          <i className="self-end mr-2 mt-2">
            <IoCloseCircle size="1.5rem" onClick={onClose} />
          </i>
          <form className="flex flex-col gap-2" onSubmit={submitUpdateItem}>
            <input
              className="pl-2 h-10 text-xl"
              id="title"
              name="title"
              defaultValue={item.title}
            />
            <div className="flex justify-between gap-2">
              <input
                className="bg-gray-200 w-[50%] pl-2 text-xl content-center"
                id="quantity"
                name="quantity"
                placeholder="Cantidad"
                value={quantity}
                type="number"
                onChange={handleChangeQuantity}
              />
              <button
                type="button"
                className="bg-gray-200 w-10 h-10 rounded-full flex justify-center text-3xl"
                onClick={handleSumQuantity}
              >
                +
              </button>
              <button
                type="button"
                className="bg-gray-200 w-10 h-10 rounded-full flex justify-center text-3xl"
                onClick={handleRestQuantity}
              >
                -
              </button>
            </div>
            <div className="flex justify-between gap-2">
              <div className="w-[50%]">
                <input
                  className="bg-gray-200 w-full h-10 pl-2 text-xl content-center"
                  id="amount"
                  name="amount"
                  placeholder="Precio"
                  type="number"
                  step="0.01"
                  onChange={handleChangeAmount}
                  value={amount}
                />
                <span className="absolute ml-[-35px] mt-1 text-gray-400"><MdEuro size="2rem"/></span>
              </div>
              <button
                type="button"
                className="bg-gray-200 w-10 h-10 rounded-full flex justify-center text-3xl"
                onClick={handleSumAmount}
              >
                +
              </button>
              <button
                type="button"
                className="bg-gray-200 w-10 h-10 rounded-full flex justify-center text-3xl"
                onClick={handleRestAmount}
              >
                -
              </button>
            </div>
            <button
              type="submit"
              className="mt-2 self-center bg-[#1b385b] border border-gray-400 rounded-2xl w-[90%] h-9 text-white text-lg"
            >
              Aceptar Cambios
            </button>
          </form>
          <button
            className="bg-red-400 border border-gray-400 rounded-2xl w-4/5 h-8 text-white text-lg"
            onClick={handleDeleteItem}
          >
            Borrar
          </button>
        </section>
      </section>
    </>
  );
}
