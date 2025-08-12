/* eslint-disable no-unused-vars */

import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "./form";
import { useFormik } from "formik";
import { Badge } from "../ui/badge";
import { updateData } from "../ui/axios";
import { toast } from "sonner";

function OrderDetails({ orderData, shop, user, orderId, setOpenDialog, GetOrderDetail,GetAllorder }) {
  console.log("orderId", orderId)
  const formik = useFormik({
    initialValues: {
      updatestatus: orderData?.orderStatus,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("values", values);
      const data ={orderStatus: values.updatestatus}
      const res = await updateData(`/admin/orders/updateOrderstatus/${orderId}`, data, {
        header: {
          "Content-Type": "application/json",
        },
      });
      if(res.success === true){
         toast.success(res.message);
         GetOrderDetail(orderId)
         GetAllorder()
        //  setOpenDialog(false)
      }
      // console.log("res", res)
    },
  });
  // console.log("statuss", formik.values)
  return (
    <DialogContent className="sm:mx-w-[600px] h-[500px] overflow-y-auto">
      <div className="grid gap-6 ">
        <div className="grid gap-2">
          <div className="flex mt-6 item-center justify-between">
            <p className="font-medium">Order Id</p>
            <Label>{orderData?._id}</Label>
          </div>
          <div className="flex mt-6 item-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderData?.orderDate.split('T')[0]}</Label>
          </div>
          <div className="flex mt-6 item-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>₹{orderData?.totalAmount}</Label>
          </div>
          <div className="flex mt-6 item-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge className={`${orderData?.orderStatus ==="inprocess" ? 'bg-yellow-400': orderData?.orderStatus ==="rejected" ? 'bg-red-600': orderData?.orderStatus === 'confirmed' ? 'bg-green-400' : ""} p-2`}>
                {" "}
                {orderData?.orderStatus.charAt(0).toUpperCase() + orderData?.orderStatus.slice(1)}
              </Badge></Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderData?.cartItems?.map((data) => (
                <li className="flex items-center justify-between">
                  <span><b>{data?.title}</b> </span>
                  <span><b>Quantity {data?.quantity}</b> </span>
                  <span> <b>₹{data?.price}</b></span>
                </li>
              ))}

            </ul>
          </div>
        </div>
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Details</div>
            <div className="grid gap-0.5 text-muted-foreground">
              {shop === true ? <span><b>{user?.userName.charAt(0).toUpperCase() + user?.userName.slice(1)}</b></span> : null}
              <span>{orderData?.addressInfo?.address},</span>
              <span>{orderData?.addressInfo?.city}</span>
              <span>{orderData?.addressInfo?.pincode}</span>
              <span>{orderData?.addressInfo?.phone}</span>
              <span>{orderData?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        {shop === true ? null : (
          <div>
            <CommonForm
              formcontrols={[
                {
                  label: "Status",
                  name: "updatestatus",
                  componentType: "select",
                  placeholder: "Select status",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inprocess", label: "In Process" },
                    { id: "inshipping", label: "In Shipping" },
                    { id: "rejected", label: "Rejectd" },
                    { id: "confirmed", label: "Completed" },
                  ],
                },
              ]}
              disabled={orderData?.orderStatus === 'confirmed'}
              formik={formik}
              buttonText="Update order status"
            />
          </div>
        )}
      </div>
    </DialogContent>
  );
}

export default OrderDetails;
