import { useEffect } from "react";
import { useMenu } from "../context/MenuContext";
import { useNavigate, useParams } from "react-router-dom";
import OrderHistoryItem from "../components/OrderHistoryItem";
import { IoIosArrowBack } from "react-icons/io";

function OrderHistoryPage() {
  const { id } = useParams();
  const { fetchOrderHistory, orderHistory, isLoggedIn } = useMenu();
  const navigate = useNavigate();

  useEffect(function () {
    fetchOrderHistory(id);
  }, []);

  useEffect(
    function () {
      if (!isLoggedIn) {
        navigate("/");
      }
    },
    [isLoggedIn, navigate]
  );

  return isLoggedIn ? (
    <div className="py-[80px] px-[160px] w-screen h-screen relative">
      <IoIosArrowBack
        onClick={() => navigate(`/table/${id}`)}
        className="fixed left-4 top-4 font-bold text-2xl cursor-pointer text-black"
      />

      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border p-2">Order Id</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Time Created</th>
            <th className="border p-2">Username</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory?.map((orderHistoryItem, i) => (
            <OrderHistoryItem
              key={i}
              order={i}
              orderId={orderHistoryItem.order_id}
              productName={orderHistoryItem.product_name}
              quantity={orderHistoryItem.quantity}
              timeCreated={orderHistoryItem.time_created}
              username={orderHistoryItem.user_name}
            />
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
}

export default OrderHistoryPage;
