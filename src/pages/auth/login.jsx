/* eslint-disable no-unused-vars */

import CommonForm from "@/components/common/form";
import { loginLabels } from "@/components/Commonlabels/label";
import { createData } from "@/components/ui/axios";
import { setUser } from "@/store/auth_slice";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AuthLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const [initialValues] = useState({
    email: "",
    password: "",
  });
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      setloader(true);
      const data = {
        email: values.email,
        password: values.password,
      };
      const res = await createData("", "auth/loginuser", data, {
        withCredentials: true,
        header: {
          "Content-Type": "application/json",
        },
      });
      dispatch(
        setUser({
          user: res.data.user,
          role: res.data.user.role,
        })
      );
      if (res.status === 200 && res.data.success === true) {
        setloader(false);
        toast(res.data.message);
      } else {
        setloader(false);
        toast(res.data.message);
      }
    },
  });
  return (
    <>
      <div className=" mx-auto w-full max-w-md p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Login to your account
          </h1>
          <p className="text-muted-foreground mt-2 mb-5">
            Don't have an account?
            <Link
              to="/auth/register"
              className="font-medium text-primary hover:underline ml-2"
            >
              Create account
            </Link>
          </p>
        </div>
        <CommonForm
          formcontrols={loginLabels}
          formik={formik}
          buttonText="Login"
          loader={loader}
        />
      </div>
    </>
  );
}

export default AuthLogin;
