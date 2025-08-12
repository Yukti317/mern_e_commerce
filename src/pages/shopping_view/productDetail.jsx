

import StarRatingComponent from "@/components/common/StarRatingComponent";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createData, readData } from "@/components/ui/axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useFormik } from "formik";
import { StarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function ProductDetailDialog({ open, setOpen, product, AddProducts }) {
  const { user } = useSelector((state) => state.auth);
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState([])
  const [initialValues] = useState({
    reviewmsg: "",
    ratings: ""
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (value) => {
      console.log("values", value)
      setLoader(true)
      const data = {
        productId: product?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: value.reviewmsg,
        reviewValue: value.ratings
      };
      const res = await createData("", "/shop/review/addReview", data, {
        header: {
          "Content-Type": "application/json",
        },
      });
      console.log("resres", res)
      if (res.data.success === true) {
        setLoader(false)
        formik.resetForm()
      } else {
        setLoader(false)
        toast.error(res.data.message)
        formik.resetForm()
      }
    }
  });
  const GetReview = async (productId) => {
    const res = await readData(`/shop/review/getReview/${productId}`, {
      header: {
        "Content-Type": "application/json",
      },
    });
    console.log("resss", res)
    if (res.success === true) {
      setData(res.data)
    }
  }
  const DialogClose = () => {
    setOpen(false);
  };

  const handleRatingChange = (getrating) => {
    formik.setFieldValue('ratings', getrating)
  }
  useEffect(() => {
    if (product?._id) {
      GetReview(product?._id)
    }
  }, [product?._id])

  console.log("data", data)
  const averageReview =
    data && data.length > 0
      ? data.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        data.length
      : 0;
      console.log("averageReview", averageReview)
  return (
    <>
      <Dialog open={open} onOpenChange={DialogClose} >
        <DialogContent className="gap-8 grid-cols-2 sm:p-12 max-w-[80vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-[90%] overflow-scroll">
          <div className="relative overflow-hidden rounded-lg">
            <div className="relative">
              <img
                src={product?.image}
                alt={product?.title}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
          <div className="">
            <div>
              <h1 className="text-3xl font-extrabold">{product?.title}</h1>
              <p className="text-muted-foreground text-2xl mb-5 mt-4">
                {product?.description}
              </p>
            </div>
            <div className="flex item-center justify-between mt-3">
              <p
                className={`${product?.saleprice > 0
                  ? "line-through text-gray-500"
                  : "text-primary"
                  } text-xl font-bold `}
              >
                ₹{product?.price}
              </p>
              {product?.saleprice > 0 ? (
                <span className="text-lg font-bold text-muted-foreground">
                  ₹{product?.saleprice}
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <StarRatingComponent rating={averageReview}/>
              </div>
              <span className="text-muted-foreground">{averageReview.toFixed(2)}</span>
            </div>
            <div className="mt-5 mb-5">
              <Button className="w-full" disabled={product?.totalStock === 0} onClick={() => AddProducts(product._id, product?.totalStock)}>{product?.totalStock === 0 ? "Out Of Stock" : "Add to cart"}</Button>
            </div>
            <Separator />
            <div className="max-h-[300px] overflow-auto">
              <h2 className="text-xl font-bold mb-4 ">Reviews</h2>
              <div className="grid gap-6">
                {data.length ? data.map((revdata) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>{revdata?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{revdata?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={revdata?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">{revdata?.reviewMessage}</p>
                    </div>
                  </div>
                )) : <h2>No Review</h2>}
                <div className="mt-6 flex-col flex gap-2">
                  <Label>Write a review</Label>
                  <div className="flex">
                    <StarRatingComponent name="ratings" rating={formik.values.ratings} handleRatingChange={handleRatingChange} />
                  </div>
                  <Input name="reviewmsg" value={formik.values.reviewmsg} onChange={formik.handleChange} placeholder="Write a review..." />
                  <Button disabled={!formik.dirty} className="cursor-pointer mb-4" onClick={formik.handleSubmit}>{loader ? "Loading..." : "Submit"}</Button>

                </div>
              </div>


            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductDetailDialog;
