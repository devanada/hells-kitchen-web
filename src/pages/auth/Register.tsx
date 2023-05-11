import withReactContent from "sweetalert2-react-content";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import * as z from "zod";

import CustomButton from "@components/CustomButton";
import CustomInput from "@components/CustomInput";
import Layout from "@components/Layout";
import Swal from "@utils/Swal";

const schema = z.object({
  username: z.string().min(5, { message: "Username is 5 minimum character" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  password: z.string().min(6, { message: "Password is 6 minimum character" }),
});

type Schema = z.infer<typeof schema>;

function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

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
      .post("register", data)
      .then((res) => {
        const { message, data } = res.data;
        if (data) {
          MySwal.fire({
            title: "Success",
            text: message,
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        }
      })
      .catch((error) => {
        const { message } = error.response.data;
        MySwal.fire({
          title: "Failed",
          text: message,
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
            name="first_name"
            id="input-first-name"
            type="text"
            placeholder="First Name"
            error={errors.first_name?.message}
          />
          <CustomInput
            register={register}
            name="last_name"
            id="input-last-name"
            type="text"
            placeholder="Last Name"
            error={errors.last_name?.message}
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
            Already have an account? Login{" "}
            <Link id="to-login" to="/login" className="text-blue-500">
              here!
            </Link>
          </p>
          <CustomButton id="btn-register" label="Register" disabled={loading} />
        </form>
      </div>
    </Layout>
  );
}

export default Register;
