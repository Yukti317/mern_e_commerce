import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";

function UserCartItem({ cartItems, DeleteCartItem, handleCartUpdate }) {
  console.log("cartItems", cartItems)
  return (
    <div className="flex item-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <p className="font-semibold text-sm my-2">
          ₹{cartItems?.saleprice > 0 ? cartItems?.saleprice : cartItems?.price}
        </p>
        <div className="flex items-center mt-1">
          <Button
            variant="outline"
            disabled={cartItems?.quantity === 1}
            onClick={() => handleCartUpdate(cartItems, "minus")}
            size="icon"
            className="h-6 rounded-full w-6 cursor-pointer"
          >
            <Minus className="w-4 h-4 cursor-pointer" />{" "}
            <span className="sr-only">Decrease</span>
          </Button>

          <div className="mx-3 font-semibold">{cartItems?.quantity}</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleCartUpdate(cartItems, "plus")}
            className="h-6 rounded-full w-6 cursor-pointer"
          >
            <Plus className="w-4 h-4 cursor-pointer" />{" "}
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹
          {(
            (cartItems?.saleprice > 0
              ? cartItems?.saleprice
              : cartItems?.price) * cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => DeleteCartItem(cartItems?.productId)}
          className="cursor-pointer mt-1"
          size={17}
        />
      </div>
    </div>
  );
}

export default UserCartItem;
