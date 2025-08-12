/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { createData, readData } from '../ui/axios';
import { Input } from '../ui/input';
import { useFormik } from 'formik';
import ShopProducts from '@/pages/shopping_view/product';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import ProductDetailDialog from '@/pages/shopping_view/productDetail';

function SearchProducts() {
  const [searchvalues, setSearchValues] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartdata, setCartData] = useState([])
  const [productdetail, setProductDetail] = useState();
  const [openDialog, setOpendialog] = useState(false);
  const location = useLocation();
  const { message, productid } = location.state ?? {}
  const { user } = useSelector((state) => state.auth);
  const [initialValues] = useState({
    searchkeyword: "",
  });
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,

  });

  const GetSearchProducts = async (keywords) => {
    const res = await await readData(`/shop/search/${keywords}`, {
      header: {
        "Content-Type": "application/json",
      },
    });
    if (res.success === true) {
      console.log("SearchProducts", res)
      setSearchValues(res)

    }
  };

  const GetCartProducts = async () => {
    const res = await await readData(`/shop/cartItems/fetchCart/${user.id}`, {
      header: {
        "Content-Type": "application/json",
      },
    });
    setCartData(res.data.items)
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

  useEffect(() => {
    if (formik.values.searchkeyword.trim() !== "" && formik.values.searchkeyword.length >= 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${formik.values.searchkeyword}`));
        GetSearchProducts(formik.values.searchkeyword)
      }, 1000);
    } else {
      GetSearchProducts()
    }
  }, [formik.values.searchkeyword])

  console.log("formik", searchvalues)
  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
      <div className='flex justify-center mb-8'>
        <div className='w-full flex items-center'>
          <Input name="searchkeyword" value={formik.values.searchkeyword} onChange={formik.handleChange} placeholder="Search Products..." className="py-8" />
        </div>
      </div>
      {searchvalues?.data?.length > 0 ?
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          <ShopProducts productItem={searchvalues.data} handleGetproduct={handleGetproduct} AddProducts={AddProducts} />
        </div>
        : <h1 className="text-5xl font-extrabold">No result found!</h1>}

          <ProductDetailDialog
          open={openDialog}
          setOpen={setOpendialog}
          product={productdetail}
          AddProducts={AddProducts}
        />
    </div>
  )
}

export default SearchProducts