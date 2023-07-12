import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { contact } from "../Redux/action/contact";
import { useNavigate } from "react-router-dom";
import Loaction from "../assets/map.png";

const Contact = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messages, error } = useSelector((state) => state.contact);

  const [message, setMessage] = useState("");
  const [to, setEmail] = useState("");
  const subject = "subject";
  const submit = async (event) => {
    event.preventDefault();
    if (isAuthenticated) {
      await dispatch(contact({ message, to, subject }));
      navigate("/");
    } else {
      toast.error("Please Login to Access This Resource");
    }
  };

  useEffect(() => {
    if (messages) {
      toast.success(messages);
      dispatch({ type: "clearMessage" });
      dispatch({ type: "emptyState" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, error, messages]);

  return (
    <>
      <section className="contact">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <h2>Contact Us</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <form>
                <h2>Contact Us</h2>
                <input type="text" placeholder="Name" required />
                <input
                  type="email"
                  placeholder="Email"
                  value={to}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Message..."
                  cols="30"
                  rows="10"
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button type="submit" onClick={submit}>
                  Submit
                </button>
              </form>
            </div>

            <div className="col-sm-6 maps">
              <img src={Loaction} alt="map" width={100} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
