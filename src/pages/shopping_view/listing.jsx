/* eslint-disable no-unused-vars */
import { sortOptions } from "@/components/Commonlabels/label";
import ProductFilter from "@/components/shopping_view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import ShopProducts from "./product";
import { createData, readData } from "@/components/ui/axios";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductDetailDialog from "./productDetail";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function createSearchParams(filterparams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterparams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ProductListing() {
  const [Allproducts, setAllproducts] = useState([]);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("title-atoz");
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartdata, setCartData] = useState([])
  const [productdetail, setProductDetail] = useState();
  const [openDialog, setOpendialog] = useState(false);
  const [qty, setQty] = useState(1)
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const { message, productid } = location.state ?? {}

  const categorySearchparams = searchParams.get('category')
  // fetchProducts
  const GetAllProduct = async (searchfilter, sort) => {
    const query = new URLSearchParams({
      ...searchfilter,
      sortBy: sort,
    });
    const res = await readData(`/shop/products/getFilterProducts?${query}`, {
      header: {
        "Content-Type": "application/json",
      },
    });
    setAllproducts(res.data);
  };

  const handleSort = (value) => {
    setSort(value);
  };
  const handleFilter = (sectionId, seletcedoption) => {
    let cpyFilter = { ...filter };
    const indexOfCurrentFilter = Object.keys(cpyFilter).indexOf(sectionId);
    if (indexOfCurrentFilter === -1) {
      cpyFilter = {
        ...cpyFilter,
        [sectionId]: [seletcedoption],
      };
    } else {
      const indexofCurrentOption = cpyFilter[sectionId].indexOf(seletcedoption);
      if (indexofCurrentOption === -1) {
        cpyFilter[sectionId].push(seletcedoption);
      } else {
        cpyFilter[sectionId].splice(indexofCurrentOption, 1);
      }
    }
    setFilter(cpyFilter);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilter));
  };

  const handleGetproduct = async (id) => {
    setOpendialog(true);
    const res = await readData(`/shop/products/getprofuctById/${productid ? productid : id}`, {
      header: {
        "Content-Type": "application/json",
      },
    });
    setProductDetail(res.data);
  };


  useEffect(() => {
    const filterdata = sessionStorage.getItem("filters");
    setFilter(JSON.parse(filterdata));
  }, [categorySearchparams]);

  useEffect(() => {
    GetAllProduct(filter, sort);
  }, [filter, sort,]);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParams(filter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filter, categorySearchparams]);

  const GetCartProducts = async () => {
    const res = await await readData(`/shop/cartItems/fetchCart/${user.id}`, {
      header: {
        "Content-Type": "application/json",
      },
    });
    setCartData(res.data.items)
  };

  const AddProducts = async (productId, totalstock) => {
    console.log("22222222", cartdata)
    const data = {
      userId: user.id,
      productId: productId,
      quantity: 1,
    };
    if (cartdata.length) {
      const indexofItem = cartdata.findIndex(item => item.productId === productId)
      if (indexofItem > -1) {
        const quantity = cartdata[indexofItem].quantity
        console.log("quantity", quantity + 1, totalstock)
        if (quantity + 1 > totalstock) {
          toast.info(`Only ${totalstock} can be added to this product`)
          return;
        }

      }
    }

    const res = await createData("", "/shop/cartItems/addtocart", data, {
      header: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      GetCartProducts();
      toast("Product added successfully");
    }
  };

  useEffect(() => {
    if (message === 'home') {
      handleGetproduct(productid)
    }
    GetCartProducts()
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter handleFilter={handleFilter} filter={filter} />
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between ">
            <h2 className="text-lg font-extrabold">All Products</h2>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground me-3 ">
                {Allproducts.length} Products
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 flex items-center"
                  >
                    <ArrowUpDownIcon className="w-4 h-4" />
                    <span>Short by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={(e) => handleSort(e)}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {Allproducts.length ?
            <div className="grid grid-cols-1 m-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <ShopProducts
                handleGetproduct={handleGetproduct}
                productItem={Allproducts}
                AddProducts={AddProducts}
              />
            </div> : <p className="text-center font-bold mt-5">Produs is not available</p>}
        </div>

        <ProductDetailDialog
          open={openDialog}
          setOpen={setOpendialog}
          product={productdetail}
          AddProducts={AddProducts}
        />
      </div>
    </>
  );
}

export default ProductListing;
