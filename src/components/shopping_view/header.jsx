/* eslint-disable no-unused-vars */
import {
  House,
  HouseWifi,
  LogOut,
  Menu,
  ShoppingCart,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { ShopingViewMenu } from "../Commonlabels/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { createData, deleteData, readData, updateData } from "../ui/axios";
import { logout } from "@/store/auth_slice";
import { toast } from "sonner";
import UserCartWrapper from "./cart_warraper";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const handleNavigate = (curItem, sectionname) => {
    sessionStorage.removeItem("filters");
    const currentFilter = curItem.id !== "home" ? { category: [curItem.id] } : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(curItem.to);
  };
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-start gap-6 lg:flex-row">
      {ShopingViewMenu.map((menuItem) => (
        <div>
          <Label
            onClick={() => handleNavigate(menuItem)}
            to={menuItem.to}
            key={menuItem.id}
            className="text-sm font-medium cursor-pointer"
          >
            {menuItem.label}
          </Label>
        </div>
      ))}
    </nav>
  );
}

function HeaderRightContent({ user }) {
  const navigate = useNavigate();
  const firstLetter = user.userName.charAt(0).toUpperCase();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [cartData, setCartdata] = useState();
  const logoutUser = async () => {
    const res = await createData("", "/auth/logout", "", {
      header: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      dispatch(logout());
      toast.success(res.data.message);
      navigate("/auth/login");
    }
  };

  const GetCartProducts = async () => {
    const res = await await readData(`/shop/cartItems/fetchCart/${user.id}`, {
      header: {
        "Content-Type": "application/json",
      },
    });
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
  useEffect(() => {
    if (open) {
      GetCartProducts();
    }
  }, [open]);
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={open} onOpenChange={() => setOpen(false)}>
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper
          cartData={cartData}
          DeleteCartItem={DeleteCartItem}
          handleCartUpdate={handleCartUpdate}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger aschild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {firstLetter}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer"
          >
            <User className="h-4 mr-2 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => logoutUser()}
          >
            <LogOut className="h-4 mr-2 w-4" />
            LogOut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link className="flex items-center gap-2" to="/shop/home">
            <ShoppingCart className="h-6 w-6" />
            <span className="font-bold">E-Commerce</span>
          </Link>
          <Sheet>
            <SheetTrigger aschild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu />
                <span className="sr-only">Toggel header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs ps-2">
              <MenuItems />
              <HeaderRightContent user={user} />
            </SheetContent>
          </Sheet>
          <div className="hidden lg:block">
            <MenuItems />
          </div>

          <div className="hidden lg:block">
            <HeaderRightContent user={user} />
          </div>
        </div>
      </header>
    </>
  );
}

export default ShoppingHeader;
