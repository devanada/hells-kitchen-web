import withReactContent from "sweetalert2-react-content";
import { useState, useEffect } from "react";
import axios from "axios";

import Swal from "utils/Swal";
import CustomButton from "components/CustomButton";
import CustomInput from "components/CustomInput";
import Layout from "components/Layout";
import UserType from "utils/types/user";

function Profile() {
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState<boolean>(true);
  const [objSubmit, setObjSubmit] = useState<Partial<UserType>>({});
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get("profile")
      .then((res) => {
        const { email, first_name, last_name, image } = res.data.data;
        setEmail(email);
        setFirstName(first_name);
        setLastName(last_name);
        setImage(image);
      })
      .catch((err) => {
        console.log(err);
        // const { data } = err.response;
        // MySwal.fire({
        //   title: "Failed",
        //   text: data.message,
        //   showCancelButton: false,
        // });
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
          <CustomInput
            id="input-username"
            placeholder="Username"
            value={email}
            onChange={(e) => handleChange(e.target.value, "username")}
          />
          <CustomInput
            id="input-first-name"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => handleChange(e.target.value, "first_name")}
          />
          <CustomInput
            id="input-last-name"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => handleChange(e.target.value, "last_name")}
          />
          <CustomButton id="btn-submit" label="Submit" loading={loading} />
        </form>
      </div>
    </Layout>
  );
}

export default Profile;
