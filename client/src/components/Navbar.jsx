import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  handleLogout,
  selectLoginState,
  setIsLogin,
} from "../features/userSlice";
import { useEffect } from "react";

export default function NavbarList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector(selectLoginState);

  useEffect(() => {
    dispatch(setIsLogin(Boolean(localStorage.token)));
  }, []);
  
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container my-2">
        <Link to={"/vechile"}>Showroom Auto Care</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">
            <div className="d-flex gap-3">
              {!isLogin ? (
                <button
                  type="submit"
                  className="btn btn-outline-light btn-md"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-outline-light btn-md"
                  onClick={() => dispatch(handleLogout(navigate))}
                >
                  Logout
                </button>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
