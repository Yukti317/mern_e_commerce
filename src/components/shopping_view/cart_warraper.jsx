import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItem from "./cart_item";


function UserCartWrapper({ cartData,DeleteCartItem, handleCartUpdate }) {

  const totalCartItem = cartData && cartData.length > 0 ? 
  
  cartData.reduce((sum, cartData)=> sum + (
    cartData?.saleprice > 0 ? cartData?.saleprice  : cartData?.price
  ) * cartData?.quantity,0) 
  :0
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="space-y-4 p-4">
        {cartData && cartData.length ?  cartData.map((cartItems) => <UserCartItem key={cartItems?._id} cartItems={cartItems} DeleteCartItem={DeleteCartItem} handleCartUpdate={handleCartUpdate}/>):null
          }
      </div>
      <div className="mt-4 space-y-4 p-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">₹{totalCartItem}</span>
        </div>
        <Button className="w-full mt-5">CheckOut</Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
