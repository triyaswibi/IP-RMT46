import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "../utils/axios";

export default function VechileCreateForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imgUrl: "",
    categoryId: "-1",
  });

  const [categories, setCategory] = useState([]);

  const handleChangeInput = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleCreateVechile = async (event) => {
    event.preventDefault();
    try {
      await axios({
        url: "/vechile",
        method: "POST",
        data: { ...form, categories: Number(form.categoryId) },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error, "dari error");
    }
  };

  const getCategory = async () => {
    try {
      let { data } = await axios({
        url: "/category",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="row justify-content-center my-5">
        <div className="col-12 col-md-6">
          <form id="vechile-form" onSubmit={handleCreateVechile}>
            <div className="mb-3">
              <label htmlFor="vechile-name">
                Name <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter vechile name"
                autoComplete="off"
                name="title"
                value={form.name}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="vechile-category">
                Price <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter vechile Price"
                autoComplete="off"
                name="price"
                value={form.price}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="vechile-desc">
                Description <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter vechile description"
                autoComplete="off"
                name="description"
                value={form.description}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category-name">
                Brand<span className="text-danger fw-bold">*</span>
              </label>
              <select
                id="category-name"
                className="form-select"
                name="categoryId"
                value={form.categoryId}
                onChange={handleChangeInput}
              >
                <option value="-1" disabled>
                  -- Select Brand --
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="vechile-image">Image</label>
              <input
                type="text"
                className="form-control"
                id="vechile-image"
                placeholder="Enter vechile image url"
                autoComplete="off"
                name="imgUrl"
                value={form.imgUrl}
                onChange={handleChangeInput}
              />
            </div>
            <div className="row mt-5 mb-3">
              <div className="col-6">
                <Button
                  name={"Cancel"}
                  buttonClass={"btn btn-lg btn-light rounded-pill w-100 p-2"}
                  buttonType={"submit"}
                  onClick={() => navigate("/vechiles")}
                />
              </div>
              <div className="col-6">
                <Button
                  name={"Submit"}
                  buttonClass={"btn btn-lg btn-warning rounded-pill w-100 p-2"}
                  buttonType={"submit"}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
