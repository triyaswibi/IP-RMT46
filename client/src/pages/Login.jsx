import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../features/userSlice";
import axios from "../utils/axios";

export default function LoginPage() {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(handleLogin({ userData, navigate }));
  };

  const handleCredentialResponse = async ({ credential }) => {
    const { data } = await axios.post("/google-login", {
      googleToken: credential,
    });
    localStorage.setItem("access_token", data.access_token);
    navigate("/vechile");
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "414733913348-jgbp1cosinenhu9bknunn84ftilpsvmp.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <>
      <section className="container" id="login-section" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-3 mt-5">Showroom Auto Care</h1>
          </div>
          <div className="col-12 col-lg-8 offset-lg-2 my-5">
            <div className="row">
              <div className="col-12 col-md-6 border-end p-5 text-left">
                <img
                  src="https://img.freepik.com/premium-vector/cars-dealership-center-showroom-interior_701961-379.jpg"
                  width="350px"
                  height="300px"
                  alt="admin"
                />
              </div>
              <div className="col-12 col-md-6 p-5 text-left">
                <div className="form-signin m-auto">
                  <form id="login-form">
                    <h1 className="h3 mb-3 display-1">
                      Log in to your account
                    </h1>
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-email">Email</label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="login-email"
                        placeholder="Enter email address ..."
                        autoComplete="off"
                        name="email"
                        value={userData.email}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-password">Password</label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="login-password"
                        placeholder="Enter your password ..."
                        autoComplete="off"
                        name="password"
                        value={userData.password}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="col-12 text-center">
                      <h6 className="mb-3 mt-5">
                        Don't have an account yet?
                        <Link to={"/register"} className="text-primary">
                          {" "}
                          Register
                        </Link>
                      </h6>
                    </div>
                    <button
                      className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                      type="submit"
                    >
                      Log In
                    </button>
                    <div className="d-flex justify-content-center mb-5">
                      - or -
                    </div>
                    <div className="d-flex justify-content-center">
                      <div id="buttonDiv"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
