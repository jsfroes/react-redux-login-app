import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import BoardInfluencer from "./components/Resources/BoardInfluencer";
import BoardStaff from "./components/Resources/BoardStaff";
import BoardAdmin from "./components/Resources/BoardAdmin";
import Home from "./components/Resources/Home"

import { logout } from "./store/actions/auth";
import { clearMessage } from "./store/actions/message";

import { history } from "./components/helpers/history";


function App() {
  const [showStaffBoard, setShowStaffBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); //clear message when changing locations in every new dispatch
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowStaffBoard(currentUser.roles.includes("ROLE_STAFF"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showStaffBoard && (
              <li className="nav-item">
                <Link to={"/staff"} className="nav-link">
                  Staff Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/influencer"} className="nav-link">
                  Influencer
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link" onClick={logOut}>
                  LogOut
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/influencer" component={BoardInfluencer} />
            <Route exact path="/staff" component={BoardStaff} />
            <Route exact path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    </Router>
 
  );
}

export default App;
