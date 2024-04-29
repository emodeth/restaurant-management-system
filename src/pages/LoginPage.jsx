import { useEffect } from "react";
import { useMenu } from "../context/MenuContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    isLoggedIn,
    username,
    setUsername,
    password,
    setPassword,
    postLogin,
    errorMsg,
  } = useMenu();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isLoggedIn) {
        navigate("/tables");
      }
    },
    [isLoggedIn, navigate]
  );

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          postLogin({ name: username, password });
        }
      }}
      className="w-screen h-screen flex justify-center items-center"
    >
      <div className="flex flex-col border px-[120px] py-[90px] items-center justify-between gap-5 rounded-sm bg-gray-100">
        <div className="uppercase font-semibold text-3xl mb-5">login page</div>
        <div className="flex gap-1 items-center justify-center">
          <p className="uppercase font-medium">username: </p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded-sm"
            placeholder="username"
          />
        </div>
        <div className="flex gap-1 items-center justify-center">
          <p className="uppercase font-medium">password: </p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-sm"
            placeholder="password"
            type="password"
          />
        </div>

        <button
          onClick={() => postLogin({ name: username, password })}
          className="border py-2 px-10 uppercase font-bold mt-2 w-full text-white bg-black hover:text-black hover:bg-white transition"
        >
          Log in
        </button>
        <p>{errorMsg}</p>
      </div>
    </div>
  );
}

export default LoginPage;
