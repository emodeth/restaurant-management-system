import { useMenu } from "../context/MenuContext";

function CategoryItem({ _category }) {
  const { category, setCategory } = useMenu();

  function handleCategory() {
    if (category === _category) {
      setCategory("");
    } else {
      setCategory(_category);
    }
  }

  return (
    <div
      onClick={handleCategory}
      className="py-6 px-8 border flex items-center justify-between bg-red-50 text-center cursor-pointer hover:bg-red-100 transition"
    >
      <p className="uppercase font-semibold text-center block w-full text-2xl select-none">
        {_category === "main-dish" ? "Main Dish" : _category}
      </p>
    </div>
  );
}

export default CategoryItem;
