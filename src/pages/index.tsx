import withReactContent from "sweetalert2-react-content";
import { useState, useEffect } from "react";
import axios from "axios";

import Layout from "@components/Layout";
import Card from "@components/Card";
import UserType from "@utils/types/user";
import Swal from "@utils/Swal";

function Home() {
  const [datas, setDatas] = useState<UserType[]>([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("users")
      .then((response) => {
        const { data } = response.data;
        setDatas(data);
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      });
  };

  return (
    <Layout>
      <div className="grid gap-3 grid-cols-6">
        {datas.map((data) => {
          const fullName = `${data.first_name} ${data.last_name}`;
          return (
            <Card
              key={data.id}
              image={data.image}
              name={fullName}
              username={data.username}
            />
          );
        })}
      </div>
    </Layout>
  );
}

export default Home;
