import withReactContent from "sweetalert2-react-content";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import CustomButton from "@components/CustomButton";
import CustomInput from "@components/CustomInput";
import Layout from "@components/Layout";
import UserType from "@utils/types/user";
import Swal from "@utils/Swal";

function Profile() {
  const [objSubmit, setObjSubmit] = useState<Partial<UserType>>({});
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<string>("");
  const [uname, setUname] = useState<string>("");
  const [cookie] = useCookies(["uname"]);
  const MySwal = withReactContent(Swal);
  const { username } = useParams();
  const checkOwner = cookie.uname;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get(`users/${username}`)
      .then((res) => {
        const { username, first_name, last_name, image } = res.data.data;
        setUname(username);
        setFirstName(first_name);
        setLastName(last_name);
        setImage(image);
      })
      .catch((err) => {
        const { data } = err.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    axios
      .put("profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        setObjSubmit({});
      })
      .catch((err) => {
        const { data } = err.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  };

  const handleChange = (value: string | File, key: keyof typeof objSubmit) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  return (
    <Layout>
      <div className="flex h-full w-full gap-4 items-center justify-center">
        <img className="h-60 w-60" src={image} alt={image} />
        <form
          className="flex flex-col min-w-[40%] gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          {checkOwner === uname && (
            <CustomInput
              id="input-image"
              type="file"
              onChange={(e) => {
                if (!e.currentTarget.files) {
                  return;
                }
                setImage(URL.createObjectURL(e.currentTarget.files[0]));
                handleChange(e.currentTarget.files[0], "image");
              }}
            />
          )}
          <CustomInput
            id="input-username"
            placeholder="Username"
            value={uname}
            onChange={(e) => handleChange(e.target.value, "username")}
            disabled={checkOwner !== uname}
          />
          <CustomInput
            id="input-first-name"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => handleChange(e.target.value, "first_name")}
            disabled={checkOwner !== uname}
          />
          <CustomInput
            id="input-last-name"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => handleChange(e.target.value, "last_name")}
            disabled={checkOwner !== uname}
          />
          {checkOwner === uname && (
            <CustomButton id="btn-submit" label="Submit" disabled={loading} />
          )}
        </form>
      </div>
    </Layout>
  );
}

export default Profile;
