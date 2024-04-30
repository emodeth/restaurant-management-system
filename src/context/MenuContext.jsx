import { createContext, useContext, useEffect, useState } from "react";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [menu, setMenu] = useState([]);
  const [sortingOrder, setSortingOrder] = useState(true); // true is descending order false is ascending order
  const [errorMsg, setErrorMesg] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(function () {
    fetchProducts();
  }, []);

  async function fetchOrderHistory(tableId) {
    const res = await fetch(`http://localhost:8000/orders/${tableId}`);
    const data = await res.json();
    console.log(data);
    setOrderHistory(data);
  }

  function postLogin(user) {
    fetch("http://localhost:8000/login/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => {
      if (res.status === 200) {
        setIsLoggedIn(true);
        setErrorMesg("");
      } else if (res.status === 401) {
        setErrorMesg("Wrong Password!");
      } else if (res.status === 404) {
        setErrorMesg("User Not Found!");
      }
    });
  }

  function postOrder(username, tableId, order) {
    fetch("http://localhost:8000/orders/", {
      method: "POST",
      body: JSON.stringify({
        username,
        tableId,
        order,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  async function fetchProducts() {
    const res = await fetch("http://localhost:8000/products/");
    const data = await res.json();
    setMenu(data);
  }

  function bubbleSort(array, order) {
    const length = array.length;

    if (order) {
      for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
          if (Number(array[j].price) > Number(array[j + 1].price)) {
            // Swap elements
            const temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
          }
        }
      }
    } else {
      for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
          if (Number(array[j].price) <= Number(array[j + 1].price)) {
            // Swap elements
            const temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
          }
        }
      }
    }

    setSortingOrder((sortingOrder) => !sortingOrder);

    return array;
  }

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
    if (carts[tableId].length == 0) return;

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
        isLoggedIn,
        setIsLoggedIn,
        username,
        setUsername,
        password,
        setPassword,
        searchQuery,
        setSearchQuery,
        menu,
        setMenu,
        sortingOrder,
        setSortingOrder,
        bubbleSort,
        postLogin,
        errorMsg,
        postOrder,
        fetchOrderHistory,
        orderHistory,
        setOrderHistory,
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
