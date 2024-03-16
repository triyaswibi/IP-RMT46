import { useEffect, useState } from "react";
import axios from "../utils/axios";
import SearchPage from "../components/Search";
import VechileCardList from "../components/VechileCard";

export default function VechilePageList() {
  const [nameFilter, setFilterName] = useState("");
  const [vechileData, setVechileData] = useState([]);

  const handleSetFilter = async (search) => {
    setFilterName(search);
  };

  const fetchVechileData = async (nameFilter) => {
    let url = `/vechile`;

    if (nameFilter) {
      url = `/vechile?search=${nameFilter}`;
    }

    try {
      let { data } = await axios({
        url,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setVechileData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVechileData(nameFilter);
  }, [nameFilter]);

  return (
    <>
        <SearchPage setFilter={handleSetFilter} />
        <section className="ms-sm-auto px-md-5 my-3">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {vechileData.map((vechile, index) => {
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
