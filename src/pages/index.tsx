import { useState, useEffect } from "react";
import axios from "axios";

import Layout from "components/Layout";
import UserType from "utils/types/user";

function Home() {
  const [datas, setDatas] = useState<UserType[]>([]);

  useEffect(() => {
    axios
      .get("https://hells-kitchen.onrender.com/api/v1/users")
      .then((response) => {
        const { data } = response.data;
        setDatas(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-6">
        {datas.map((data) => (
          <div key={data.id} className="flex flex-col text-white items-center">
            <img
              src={data.image}
              alt={`${data.username} picture`}
              className="w-28 aspect-square"
            />
            <h1>{data.first_name}</h1>
            <p>{data.username}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
