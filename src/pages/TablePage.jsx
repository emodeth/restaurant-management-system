import Check from "../components/Check";
import Menu from "../components/Menu";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function TablePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="px-[100px] py-12 overflow-hidden flex justify-between w-screen h-screen gap-[100px] relative">
      <IoIosArrowBack
        onClick={() => navigate("/")}
        className="fixed left-4 top-4 font-bold text-2xl cursor-pointer text-black"
      />
      <Check tableId={id} />
      <Menu tableId={id} />
    </div>
  );
}

export default TablePage;
