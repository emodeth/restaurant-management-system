import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TablePage from "./pages/TablePage";
import { MenuProvider } from "./context/MenuContext";
import LoginPage from "./pages/LoginPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

function App() {
  return (
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/tables" element={<MainPage />} />
          <Route path="table/:id" element={<TablePage />} />
          <Route path="orders/:id" element={<OrderHistoryPage />} />
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  );
}

export default App;
