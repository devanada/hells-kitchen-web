import { useParams, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import * as z from "zod";

import CustomButton from "@components/CustomButton";
import CustomInput from "@components/CustomInput";
import Layout from "@components/Layout";
import Swal from "@utils/Swal";

const schema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  image: z.any(),
});

type Schema = z.infer<typeof schema>;

function Profile() {
  const [loading, setLoading] = useState<boolean>(true);
  const [uname, setUname] = useState<string>("");
  const [cookie] = useCookies(["uname", "token"]);
  const MySwal = withReactContent(Swal);
  const { username } = useParams();
  const navigate = useNavigate();
  const checkOwner = cookie.uname;
  const getToken = cookie.token;

  useEffect(() => {
    fetchData();
  }, []);

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const fetchData = async () => {
    axios
      .get(`users/${username}`)
      .then((res) => {
        const { username, first_name, last_name, image } = res.data.data;
        setValue("first_name", first_name);
        setValue("last_name", last_name);
        setValue("image", image);
        setUname(username);
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

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    const formData = new FormData();
    let key: keyof typeof data;
    for (key in data) {
      if (key === "image") formData.append(key, data[key][0]);
      formData.append(key, data[key]);
    }
    axios
      .put("users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
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

  const deleteAccount = () => {
    MySwal.fire({
      title: "Logout",
      text: "Are you sure you want to delete this account?",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete("users", {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          })
          .then((res) => {
            const { message } = res.data;
            MySwal.fire({
              title: "Success",
              text: message,
              showCancelButton: false,
            });
            navigate("/", { replace: true });
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
      }
    });
  };

  return (
    <Layout>
      <div className="flex h-full w-full gap-4 items-center justify-center">
        <img
          className="h-60 w-60"
          src={
            typeof watch("image") === "object"
              ? URL.createObjectURL(watch("image")[0])
              : watch("image")
          }
          alt="Profile"
        />
        <form
          className="flex flex-col min-w-[40%] gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {checkOwner === uname && (
            <CustomInput
              register={register}
              name="image"
              id="input-image"
              type="file"
            />
          )}
          {/* TODO: Need to create a condition when username already exist and not deleted */}
          {/* <CustomInput
            id="input-username"
            placeholder="Username"
            defaultValue={uname}
            onChange={(e) => handleChange(e.target.value, "username")}
            disabled={checkOwner !== uname}
          /> */}
          <CustomInput
            register={register}
            name="first_name"
            id="input-first-name"
            type="text"
            placeholder="First Name"
            error={errors.first_name?.message}
            disabled={checkOwner !== uname}
          />
          <CustomInput
            register={register}
            name="last_name"
            id="input-last-name"
            type="text"
            placeholder="Last Name"
            error={errors.last_name?.message}
            disabled={checkOwner !== uname}
          />
          {checkOwner === uname && (
            <>
              <CustomButton
                id="btn-submit"
                label="Submit"
                disabled={loading}
                type="submit"
              />
              <CustomButton
                id="btn-delete"
                label="Delete Account"
                disabled={loading}
                type="button"
                onClick={() => deleteAccount()}
              />
            </>
          )}
        </form>
      </div>
    </Layout>
  );
}

export default Profile;
