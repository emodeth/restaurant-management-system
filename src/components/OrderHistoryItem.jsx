function OrderHistoryItem({
  order,
  orderId,
  productName,
  quantity,
  timeCreated,
  username,
}) {
  const time = new Date(timeCreated);

  return (
    <tr className={`${order % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}>
      <td className="border border-gray-100 p-2">{orderId}</td>
      <td className="border border-gray-100 p-2">{productName}</td>
      <td className="border border-gray-100 p-2">{quantity}</td>
      <td className="border border-gray-100 p-2">{`${String(
        time.getDate()
      ).padStart(2, "0")}/${String(time.getMonth() + 1).padStart(
        2,
        "0"
      )}/${time.getFullYear()} - ${String(time.getHours()).padStart(
        2,
        "0"
      )}.${String(time.getMinutes()).padStart(2, "0")}`}</td>
      <td className="border border-gray-100 p-2">{username}</td>
    </tr>
  );
}

export default OrderHistoryItem;
