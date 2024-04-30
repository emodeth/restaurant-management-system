import { useMenu } from "../context/MenuContext";
import { categories } from "../utils/menu";
import CategoryItem from "./CategoryItem";

import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";

function Menu({ tableId }) {
  const {
    category,
    handlePay,
    handleService,
    searchQuery,
    setSearchQuery,
    menu,
    sortingOrder,
    bubbleSort,
    postOrder,
    username,
    carts,
  } = useMenu();

  const navigate = useNavigate();

  return (
    <div className="flex gap-10 overflow-hidden">
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <CategoryItem key={category.categoryId} _category={category} />
        ))}
        <div className="bg-red-50 border p-3 h-full flex flex-col gap-5 ">
          <button
            onClick={() => {
              handlePay(tableId);
              postOrder(username, tableId, carts[tableId]);
            }}
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
          <button
            onClick={() => navigate(`/orders/${tableId}`)}
            className="text-center border px-4 py-2 uppercase font-semibold bg-red-200 hover:bg-red-300 transition"
          >
            Order History
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-[600px] max-h-[800px] overflow-y-auto">
        <input
          placeholder="SEARCH FOR A PRODUCT..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-3 border rounded-sm focus:outline-none text-xl uppercase font-semibold"
        />

        <button
          onClick={() => bubbleSort(menu, sortingOrder)}
          className="flex items-center justify-center gap-2 uppercase border border-black text-xl font-semibold py-2 px-4 rounded-sm hover:text-white hover:bg-black transition"
        >
          sort by price
          <span>{sortingOrder ? <FaChevronDown /> : <FaChevronUp />}</span>
        </button>

        {menu
          .filter((menuItem) =>
            menuItem.name.toUpperCase().includes(searchQuery.toUpperCase())
          )
          .map((menuItem, i) =>
            category === menuItem.category_id || category === "" ? (
              <MenuItem tableId={tableId} key={i} item={menuItem} />
            ) : null
          )}
      </div>
    </div>
  );
}

export default Menu;
