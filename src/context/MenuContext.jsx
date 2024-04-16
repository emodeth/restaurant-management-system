import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

function MenuProvider({ children }) {
  const [category, setCategory] = useState("");
  const [carts, setCarts] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  });
  const [totalPrice, setTotalPrice] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  });
  const [status, setStatus] = useState({
    1: "free",
    2: "free",
    3: "free",
    4: "free",
    5: "free",
    6: "free",
    7: "free",
    8: "free",
    9: "free",
  });

  function handleAdd(tableId, item) {
    if (carts[tableId].some((cartItem) => cartItem.id === item.id)) return;

    const newItem = {
      ...item,
      quantity: 1,
    };

    setCarts((prevCarts) => ({
      ...prevCarts,
      [tableId]: [...prevCarts[tableId], newItem],
    }));

    setTotalPrice((prev) => ({
      ...prev,
      [tableId]: totalPrice[tableId] + item.price,
    }));

    setStatus((prevStatus) => ({ ...prevStatus, [tableId]: "full" }));
  }

  function handleDelete(tableId, item) {
    const newArr = carts[tableId].filter((cartItem) => cartItem.id !== item.id);

    setCarts((prevCarts) => ({
      ...prevCarts,
      [tableId]: newArr,
    }));

    setTotalPrice((prev) => ({
      ...prev,
      [tableId]: totalPrice[tableId] - item.price * item.quantity,
    }));
  }

  function handleQuantity(tableId, item, status) {
    const payload = status === "add" ? 1 : -1;

    if (status === "dec" && item.quantity < 2) return;

    const items = carts[tableId].filter((cartItem) => cartItem.id !== item.id);
    const newItem = { ...item, quantity: item.quantity + payload };

    setCarts((prevCarts) => ({
      ...prevCarts,
      [tableId]: [...items, newItem],
    }));

    setTotalPrice((prev) => ({
      ...prev,
      [tableId]: totalPrice[tableId] + item.price * payload,
    }));
  }

  function handlePay(tableId) {
    setCarts((prevCarts) => ({
      ...prevCarts,
      [tableId]: [],
    }));
    setTotalPrice((prev) => ({
      ...prev,
      [tableId]: 0,
    }));
    setStatus((prevStatus) => ({ ...prevStatus, [tableId]: "paid" }));
  }

  function handleService(tableId) {
    if (status[tableId] !== "paid") return;

    setStatus((prevStatus) => ({ ...prevStatus, [tableId]: "free" }));
  }

  return (
    <MenuContext.Provider
      value={{
        category,
        setCategory,
        carts,
        setCarts,
        handleAdd,
        handleQuantity,
        totalPrice,
        handleDelete,
        status,
        setStatus,
        handlePay,
        handleService,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function useMenu() {
  const context = useContext(MenuContext);
  return context;
}

export { useMenu, MenuProvider };
