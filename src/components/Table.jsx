import { useMenu } from "../context/MenuContext";

function Table({ children, tableId }) {
  const { status } = useMenu();

  return (
    <div
      className={`${
        status[tableId] === "full" ? "bg-red-600 hover:bg-red-700" : null
      } ${
        status[tableId] === "paid" ? "bg-green-600 hover:bg-green-700" : null
      } ${
        status[tableId] === "free" ? "bg-gray-200 hover:bg-gray-300" : null
      } ${"p-4 border cursor-pointer  flex items-center justify-center text-3xl uppercase font-semibold w-full h-full"}`}
    >
      {children}
    </div>
  );
}

export default Table;
