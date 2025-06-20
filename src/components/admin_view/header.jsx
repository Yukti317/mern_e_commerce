import React from "react";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { createData } from "../ui/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth_slice";

function Adminheader({ setopen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = async () => {
    const res = await createData("", "/auth/logout", "", {
      header: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
       dispatch(logout()); 
      toast.success(res.data.message)
      navigate("/auth/login");
    }
  };
  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
        <Button onClick={() => setopen(true)} className="lg:hidden sm:block">
          <Menu />
          <span className="sr-only">Toggel menu</span>
        </Button>

        <div className="flex flex-1 justify-end">
          <Button
            onClick={() => logoutUser()}
            className="inline-flex gap-2 items-center cursor-pointer rounded px-4 py-2 text-sm font-medium shadow"
          >
            <LogOut />
            LogOut
          </Button>
        </div>
      </header>
    </>
  );
}

export default Adminheader;
