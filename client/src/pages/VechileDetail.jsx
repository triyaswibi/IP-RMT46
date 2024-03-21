import { useNavigate, useParams } from "react-router-dom";
import SearchPage from "../components/Search";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Button from "../components/Button";
import getPayment from "../utils/toastify";

export default function VechileDetailPage() {
  const navigate = useNavigate();
  const { vechileId } = useParams();
  const [vechileData, setVechileData] = useState([]);

  const getVechileDetail = async () => {
    try {
      let { data } = await axios({
        url: `/vechile/${vechileId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
      setVechileData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (vechileId) {
      getVechileDetail(vechileId);
    }
  }, [vechileId]);

  const handlePayment = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        url: `vechile/payment/midtrans/initiate/${vechileId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {}
      });
      const { token } = response.data;
      window.snap.pay(token, {
        onSuccess: async () => {
          getPayment("Succes Payment!");
          navigate('/vechile')
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <SearchPage />
      <section className="container my-3">
        <div className="col-md-4 card border-primary mb-3">
          <div className="card h-100">
            <img src={vechileData.imgUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h2 className="card-title"> {vechileData.name} </h2> <br />
              <h5 className="card-title"> {vechileData.price} </h5>
              <p className="card-text">{vechileData.description}</p>
              <div className="row mt-5 mb-3">
                <div className="col-6">
                  <Button
                    name={"Cancel"}
                    buttonClass={"btn btn-lg btn-light rounded-pill w-100 p-2"}
                    buttonType={"submit"}
                    onClick={() => navigate("/vechile")}
                  />
                </div>
                <div className="col-6">
                  <Button
                    onClick={handlePayment}
                    name={"Payment"}
                    buttonClass={
                      "btn btn-lg btn-warning rounded-pill w-100 p-2"
                    }
                    id={"pay-button"}
                    buttonType={"submit"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
