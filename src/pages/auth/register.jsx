 
import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { registerLabels } from "@/components/Commonlabels/label";
import { createData } from "@/components/ui/axios";
import { toast } from "sonner"

function AuthRegister() {
  const navigate = useNavigate()
  const [loader, setloader] = useState(false)
  const [initialValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      setloader(true)
      const data = {
        userName: values.username,
         email: values.email, 
         password:values.password
        }
      const res = await createData("","auth/registeruser",data,{
        withCredentials: true,
        header: {
          "Content-Type": "application/json",
        },
      });
      if(res.status === 200 && res.data.success === true ){
        setloader(false)
        toast('User Register Scussfully')
        navigate('/auth/login')
      }else{
        setloader(false)
        toast(res.data.message)
      }
    },
  });
  return (
    <>
      <div className=" mx-auto w-full max-w-md p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Create a new account
          </h1>
          <p className="text-muted-foreground mt-2 mb-5">
            Alreadt have an account?
            <Link
              to="/auth/login"
              className="font-medium text-primary hover:underline ml-2"
            >
              Login
            </Link>
          </p>
        </div>
        <CommonForm
          formcontrols={registerLabels}
          formik={formik}
          buttonText="Sign Up"
          loader={loader}
        />
      </div>
    </>
  );
}

export default AuthRegister;
