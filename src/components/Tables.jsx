import { Link, useNavigate } from "react-router-dom";
import { tables } from "../utils/tables";
import Table from "./Table";
import { useMenu } from "../context/MenuContext";
import { useEffect } from "react";

function Tables() {
  const navigate = useNavigate();
  const { isLoggedIn } = useMenu();

  useEffect(
    function () {
      if (!isLoggedIn) {
        navigate("/");
      }
    },
    [isLoggedIn, navigate]
  );

  return (
    <div className="px-[100px] py-12 grid grid-cols-3 grid-rows-3 gap-5 h-full w-full">
      {tables.map((table) => (
        <Link className="block" key={table.id} to={`/table/${table.id}`}>
          <Table key={table.id} tableId={table.id}>
            Table {table.id}
          </Table>
        </Link>
      ))}
    </div>
  );
}

export default Tables;
