import { useMenu } from "../context/MenuContext";
import { TiDelete } from "react-icons/ti";

function CheckItem({ checkItem, tableId }) {
  const { handleQuantity, handleDelete } = useMenu();

  return (
    <div className="py-5 px-8 flex justify-between items-center rounded-sm border-2 bg-red-100">
      <div>
        <p className="uppercase font-semibold">{checkItem.name}</p>
        <div className="flex items-center h-[30px]">
          <button
            onClick={() => handleQuantity(tableId, checkItem, "dec")}
            className="text-[20px] w-[29px] bg-black text-white cursor-pointer"
          >
            -
          </button>
          <div className="flex items-center justify-center text-[20px] w-[32px] outline outline-black outline-offset-[-3px]">
            {checkItem.quantity}
          </div>
          <button
            onClick={() => handleQuantity(tableId, checkItem, "add")}
            className="text-[20px] w-[29px] bg-black text-white cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <p className="font-semibold text-2xl">
          ${Number(checkItem.quantity * checkItem.price).toFixed(2)}
        </p>
        <div
          onClick={() => handleDelete(tableId, checkItem)}
          className="flex items-center justify-center border rounded-full cursor-pointer text-center hover:bg-red-200 transition"
        >
          <TiDelete className="text-black text-3xl" />
        </div>
      </div>
    </div>
  );
}

export default CheckItem;
