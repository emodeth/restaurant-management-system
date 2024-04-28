import { useEffect } from "react";
import Tables from "../components/Tables";
import { useMenu } from "../context/MenuContext";
import { useNavigate } from "react-router-dom";

function MainPage() {
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
    <div className="flex items-center justify-center w-screen h-screen">
      <Tables />
    </div>
  ) : null;
}

export default MainPage;
