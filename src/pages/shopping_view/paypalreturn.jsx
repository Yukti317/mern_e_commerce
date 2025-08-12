import { createData } from "@/components/ui/axios";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PaypalReturn() {
  const navigate = useNavigate();
  const { payerId, paymentId } = useParams();

  console.log("payerId", payerId, "paymentId", paymentId);

  const CaptureOrder = async (payerid, paymentid, orderid) => {
    const data = { payerId: payerid, paymentId: paymentid, orderId: orderid };
    try {
      const res = await createData("", "/shop/order/captureOrder", data, {
        header: { "Content-Type": "application/json" },
      });
      console.log("captureress", res);
      if (res.status === 200) {
        navigate("/shop/paymentsuccess");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (payerId && paymentId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentorderId"));
      CaptureOrder(payerId, paymentId, orderId);
    }
  }, [payerId, paymentId]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment..... Please wait!!!!!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturn;
