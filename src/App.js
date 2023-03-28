import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Payment from "./components/Payment";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
