import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import OrderDetails from "../common/OrderDetails";
import { readData } from "../ui/axios";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

function AdminOrderHistory() {
  const [openDialog, setOpenDialog] = useState();
  const { user } = useSelector((state) => state.auth);
  const [OrderList, setOrderList] = useState();
  const [orderData, setOrderData] = useState()
  const [orderId, setOrderId] = useState()
  const GetAllorder = async () => {
    const res = await readData(`/admin/orders/getAllOrder`, {
      header: {
        "Content-Type": "application/json",
      },
    });
    console.log("res", res)
    if (res.success === true) {
      setOrderList(res.data)

    }
  }

  const GetOrderDetail = async (id) => {
    console.log("111111")
    const res = await readData(`/admin/orders/getAllOrderDetails/${id}`, {
      header: {
        "Content-Type": "application/json",
      },
    },
    );
    console.log("GetOrderDetail", res)
    if (res.success === true) {
      setOrderData(res.data)
    }
    console.log("res", res)

  }

  const handleOrderDetails = (id) => {
    console.log("id", id)
    setOrderId(id)
    setOpenDialog(true)
    if (id) {
      GetOrderDetail(id)
    }

  }
  useEffect(() => {
    GetAllorder()
  }, [])

  console.log("OrderList", OrderList)
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

              {OrderList && OrderList.length && OrderList.map((data) => (
                <TableRow>
                  <TableCell>{data?._id}</TableCell>
                  <TableCell>{data?.orderDate.split('T')[0]}</TableCell>
                  <TableCell>
                    <Badge className={`${data?.orderStatus ==="inprocess" ? 'bg-yellow-400': data?.orderStatus ==="rejected" ? 'bg-red-600': data?.orderStatus === 'confirmed' ? 'bg-green-400' : ""} p-2`}>
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
                      <OrderDetails orderData={orderData} user={user} orderId={orderId} setOpenDialog={setOpenDialog} GetOrderDetail={GetOrderDetail} GetAllorder={GetAllorder}/>
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

export default AdminOrderHistory;
