import withReactContent from "sweetalert2-react-content";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";

import Swal from "utils/Swal";
import { handleAuth } from "utils/redux/reducers/reducer";
import CustomButton from "components/CustomButton";
import CustomInput from "components/CustomInput";
import Layout from "components/Layout";

function Login() {
  const [, setCookie] = useCookies(["token"]);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

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
      .post("https://hells-kitchen.onrender.com/api/v1/login", body)
      .then((res) => {
        const { data, message } = res.data;
        setCookie("token", data.token, { path: "/" });
        dispatch(handleAuth(true));
        // TODO: Save username
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        navigate("/");
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
            <Link id="to-register" to="/register">
              here!
            </Link>
          </p>
          <CustomButton
            id="btn-login"
            label="Login"
            loading={loading || disabled}
          />
        </form>
      </div>
    </Layout>
  );
}

export default Login;
