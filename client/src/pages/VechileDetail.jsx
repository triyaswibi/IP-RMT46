import { useParams } from "react-router-dom";
import SearchPage from "../components/Search";
import { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function VechileDetailPage() {
  const { id } = useParams();
  const [vechileData, setVechileData] = useState([]);

  const getVechileDetail = async (id) => {
    try {
      let { data } = await axios({
        url: `/vechile/${id}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });
      setVechileData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getVechileDetail(id);
    }
  }, [id]);

  return (
    <>
      <SearchPage />
      <section className="justify-content-center">
        <div className="col">
          <div className="card h-100">
            <img src={vechileData.imgUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h3 className="card-title"> {vechileData.name} </h3>
              <h5 className="card-title"> {vechileData.price} </h5>
              <p className="card-text">{vechileData.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
