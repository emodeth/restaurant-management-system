import { useMenu } from "../context/MenuContext";

function MenuItem({ item, tableId }) {
  const { handleAdd } = useMenu();

  return (
    <div
      onClick={() => handleAdd(tableId, item)}
      className="py-6 px-8 border flex items-center justify-between bg-red-50 cursor-pointer hover:bg-red-100 transition"
    >
      <div className="flex flex-col gap-2">
        <p className="uppercase font-semibold select-none	">{item.name}</p>
        <p className="text-[14px] font-medium text-gray-500 select-none	">
          {item.description}
        </p>
      </div>
      <p className="text-xl font-semibold select-none	">
        <span className="mr-[2px] select-none	">$</span>
        {item.price}
      </p>
    </div>
  );
}

export default MenuItem;
