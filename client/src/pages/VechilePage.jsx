// import { useDispatch, useSelector } from "react-redux";
import SearchPage from "../components/Search";
import VechileCardList from "../components/VechileCard";
// import { fetchVechiles, selectVechileState } from "../features/vechileSlice";
import { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function VechilePageList() {
  // const dispatch = useDispatch();
  // const { vechiles } = useSelector(selectVechileState);
  const [ vechiles, setVehiclesData ] = useState([]);
  
  useEffect(() => {
    // dispatch(fetchVechiles())
    const fetchVechile = async () => {
      try {
        let { data } = await axios({
          url: "/vechile",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setVehiclesData(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchVechile();
  },[])

  return (
    <>
        <SearchPage />
        <section className="ms-sm-auto px-md-5 my-3">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {vechiles.map((vechile, index) => {
            return (
              <VechileCardList
                key={index}
                id={vechile.id}
                name={vechile.name}
                price={new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(vechile.price)}
                description={vechile.description}
                imgUrl={vechile.imgUrl}
              />
            );
          })}
          </div>
        </section>
    </>
  );
}
