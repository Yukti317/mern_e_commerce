import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Edit, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

function AddresList({
  addressInfo,
  setIsedit,
  setAddressIs,
  formik,
  DeleteAddress,
  addressId,
  setCurrentSelectedaddress,
}) {
  const handleUpdate = (id, addresData) => {
    setIsedit(true), setAddressIs(id);
    formik.setFieldValue("address", addresData?.address);
    formik.setFieldValue("city", addresData?.city);
    formik.setFieldValue("pincode", addresData?.pincode);
    formik.setFieldValue("phone", addresData?.phone);
    formik.setFieldValue("notes", addresData?.notes);
  };
   const IsSelected = addressId === addressInfo._id
  return (
    <>
      <Card>
        <CardContent className="grid gap-4">
          <div className="flex justify-between gap-3">
            <div className="grid grid-col-6 gap-3">
              <Label className="items-start">
                <b>Address:</b> {addressInfo?.address}
              </Label>
              <Label className="items-start">
                <b>City:</b> {addressInfo?.city}
              </Label>
              <Label className="items-start">
                <b>Pincode:</b> {addressInfo?.pincode}
              </Label>
              <Label className="items-start">
                <b>Phone:</b> {addressInfo?.phone}
              </Label>
              <Label className="items-start">
                <b>Notes:</b> {addressInfo?.notes}
              </Label>
            </div>
            <div className=" flex gap-3">
              <Edit
                onClick={() => {
                  handleUpdate(addressInfo._id, addressInfo);
                }}
                className="cursor-pointer"
              />

              <TrashIcon
                className="cursor-pointer"
                onClick={() => DeleteAddress(addressInfo._id)}
              />
            </div>
          </div>
        </CardContent>
        {setCurrentSelectedaddress ? (
          <CardFooter>
            <Button
              className="cursor-pointer"
              onClick={() => {setCurrentSelectedaddress(addressInfo); setAddressIs(addressInfo._id)}}
            >
             {IsSelected ? 'Selected Address' : 'Select Address'} 
            </Button>
          </CardFooter>
        ) : null}
      </Card>
    </>
  );
}

export default AddresList;
