import { useMenu } from "../context/MenuContext";
import CheckItem from "./CheckItem";

function Check({ tableId }) {
  const { carts, totalPrice } = useMenu();

  return (
    <div className="border py-5 px-10 rounded-sm bg-red-50 flex-1 flex flex-col gap-6 overflow-y-auto relative">
      {carts[tableId]?.map((item) => (
        <CheckItem key={item.name} tableId={tableId} checkItem={item} />
      ))}
      {totalPrice === 0 ? null : (
        <p className="text-2xl font-semibold self-end justify-self-end fixed bottom-2">
          Total Price: ${totalPrice[tableId].toFixed(2)}
        </p>
      )}
    </div>
  );
}

export default Check;
