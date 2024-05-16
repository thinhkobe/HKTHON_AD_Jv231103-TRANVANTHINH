import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./page/Products";
import Carts from "./components/Carts";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Header />
          <Products />
          <Carts />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
