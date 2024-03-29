import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";

import Contact from "./component/Contact";
import About from "./component/About";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Policy from "./component/Policy";
import Cart from "./common/Cart";
import { useState } from "react";
import Login from "./component/Login";
import Signup from "./component/Signup";


import { useSelector } from "react-redux";
import CartItem from "./component/CartItem";
import Profile from "./component/Profile";



function App() {
  const [orderCount, setorderCount] = useState(0)
  const [cartItems, setCartItems] = useState([

  ]);
  const [quan, setQuan] = useState([]);
  const [singleOrderQuantity, setSingleOrderQuantity] = useState(1);

  const { data, isAuthenticated } = useSelector(
    (state) => state.auth
  );





  return (
    <div className="App">
      <BrowserRouter>
        <Header
          setCartItems={setCartItems}
          orderCount={orderCount}
          isAuthenticated={isAuthenticated}
          user={data}
          setorderCount={setorderCount}
        />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/contact"
            element={<Contact isAuthenticated={isAuthenticated} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/cartItem"
            element={
              <CartItem
                setCartItems={setCartItems}
                cartItems={cartItems}
                setorderCount={setorderCount}
                orderCount={orderCount}
                user={data}
                setSingleOrderQuantity={setSingleOrderQuantity}
                singleOrderQuantity={singleOrderQuantity}
              />
            }
          />

          <Route path="/policy" element={<Policy />} />
          <Route
            path="/cart"
            element={
              <Cart
                setorderCount={setorderCount}
                orderCount={orderCount}
                isAuthenticated={isAuthenticated}
                setCartItems={setCartItems}
                cartItems={cartItems}
                setSingleOrderQuantity={setSingleOrderQuantity}
                singleOrderQuantity={singleOrderQuantity}
                quan={quan}
                setQuan={setQuan}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myprofile" element={<Profile user={data} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
