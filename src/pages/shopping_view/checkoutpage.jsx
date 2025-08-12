/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import image from "../../assets/account.jpg";
import AddresList from "@/components/shopping_view/address_card";
import AddressTab from "@/components/shopping_view/address";
import {
  createData,
  deleteData,
  readData,
  updateData,
} from "@/components/ui/axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CloudCog } from "lucide-react";
import UserCartItem from "@/components/shopping_view/cart_item";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Checkoutpage() {
  const { user } = useSelector((state) => state.auth);
  const [cartData, setCartdata] = useState();
  const [CurrentSelectedAddress, setCurrentSelectedaddress] = useState();
  const [loader, setLoader] = useState(false);
  const [approvalURL, setapprovalUrl] = useState();
  const [cartId, setCartId] = useState();
  const [paymentStart, setPaymentStart] = useState(false);
  const navigate = useNavigate();
  
  const GetCartProducts = async () => {
    const res = await await readData(`/shop/cartItems/fetchCart/${user.id}`, {
      header: {
        "Content-Type": "application/json",
      },
    });
    console.log("res", res);
    setCartId(res.data._id);
    setCartdata(res.data.items);
  };

  const DeleteCartItem = async (productid) => {
    const res = await deleteData(
      `/shop/cartItems/deleteCartitem/${user.id}/${productid}`
    );
    if (res.success) {
      toast(res.message);
      GetCartProducts();
    }
  };

  const handleCartUpdate = async (cartItem, typeofbtn) => {
    const qty =
      typeofbtn === "plus" ? cartItem.quantity + 1 : cartItem.quantity - 1;
    const data = {
      userId: user.id,
      productId: cartItem.productId,
      quantity: qty,
    };
    const res = await updateData(`/shop/cartItems/updateCartitem`, data, {
      header: {
        "Content-Type": "application/json",
      },
    });
    const itemqty = res.data.items.filter((item) => {
      if (item.productId === cartItem.productId) return item;
    });
    const updatedCart = cartData.map((item) =>
      item.productId === cartItem.productId
        ? { ...item, quantity: itemqty[0].quantity } // update quantity
        : item
    );
    setCartdata(updatedCart);
  };

  const totalCartItem =
    cartData && cartData.length > 0
      ? cartData.reduce(
          (sum, cartData) =>
            sum +
            (cartData?.saleprice > 0 ? cartData?.saleprice : cartData?.price) *
              cartData?.quantity,
          0
        )
      : 0;
  // const handleInitiatpaypalpayment = async () => {
  //   setLoader(true)
  //   const orderData = {
  //     userId: user?.id,
  //     cartItems:
  //       cartData?.length > 0 &&
  //       cartData.map((item) => ({
  //         productId: item.productId,
  //         title: item.title,
  //         image: item.image,
  //         price: item.saleprice > 0 ? item.saleprice : item.price,
  //         quantity: item.quantity,
  //       })),
  //     addressInfo: {
  //       addressId: CurrentSelectedAddress?._id,
  //       address: CurrentSelectedAddress?.address,
  //       city: CurrentSelectedAddress?.city,
  //       pincode: CurrentSelectedAddress?.pincode,
  //       phone: CurrentSelectedAddress?.phone,
  //       notes: CurrentSelectedAddress?.notes,
  //     },
  //     orderStatus: "pending",
  //     paymentMethod: "paypal",
  //     paymentStatus: "pending",
  //     paymentId: "",
  //     payerId: "",
  //     totalAmount: totalCartItem,
  //     orderDate: new Date(),
  //     orderUpdateDate: new Date(),
  //   };

  //   const res = await createData("", "/shop/order/creatOrder", orderData, {
  //     header: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   console.log("orderData", res);
  //   if (res.status === 201) {
  //     setLoader(false)
  //     setPaymentStart(true);
  //     setapprovalUrl(res.data.approvalURL);
  //     // window.location.href = res.data.approvalURL
  //   } else {
  //     setLoader(false)
  //     setPaymentStart(false);
  //   }
  // };
  console.log("cartData", cartData);
  const handleInitiatpaypalpayment = async () => {
    console.log("CurrentSelectedAddress", CurrentSelectedAddress)
    if(CurrentSelectedAddress === undefined ){
      return  toast.error("Please select address")
    }
    setLoader(true);

    const orderData = {
      userId: user?.id,
      cartId: cartId,
      cartItems:
        cartData?.length > 0 &&
        cartData.map((item) => ({
          productId: item.productId,
          title: item.title,
          image: item.image,
          price: item.saleprice > 0 ? item.saleprice : item.price,
          quantity: item.quantity,
        })),
      addressInfo: {
        addressId: CurrentSelectedAddress?._id,
        address: CurrentSelectedAddress?.address,
        city: CurrentSelectedAddress?.city,
        pincode: CurrentSelectedAddress?.pincode,
        phone: CurrentSelectedAddress?.phone,
        notes: CurrentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      paymentId: "",
      payerId: "",
      totalAmount: totalCartItem,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    try {
      const res = await createData("", "/shop/order/creatOrder", orderData, {
        header: { "Content-Type": "application/json" },
      });

      console.log("Payment Successful11111", res);

      if (res.status === 201) {
        const { orderId, amount, currency, razorpayOrderId } = res.data;
        sessionStorage.setItem("currentorderId", JSON.stringify(orderId));
        if (!window.Razorpay) {
          alert("Razorpay SDK not loaded.");
          return;
        }
        const options = {
          key: "rzp_test_4mfoL6s5ULbkq2", // Replace with actual key
          amount: amount, // in paise
          currency: currency,
          name: "Ecommerce",
          description: "Order Payment",
          order_id: razorpayOrderId,
          handler: async function (response) {
            console.log("Payment Successful2222:", response);

            navigate(
              `/shop/paypalReturn/${user?.id}/${response?.razorpay_payment_id}`
            );
          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: CurrentSelectedAddress?.phone,
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        console.log("rzpppp", rzp);
        rzp.open();
      } else {
        setLoader(false);
        alert("Failed to create order.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoader(false);
    }
  };
  if (approvalURL) {
    window.location.href = approvalURL;
  }
  useEffect(() => {
    GetCartProducts();
  }, []);


  console.log("CurrentSelectedAddress", CurrentSelectedAddress)
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={image} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <AddressTab setCurrentSelectedaddress={setCurrentSelectedaddress} CurrentSelectedAddress={CurrentSelectedAddress}/>

        <div className="flex flex-col gap-4">
          {cartData && cartData.length > 0
            ? cartData.map((data) => (
                <UserCartItem
                  cartItems={data}
                  DeleteCartItem={DeleteCartItem}
                  handleCartUpdate={handleCartUpdate}
                />
              ))
            : null}
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">₹{totalCartItem}</span>
          </div>
          <div className="mt-4">
            <Button
              onClick={handleInitiatpaypalpayment}
              className="w-full cursor-pointer"
              disabled={loader || !cartData?.length }
            >
              {loader ? "Loading..." : "CheckOut with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkoutpage;
