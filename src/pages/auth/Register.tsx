import withReactContent from "sweetalert2-react-content";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import CustomButton from "@components/CustomButton";
import CustomInput from "@components/CustomInput";
import Layout from "@components/Layout";
import Swal from "@utils/Swal";

function Register() {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    if (email && password && firstName && lastName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, firstName, lastName, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };
    axios
      .post("register", body)
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
          onSubmit={(e) => handleSubmit(e)}
        >
          <CustomInput
            id="input-username"
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput
            id="input-first-name"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <CustomInput
            id="input-last-name"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <CustomInput
            id="input-password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-dark dark:text-light">
            Already have an account? Login{" "}
            <Link id="to-login" to="/login" className="text-blue-500">
              here!
            </Link>
          </p>
          <CustomButton
            id="btn-register"
            label="Register"
            disabled={loading || disabled}
          />
        </form>
      </div>
    </Layout>
  );
}

export default Register;
