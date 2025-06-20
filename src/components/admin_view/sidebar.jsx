import React, { Fragment } from "react";
import {
  BadgeCheck,
  ChartSpline,
  LandPlot,
  LayoutDashboard,
  SendToBack,
  ShoppingBasket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarmenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "product",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  // {
  //   id: "feature",
  //   label: "Features",
  //   path: "/admin/feature",
  //   icon: <LandPlot />,
  // },
];

function MenuItems({setopen}) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarmenu.map((menuitem) => (
        <>
          <div
            key={menuitem.id}
            onClick={() => {navigate(menuitem.path)
            setopen ? setopen(false) : null
            }}
            className="flex items-center gap-2  px-6 py-2 text-xl text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
          >
            {menuitem.icon}
            <span>{menuitem.label}</span>
          </div>
        </>
      ))}
    </nav>
  );
}
function Adminsidebar({ open, setopen }) {
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={open} onOpenChange={setopen}>
        <SheetContent side="left" className="w-64 ">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex text-xl gap-2 mt-5 mb-5 font-extrabold">
                <ChartSpline size={30} />
                Admin pannel
              </SheetTitle>
            </SheetHeader>
            <MenuItems setopen={setopen}/>
          </div>
        </SheetContent>
      </Sheet>
      <Fragment>
        <aside className="hidden w-64 flex-col border-r bg-background py-6 lg:flex">
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex cursor-pointer px-6 items-center gap-2"
          >
            <ChartSpline size={30} />
            <h1 className="text-2xl font-extrabold">Admin pannel</h1>
          </div>
          <MenuItems />
        </aside>
      </Fragment>
    </>
  );
}

export default Adminsidebar;
