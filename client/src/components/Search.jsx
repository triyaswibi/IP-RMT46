import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function SearchPage({ setFilter }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleChangeInput = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilter(search);
  };

  return (
    <>
      <div className="container navbar justify-content-end">
        <Button
          name={"Add Vechile"}
          buttonClass={"btn btn-outline-warning btn-md"}
          buttonType={"submit"}
          onClick={() => navigate(`/vechile/create`)}
        />
        <form
          className="d-flex mt-3 p-2 w-40"
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control me-3"
            type="search"
            placeholder="Search Dream Car"
            value={search}
            onChange={handleChangeInput}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
      </div>
    </>
  );
}
