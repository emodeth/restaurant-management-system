import Check from "../components/Check";
import Menu from "../components/Menu";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useMenu } from "../context/MenuContext";
import { useEffect } from "react";

function TablePage() {
  const { id } = useParams();
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

  return isLoggedIn ? (
    <div className="px-[100px] py-12 overflow-hidden flex justify-between w-screen h-screen gap-[100px] relative">
      <IoIosArrowBack
        onClick={() => navigate("/tables")}
        className="fixed left-4 top-4 font-bold text-2xl cursor-pointer text-black"
      />
      <Check tableId={id} />
      <Menu tableId={id} />
    </div>
  ) : null;
}

export default TablePage;
