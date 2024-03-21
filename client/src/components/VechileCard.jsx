import { useNavigate } from "react-router-dom";
import Button from "./Button";
import UploadImage from "./UploadImage";

export default function VechileCardList({id, imgUrl, name, price, description}) {
  const navigate = useNavigate();
  return (
    <>
        <div className="col">
          <div className="card h-100">
            <img src={imgUrl} className="card-img-top" alt="..." />
            <div className="card-body my-3">
              <h5 className="card-title display-5"> {name} </h5> <br />
              <h5 className="card-title"> {price} </h5>
              <p className="card-text text-muted">{description}</p>
            </div>
            <div className="card-body d-flex justify-content-between">
              <div className="ms-4">
              <Button
                name={"Detail"}
                buttonClass={"btn btn-outline-primary btn-md"}
                buttonType={"submit"}
                onClick={() => navigate(`/vechile/${id}`)}
              />
              </div>
                <div className="me-3">
                  <UploadImage />
                </div>
            </div>
          </div>
        </div>
    </>
  );
}
