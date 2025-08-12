/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import OrderDetails from "../common/OrderDetails";
import { readData } from "../ui/axios";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";

function ShoppingOrderTab() {
  const [openDialog, setOpenDialog] = useState();
  const { user } = useSelector((state) => state.auth);
  const [orderList, setOrderList] = useState()
  const [orderId, setOrderId] = useState()
  const [orderData, setOrderData] = useState()

  const GetAllorder = async () => {
    const res = await readData(`/shop/order/getAllorderbyUser/${user.id}`, {
      header: {
        "Content-Type": "application/json",
      },
    });
    // console.log("res", res)
    if (res.success === true) {
      setOrderList(res.data)

    }
  }

  const GetOrderDetail = async (id) => {

    const res = await readData(`/shop/order/getorderdetail/${id}`, {
      header: {
        "Content-Type": "application/json",
      },

    },
    );
    if (res.success === true) {
      setOrderData(res.data)
    }
    console.log("res", res)

  }
  useEffect(() => {
    GetAllorder()
  }, [])


  const handleOrderDetails = (id) => {
    console.log("id", id)
    setOpenDialog(true)
    if (id) {
      GetOrderDetail(id)
    }

  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length && orderList.map((data) => (
                <TableRow>
                  <TableCell>{data?._id}</TableCell>
                  <TableCell>{data?.orderDate.split('T')[0]}</TableCell>
                  <TableCell>
                    <Badge className={`${data?.orderStatus === 'confirmed' ? 'bg-green-400' : ""} p-1`}>
                      {" "}
                      {data?.orderStatus.charAt(0).toUpperCase() + data?.orderStatus.slice(1)}
                    </Badge></TableCell>
                  <TableCell>₹{data?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                      <Button
                        onClick={() => { handleOrderDetails(data?._id) }}
                        className="cursor-pointer"
                      >
                        View Details
                      </Button>
                      <OrderDetails shop={true} orderData={orderData} user={user}/>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default ShoppingOrderTab;
