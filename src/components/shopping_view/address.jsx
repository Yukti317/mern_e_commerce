/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "../Commonlabels/label";
import { toast } from "sonner";
import { createData, deleteData, readData, updateData } from "../ui/axios";
import { useSelector } from "react-redux";
import { CloudCog } from "lucide-react";
import AddresList from "./address_card";
import { RadioGroup } from "../ui/radio-group";

function AddressTab({ setCurrentSelectedaddress, CurrentSelectedAddress }) {
  const [loader, setLoader] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [addressList, setAddressList] = useState();
  const [addressId, setAddressIs] = useState();
  const [IsEdit, setIsedit] = useState(false);
  const [initialValues, setinitialValues] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  });
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (IsEdit) {
        const data = { ...values };
        const res = await updateData(
          `/shop/address/updateAddress/${user.id}/${addressId}`,
          data,
          {
            header: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("res", res);
        if (res.success === true) {
          toast(res.message);
          GetAddress();
          setIsedit(false);
          formik.resetForm();
        } else {
          toast.error(res.data.message);
          formik.resetForm();
        }
      } else {
        console.log("addressList", addressList);
        if (addressList.length >= 3) {
          toast.warning("You can add max 3 Address");
        } else {
          const data = { ...values, userId: user.id };
          const res = await createData("", "/shop/address/addAddress", data, {
            header: {
              "Content-Type": "application/json",
            },
          });

          if (res.status === 201) {
            toast(res.data.message);
            GetAddress();
            formik.resetForm();
          } else {
            toast.error(res.data.message);
            formik.resetForm();
          }
        }
      }
    },
  });

  const GetAddress = async () => {
    const res = await readData(`/shop/address/fetchAddress/${user.id}`, {
      header: {
        "Content-Type": "application/json",
      },
    });

    if (res.success === true) {
      setAddressList(res.data);
    }
  };

  const DeleteAddress = async (id) => {
    const res = await deleteData(
      `/shop/address/deleteAddress/${user.id}/${id}`
    );
    if (res.success) {
      toast(res.message);
      GetAddress();
    }
  };

  useEffect(() => {
    GetAddress();
  }, [IsEdit]);

  console.log("setCurrentSelectedaddress", CurrentSelectedAddress)
  return (
    <>
      <Card>
      
          {addressList && addressList.length > 0 ? (
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2 ">
              {addressList.map((addresInfo) => (
                <AddresList
                  addressInfo={addresInfo}
                  setIsedit={setIsedit}
                  addressId={addressId}
                  setAddressIs={setAddressIs}
                  formik={formik}
                  DeleteAddress={DeleteAddress}
                  setCurrentSelectedaddress={setCurrentSelectedaddress}
                />
              ))}
            </div>
          ) : null}

        <CardHeader>
          <CardTitle>Add new Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CommonForm
            formcontrols={addressFormControls}
            formik={formik}
            buttonText={IsEdit ? "Update Address" : "Add Address"}
            loader={loader}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default AddressTab;
