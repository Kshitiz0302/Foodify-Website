/* eslint-disable react/jsx-no-undef */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../screens/Cart";

export default function Navbar(props) {
  const [cartView, setCartView] = useState(false);
  localStorage.setItem("temp", "first");
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  const items = useCart();
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
        style={{
          boxShadow: "0px 10px 20px black",
          position: "fixed",
          zIndex: "10",
          width: "100%",
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center w-100">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            <img
              src="https://i.ibb.co/vmwSSFt/Foodify-Original.jpg"
              alt="Foodify"
              style={{ height: "50px" }}
            />
          </Link>

          {!isLoggedIn && (
            <div className="d-none d-md-flex justify-content-center align-items-center">
              <div className="text-white text-center fs-4">
                Discover the best food & drinks in India
              </div>
            </div>
          )}

          <div className="d-flex align-items-center">
            {!isLoggedIn ? (
              <form className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">
                  Signup
                </Link>
              </form>
            ) : (
              <div className="d-flex align-items-center">
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={loadCart}
                >
                  <Badge color="secondary" badgeContent={items.length}>
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </div>

                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}

                <button
                  onClick={handleLogout}
                  className="btn bg-white text-success mx-1"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
