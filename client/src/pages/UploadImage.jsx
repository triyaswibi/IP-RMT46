import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UploadImage() {
  const navigate = useNavigate();
  const { vechileId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleOnUpload = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", selectedFile.name);

      try {
        let { data } = await axios({
          url: `/vechile/imgUrl/${vechileId}`,
          method: "PATCH",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(data);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="update-product-section"
      >
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="pt-3 pb-2 mb-3">
              <form id="register-form" onSubmit={handleOnUpload}>
                <h1 className="h3 mb-3 display-1">Update Image</h1>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control pb-2"
                    id="inputGroupFile02"
                    autoComplete="off"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="btn btn-lg btn-warning rounded-pill w-100 p-2 mt-3"
                  type="submit"
                >
                  Update Image
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
