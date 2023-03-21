import withReactContent from "sweetalert2-react-content";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";

import CustomButton from "@components/CustomButton";
import CustomInput from "@components/CustomInput";
import Layout from "@components/Layout";
import { handleAuth } from "@utils/redux/reducers/reducer";
import Swal from "@utils/Swal";

function Login() {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const MySwal = withReactContent(Swal);
  const [, setCookie] = useCookies(["token", "uname"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      username,
      password,
    };
    axios
      .post("login", body)
      .then((res) => {
        const { data, message } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setCookie("token", data.token, { path: "/" });
            setCookie("uname", data.username, { path: "/" });
            dispatch(handleAuth(true));
            navigate("/");
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <div className="flex flex-col h-full w-full items-center justify-center">
        <form
          className="flex flex-col min-w-[40%] gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <CustomInput
            id="input-username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <CustomInput
            id="input-password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-black dark:text-white">
            Don't have an account? Register{" "}
            <Link id="to-register" to="/register" className="text-blue-500">
              here!
            </Link>
          </p>
          <CustomButton
            id="btn-login"
            label="Login"
            disabled={loading || disabled}
          />
        </form>
      </div>
    </Layout>
  );
}

export default Login;
