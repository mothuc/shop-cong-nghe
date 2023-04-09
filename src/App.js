import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Payment from "./components/Payment";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import OrderInfor from "./components/OrderInfor";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/successfully" element={<OrderInfor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
