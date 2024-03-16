import { useState } from "react";

export default function SearchPage({setFilter}) {
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
      <div className="container navbar justify-content-end ">
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
