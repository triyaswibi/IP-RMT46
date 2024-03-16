import { useDebugValue, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";

export default function RegisterPage() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    });
  
    const handleChangeInput = (event) => {
      const key = event.target.name;
      const value = event.target.value;
  
      setForm({
        ...form,
        [key]: value,
      });
    };
  
    const handleCreateUser = async (event) => {
      event.preventDefault();
      dispatch(handleCreateUser({form, navigate}))
    };

  return (
    <>
      <div className="d-flex">
        <section
          className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
          id="new-user-section"
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="pt-3 pb-2 mb-3 border-bottom">
                <form id="register-form" onSubmit={handleCreateUser}>
                  <h1 className="h3 mb-3 display-1">Register User</h1>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-username">Full Name</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="register-fullName"
                      placeholder="Enter fullName ..."
                      autoComplete="off"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-email">Email</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="register-email"
                      placeholder="Enter email address ..."
                      autoComplete="off"
                      name="email"
                      value={form.email}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-password">Password</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="register-password"
                      placeholder="Enter password ..."
                      autoComplete="off"
                      name="password"
                      value={form.password}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="register-phone">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="register-phone"
                      placeholder="Enter phone number (optional) ..."
                      autoComplete="off"
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="register-address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="register-address"
                      placeholder="Enter address (optional) ..."
                      autoComplete="off"
                      name="address"
                      value={form.address}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <Button
                    name={"Sign Up"}
                    buttonClass={"btn btn-warning rounded-pill w-100 p-2 mt-3"}
                    buttonType={"submit"}
                  />
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
