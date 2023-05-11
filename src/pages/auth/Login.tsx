import withReactContent from "sweetalert2-react-content";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useState } from "react";
import axios from "axios";
import * as z from "zod";

import CustomButton from "@components/CustomButton";
import CustomInput from "@components/CustomInput";
import Layout from "@components/Layout";
import { handleAuth } from "@utils/redux/reducers/reducer";
import Swal from "@utils/Swal";

const schema = z.object({
  username: z.string().min(5, { message: "Username is 5 minimum character" }),
  password: z.string().min(6, { message: "Password is 6 minimum character" }),
});

type Schema = z.infer<typeof schema>;

function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const MySwal = withReactContent(Swal);
  const [, setCookie] = useCookies(["token", "uname"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    axios
      .post("login", data)
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            register={register}
            name="username"
            id="input-username"
            placeholder="Username"
            error={errors.username?.message}
          />
          <CustomInput
            register={register}
            name="password"
            id="input-password"
            type="password"
            placeholder="Password"
            error={errors.password?.message}
          />
          <p className="text-dark dark:text-light">
            Don't have an account? Register{" "}
            <Link id="to-register" to="/register" className="text-blue-500">
              here!
            </Link>
          </p>
          <CustomButton
            id="btn-login"
            label="Login"
            disabled={loading}
            type="submit"
          />
        </form>
      </div>
    </Layout>
  );
}

export default Login;
