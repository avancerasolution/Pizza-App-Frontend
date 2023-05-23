import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Contact from "./component/Contact";
import About from "./component/About";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Policy from "./component/Policy";
import Cart from "./common/Cart";
import { useEffect, useState } from "react";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { loadUser } from "./Redux/action/user";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";


function App() {
  const [orderCount, setorderCount] = useState(0)

  const dispatch = useDispatch();
  const { error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch({
      type: "clearError",
    });
    if (message) {
      toast.success(message);
    }
    dispatch({
      type: "clearMessage",
    });
  }, [dispatch, error, message]);


  return (
    <div className="App">
      <BrowserRouter>
        <Header orderCount={orderCount} isAuthenticated={isAuthenticated} user={user} />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/cart" element={<Cart setorderCount={setorderCount} orderCount={orderCount} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
