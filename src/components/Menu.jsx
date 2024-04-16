import { useMenu } from "../context/MenuContext";
import { menu, categories } from "../utils/menu";
import CategoryItem from "./CategoryItem";

import MenuItem from "./MenuItem";

function Menu({ tableId }) {
  const { category, handlePay, handleService } = useMenu();

  return (
    <div className="flex gap-10 overflow-hidden">
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <CategoryItem key={category} _category={category} />
        ))}
        <div className="bg-red-50 border p-3 h-full flex flex-col gap-5 ">
          <button
            onClick={() => handlePay(tableId)}
            className="text-center border px-4 py-2 uppercase font-semibold bg-red-200 hover:bg-red-300 transition"
          >
            Pay The Bill
          </button>
          <button
            onClick={() => handleService(tableId)}
            className="text-center border px-4 py-2 uppercase font-semibold bg-red-200 hover:bg-red-300 transition"
          >
            Open Service
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-[600px] max-h-[800px] overflow-y-auto">
        {menu.map((menuItem, i) =>
          category === menuItem.category || category === "" ? (
            <MenuItem tableId={tableId} key={i} item={menuItem} />
          ) : null
        )}
      </div>
    </div>
  );
}

export default Menu;
